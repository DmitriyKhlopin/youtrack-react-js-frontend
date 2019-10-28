import React, {useEffect} from "react";
import moment from "moment";
import ReactTable from "react-table";
import {store} from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import connect from "react-redux/es/connect/connect";
import {fetchTimeAccountingDictionaryData} from "../redux/actions/timeAccountingActions";
import {PAGES} from "../Const";
import {withRouter} from "react-router-dom";

function TimeAccountingDictionaryDisplay({location, timeAccountingData}) {
    useEffect(() => {
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === location.pathname)[0]));
        requestData();
    }, []);

    const requestData = () => {
        store.dispatch(fetchTimeAccountingDictionaryData());
    };
    const items = timeAccountingData.dictionaryData;
    let table;
    let columns;
    if (items === null) table = <div>Loading</div>;
    if (items && items.length === 0) table = <div>No items to display</div>;
    if (items && items.length !== 0) columns = [
        {
            Header: 'PROJECT',
            accessor: 'projectShortName',
            Footer: (
                <span><strong>Popular: </strong>{" "} {items.map(item => item.id).reduce(
                    (a, b, i, arr) =>
                        (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
                    null)}</span>
            ),
            filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value) ||
                row[filter.id].endsWith(filter.value)
        },
        {
            Header: 'Customer', accessor: 'customer', filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value) ||
                row[filter.id].endsWith(filter.value)
        },
        {id: 'ets', Header: 'ETS', accessor: 'projectEts'},
        {
            id: 'iterationPath',
            Header: 'iterationPath',
            accessor: d => d.iterationPath === null ? 'Зависит от версии продукта' : d.iterationPath
        },
        {id: 'dateFrom', Header: 'Начало', accessor: d => moment(d.dateFrom).format('YYYY-MM-DD')},
        {id: 'dateTo', Header: 'Окончание', accessor: d => moment(d.dateTo).format('YYYY-MM-DD')},
    ];

    if (columns) {
        table = <ReactTable
            data={items}
            filterable
            defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
            columns={columns}
        />
    }
    return (<div style={{width: '100%'}}>{table}</div>)
}

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        timeAccountingData: state.timeAccountingData,
    }
}

export default withRouter(connect(mapStateToProps, null)(TimeAccountingDictionaryDisplay));
