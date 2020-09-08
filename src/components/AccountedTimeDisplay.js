import React, {useEffect, useState} from "react";
import {store} from "../redux/store";
import connect from "react-redux/es/connect/connect";
import {getActualTimeUsers, getData, setActualTimeDateFrom, setActualTimeDateTo, setCurrentlySelectedUsers} from "../redux/actions/actualTimeActions";
import * as ReactDOM from "react-dom";
import PivotGrid, {FieldChooser} from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

import styles from "../styles/components.module.css";
import {useDispatch} from "react-redux";

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


function AccountedTimeDisplay({actualTimeData}) {

    const [name, setName] = useState([]);
    const [items, setItems] = useState([]);
    const [labelWidth, setLabelWidth] = useState(0);
    const dispatch = useDispatch();
    const users = actualTimeData.usersData.map(item => item.fullName).sort();

    const requestData = () => {
        dispatch(setCurrentlySelectedUsers(name));
        dispatch(getData());
    };


    useEffect(() => {
        dispatch(getActualTimeUsers());
        /*setLabelWidth(ReactDOM.findDOMNode(InputLabelRef).offsetWidth);*/
    }, [])

    useEffect(() => {
        const users = actualTimeData.usersData.map(item => item.fullName).sort();
        setName(users);
    }, [actualTimeData.usersData]);


    const handleChange = event => {
        setName(event.target.value);
    };

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
        store: actualTimeData.reportData
    });

    const onCR = (e) => {
    };

    const onCellP = (cell) => {
        cell.maxWidth = 50;
    };


    return (<div>
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
        }}>
            {/*<FormControl variant="outlined" className={classes.formControlMultiSelect}>
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
            </FormControl>*/}
            <text id="date"
                  type="date"
                  value={actualTimeData.dateFrom}
                  onChange={field => dispatch(setActualTimeDateFrom(field.target.value))}
            />
            <text
                variant="outlined"
                id="date"
                label="Date to"
                type="date"
                defaultValue={actualTimeData.dateTo}
                onChange={field => dispatch(setActualTimeDateTo(field.target.value))}
                InputLabelProps={{shrink: true,}}
            />
            <button className={styles.button} onClick={requestData}>Загрузить</button>
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
            onContentReady={(e) => onCR(e)}
            onCellPrepared={(cell) => onCellP(cell)}
        >
            <FieldChooser enabled={true} height={400}/>
        </PivotGrid>
    </div>)


}

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        timeAccountingData: state.timeAccountingData,
        actualTimeData: state.actualTimeData
    }
}

export default connect(mapStateToProps, null)(AccountedTimeDisplay);

