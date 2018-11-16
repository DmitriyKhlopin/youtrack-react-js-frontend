import React, {Component} from "react";
import moment from "moment";
import ReactTable from "react-table";
import store from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import * as PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../Styles";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import TimeAccountingFilterDialog from "./TimeAccountingFilterDialog";
import {fetchTimeAccountingDictionaryData} from "../redux/actions/timeAccountingActions";
import RefreshIcon from '@material-ui/icons/Refresh';

class TimeAccountingDictionaryDisplay extends Component {
    requestData = () => {
        store.dispatch(fetchTimeAccountingDictionaryData());
    };

    componentDidMount() {
        store.dispatch(setSelectedNavItem({title: 'Справочник проектов', selectedId: 5}));
        this.requestData();
    }

    render() {
        const {classes} = this.props;
        const items = this.props.timeAccountingData.timeData;
        if (items === null) return <div>Loading</div>;
        if (items.length === 0) return <div>No items to display</div>;
        const columns = [{
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

        return <div>
            <ReactTable
                style={{width: '100vw'}}
                data={items}
                filterable
                defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value}
                columns={columns}
            />
            <TimeAccountingFilterDialog open={this.state.open}
                                        handleClose={this.handleClose}
                                        aria-labelledby="scroll-dialog-title"/>
            <Button variant="fab" mini className={classes.fabLoad} color={'secondary'}
                    onClick={this.requestData}>
                <RefreshIcon/>
            </Button>
        </div>
    }
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

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(TimeAccountingDictionaryDisplay));