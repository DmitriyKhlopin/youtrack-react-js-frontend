import React, {Component} from "react";
import {styles} from "../Styles";
import {store} from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import * as PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {
    getActualTimeUsers,
    getData,
    setActualTimeDateFrom,
    setActualTimeDateTo,
    setCurrentlySelectedUsers
} from "../redux/actions/actualTimeActions";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import * as ReactDOM from "react-dom";
import PivotGrid, {FieldChooser} from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import {PAGES} from "../Const";
import withStyles from "@material-ui/core/styles/withStyles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name, that) {
    return {
        fontWeight:
            that.state.name.indexOf(name) === -1
                ? that.props.theme.typography.fontWeightRegular
                : that.props.theme.typography.fontWeightMedium,
    };
}

class AccountedTimeDisplay extends Component {
    state = {
        name: [],
        items: [],
        labelWidth: 0
    };

    requestData = () => {
        store.dispatch(setCurrentlySelectedUsers(this.state.name));
        store.dispatch(getData());
    };

    componentDidMount() {
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === this.props.location.pathname)[0]));
        store.dispatch(getActualTimeUsers());
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    handleChange = event => {
        this.setState({name: event.target.value});
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.actualTimeData.usersData !== prevProps.actualTimeData.usersData) {
            const users = this.props.actualTimeData.usersData.map(item => item.fullName).sort();
            this.setState({name: users});
        }
    }

    render() {
        const users = this.props.actualTimeData.usersData.map(item => item.fullName).sort();
        /*this.setState({name: users});*/
        const {classes} = this.props;
        const dataSource = new PivotGridDataSource({
            fields: [{
                caption: 'Сотрудник',
                width: 120,
                dataField: 'user',
                area: 'row',
                sortBySummaryField: 'Total',
                expanded: true
            }, {
                caption: 'План',
                dataField: 'plannedTime',
                summaryType: 'sum',
                format: 'decimal',
                width: 120,
                area: 'data',
                showTotals: true
            }, {
                caption: 'Отработано',
                dataField: 'spentTime',
                summaryType: 'sum',
                format: 'decimal',
                width: 120,
                area: 'data',
                showTotals: true
            }, {
                caption: 'Внесено',
                dataField: 'accountedTime',
                summaryType: 'sum',
                format: 'decimal',
                width: 120,
                area: 'data'
            }, {
                caption: 'Период',
                dataField: 'date',
                dataType: 'date',
                groupInterval: 'year',
                area: 'row',
                expanded: true
            }, {
                caption: 'Период',
                dataField: 'date',
                dataType: 'date',
                groupInterval: 'month',
                area: 'row',
                expanded: false
            }, {
                caption: 'Период',
                dataField: 'date',
                dataType: 'date',
                groupInterval: 'day',
                area: 'row',
                expanded: false
            }, {
                caption: "% к плану",
                area: "data",
                dataType: 'number',
                width: 120,
                calculateSummaryValue: function (cell) {
                    const at = cell.value("accountedTime");
                    const st = cell.value("plannedTime");
                    const actualSt = (!st || st === null || st === 0 || st.toString() === '0') ? 480 : st;
                    return (at / actualSt * 100).toFixed(2);
                },
                customizeText: function (cellInfo) {
                    /*console.log(cellInfo);*/
                    if (cellInfo.valueText === "Division_REVENUE_VALUE")
                        return 'Team_REVENUE_VALUE';
                    if (cellInfo.valueText > 100) console.log("WTF");
                    return cellInfo.valueText;
                }
            }, {
                caption: "% к факту",
                area: "data",
                dataType: 'number',
                width: 120,
                calculateSummaryValue: function (cell) {
                    const at = cell.value("accountedTime");
                    const st = cell.value("spentTime");
                    const actualSt = (!st || st === 0 || st.toString() === '0') ? 480 : st;
                    return (at / actualSt * 100).toFixed(2);
                },
                customizeText: function (cellInfo) {
                    /*console.log(cellInfo);*/
                    if (cellInfo.valueText === "Division_REVENUE_VALUE")
                        return 'Team_REVENUE_VALUE';
                    if (cellInfo.valueText > 100) console.log("WTF");
                    return cellInfo.valueText;
                }
            }],
            store: this.props.actualTimeData.reportData
        });

        return <div style={{minWidth: '100%'}}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                <FormControl variant="outlined" className={classes.formControlMultiSelect}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef = ref;
                        }}
                        htmlFor="select-multiple-checkbox">
                        Сотрудники ({this.state.name.length} выбрано)
                    </InputLabel>
                    <Select style={{minWidth: 200}}
                            multiple
                            value={this.state.name}
                            onChange={this.handleChange}
                            input={<OutlinedInput
                                labelWidth={this.state.labelWidth}
                                id="select-multiple-checkbox"
                            />}
                            MenuProps={MenuProps}
                    >
                        {users.map(user => (
                            <MenuItem key={user} value={user} style={getStyles(user, this)}>
                                {user}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    variant="outlined"
                    id="date"
                    label="Date from"
                    type="date"
                    defaultValue={this.props.actualTimeData.dateFrom}
                    onChange={field => store.dispatch(setActualTimeDateFrom(field.target.value))}
                    className={classes.textField}
                    InputLabelProps={{shrink: true,}}
                />
                <TextField
                    variant="outlined"
                    id="date"
                    label="Date to"
                    type="date"
                    defaultValue={this.props.actualTimeData.dateTo}
                    onChange={field => store.dispatch(setActualTimeDateTo(field.target.value))}
                    className={classes.textField}
                    InputLabelProps={{shrink: true,}}
                />
                <Button variant="contained" color="primary" className={classes.button} onClick={this.requestData}>
                    Загрузить
                </Button>
            </div>
            <PivotGrid
                dataSource={dataSource}
                allowSortingBySummary={true}
                allowFiltering={true}
                allowExpandAll={true}
                showBorders={true}
                showColumnTotals={false}
                showColumnGrandTotals={true}
                showRowTotals={false}
                showRowGrandTotals={false}
                export={{
                    enabled: true,
                    fileName: 'test'
                }}
                onContentReady={(e) => this.onCR(e)}
                onCellPrepared={(cell) => this.onCellP(cell)}
            >
                <FieldChooser enabled={true} height={400}/>
            </PivotGrid>
        </div>
    }

    onCR = (e) => {
        /*console.log(e);*/
    };

    onCellP = (cell) => {
        /*console.log(cell);*/
        cell.maxWidth = 50;
    };
}

AccountedTimeDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        timeAccountingData: state.timeAccountingData,
        actualTimeData: state.actualTimeData
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(AccountedTimeDisplay));
/*export default withTheme()(connect(mapStateToProps, null)(AccountedTimeDisplay));*/
