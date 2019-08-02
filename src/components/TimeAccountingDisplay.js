import React, {Component} from "react";
import moment from "moment";
import ReactTable from "react-table";
import store from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import * as PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {fetchTimeAccountingData} from "../redux/actions/timeAccountingActions";
import {PAGES} from "../Const";

class TimeAccountingDisplay extends Component {
    componentWillMount() {
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === this.props.location.pathname)[0]));
    }

    componentDidMount() {
        store.dispatch(fetchTimeAccountingData());
    }

    render() {
        const items = this.props.timeAccountingData.timeData;
        const columns = [{
            Header: 'ID задачи',
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
                Header: 'Сотрудник', accessor: 'agent', filterMethod: (filter, row) =>
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
            },
            {
                Header: 'Приоритет',
                accessor: 'priority',
                Footer: (
                    <span><strong>Popular: </strong>{" "} {items.map(item => item.priority).reduce(
                        (a, b, i, arr) =>
                            (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
                        null)}</span>
                ),
                filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) ||
                    row[filter.id].endsWith(filter.value)
            }];

        return (<div style={{width: '100%'}}>
            <ReactTable data={items}
                        filterable
                        defaultFilterMethod={(filter, row) =>
                            String(row[filter.id]) === filter.value}
                        columns={columns}
            /></div>)
    }
}

TimeAccountingDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        timeAccountingData: state.timeAccountingData,
    }
}

export default (connect(mapStateToProps, null)(TimeAccountingDisplay));
