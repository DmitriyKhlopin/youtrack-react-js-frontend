import React, {Component} from "react";
import store from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import * as PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../Styles";
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
        items: []
    };

    requestData = () => {
        store.dispatch(setCurrentlySelectedUsers(this.state.name));
        store.dispatch(getData());
    };

    componentDidMount() {

        store.dispatch(setSelectedNavItem({title: 'Отработанное и учтённое время', selectedId: 6}));
        store.dispatch(getActualTimeUsers());
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({pivotState: nextProps});
    }

    handleChange = event => {
        this.setState({name: event.target.value});

    };

    render() {
        const users = this.props.actualTimeData.usersData.map(item => item.fullName);
        const {classes} = this.props;
        const items = this.props.actualTimeData.reportData;

        const columns = [{
                Header: 'Сотрудник',
                accessor: 'user',
            }, items.map(item => {
                return {
                    Header: item.date,
                    accessor: item.date

                }
            })]
        ;
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
                dataSource={this.props.actualTimeData.reportData}
                allowSortingBySummary={true}
                allowFiltering={true}
                showBorders={true}
                showColumnTotals={false}
                showColumnGrandTotals={false}
                showRowTotals={false}
                showRowGrandTotals={false}
            >
                <FieldChooser enabled={true} height={400}/>
            </PivotGrid>


        </div>
    }
}

/*
*
* <PivotTableUI
                key="PIVOT-KEY"
                data={this.props.actualTimeData.reportData}
                onChange={s => this.setState(s)}
                {...this.state}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
            />*/

AccountedTimeDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        /*reportFilters: state.reportFilters,
        reports: state.reports,*/
        appBarState: state.appBarState,
        timeAccountingData: state.timeAccountingData,
        actualTimeData: state.actualTimeData
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(AccountedTimeDisplay));

/*<ReactTable
                style={classes.content}
                data={items}
                filterable
                defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value}
                columns={columns}
            />*/