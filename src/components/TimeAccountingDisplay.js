import React, {Component} from "react";
import moment from "moment";
import ReactTable from "react-table";
import store from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import * as PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../Styles";
import connect from "react-redux/es/connect/connect";
import FilterIcon from '@material-ui/icons/Settings';
import Button from "@material-ui/core/Button/Button";
import TimeAccountingFilterDialog from "./TimeAccountingFilterDialog";

class TimeAccountingDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'paper',
            items: []
        }
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    componentWillMount() {
        store.dispatch(setSelectedNavItem({title: 'Трудозатраты', selectedId: 1}));
    }

    handleClickOpen = scroll => () => {
        this.setState({open: true, scroll});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount() {
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        const url = "http://10.9.172.76:8081/api/wi_today";
        fetch(url, {
            method: "GET",
            headers: myHeaders
        }).then(res => res.json()).then(json => {
            !this.isCancelled && this.setState({items: json});
        }).catch(err => console.log(err));
    }

    render() {
        const {classes} = this.props;
        const items = this.state.items;
        if (items === null) return <div>Loading</div>;
        if (items.length === 0) return <div>No items to display</div>;
        const i = items.map(item => item.id).reduce(
            (a, b, i, arr) =>
                (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
            null);
        console.log(i);
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
            {id: 'crDate', Header: 'Дата', accessor: d => moment(d).format('YYYY-MM-DD')},
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
            <Button variant="fab" className={classes.fab} color={'primary'} onClick={this.handleClickOpen('paper')}>
                <FilterIcon/>
            </Button>
        </div>
    }
}

TimeAccountingDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        reportFilters: state.reportFilters,
        reports: state.reports,
        appBarState: state.appBarState,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(TimeAccountingDisplay));