import React, {useEffect} from "react";
import moment from "moment";
import ReactTable from "react-table";
import store from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import * as PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {fetchTimeAccountingDictionaryData} from "../redux/actions/timeAccountingActions";
import {PAGES} from "../Const";
import {withRouter} from "react-router-dom";

function TimeAccountingDictionaryDisplay(props) {
    useEffect(() => {
        console.log(props);
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === props.location.pathname)[0]));
        requestData();
    }, []);

    const requestData = () => {
        store.dispatch(fetchTimeAccountingDictionaryData());
    };
    const items = props.timeAccountingData.timeData;
    let table;
    let columns;

    if (items === null) table = <div>Loading</div>;
    if (items && items.length === 0) table = <div>No items to display</div>;
    if (items && items.length !== 0) columns = [{
        Header: 'ID',
        accessor: 'id',
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
            Header: 'User', accessor: 'agent', filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value) ||
                row[filter.id].endsWith(filter.value)
        },
        {Header: 'Трудозатраты', accessor: 'units',},
        {id: 'crDate', Header: 'Дата', accessor: d => moment(d.changedDate).format('YYYY-MM-DD')},
        {
            Header: 'Проект',
            accessor: 'projects',
            Footer: (
                <span><strong>Popular: </strong>{" "} {items.map(item => item.projects).reduce(
                    (a, b, i, arr) =>
                        (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
                    null)}</span>
            )
        },
        {
            Header: 'Этап',
            accessor: 'iterationPath',
            Footer: (
                <span><strong>Popular: </strong>{" "} {items.map(item => item.iterationPath).reduce(
                    (a, b, i, arr) =>
                        (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
                    null)}</span>
            ),
            filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value) ||
                row[filter.id].endsWith(filter.value)
        }];

    if (columns) {
        table = <ReactTable
            style={{width: '100vw'}}
            data={items}
            filterable
            defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
            columns={columns}
        />
    }
    return (<div>{table}</div>)
}

TimeAccountingDictionaryDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        timeAccountingData: state.timeAccountingData,
    }
}

export default withRouter(connect(mapStateToProps, null)(TimeAccountingDictionaryDisplay));
