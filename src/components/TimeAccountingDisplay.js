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
import {fetchTimeAccountingData} from "../redux/actions/timeAccountingActions";
import RefreshIcon from '@material-ui/icons/Refresh';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import {PAGES, Workbook} from "../Const";
import * as XLSX from "xlsx";

//TODO style={classes.content} causes crashes in firefox

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
        /*store.dispatch(setSelectedNavItem({title: 'Трудозатраты', selectedId: 1}));*/
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === this.props.location.pathname)[0]));
    }

    requestData = () => {
        store.dispatch(fetchTimeAccountingData());
    };

    handleClickOpen = scroll => () => {
        this.setState({open: true, scroll});
    };

    handleClose = () => {
        this.requestData();
        this.setState({open: false});
    };

    componentDidMount() {
        store.dispatch(fetchTimeAccountingData());
    }


    download = (url, name) => {
        let a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url)
    };

    static s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i)
            view[i] = s.charCodeAt(i) & 0xFF;
        return buf
    }

    exportToExcel = () => {
        const issues = this.props.timeAccountingData.timeData.map((item) => {
            return {
                id: item.id,
                agent: item.agent,
                created: moment.unix(item.crDate / 1000).format("DD.MM.YYYY"),
                changed: moment.unix(item.changedDate / 1000).format("DD.MM.YYYY"),
                discipline: item.discipline,
                iterationPath: item.iterationPath,
                person: item.person,
                priority: item.priority,
                projects: item.projects,
                role: item.role,
                server: item.server,
                teamProject: item.teamProject,
                title: item.title,
                units: item.units,
                wit: item.wit,
            }
        });

        const wb = new Workbook();
        let ws = XLSX.utils.json_to_sheet(issues);
        XLSX.utils.book_append_sheet(wb, ws, "issues");
        XLSX.writeFile(wb, "export.xlsx");
    };

    render() {
        const {classes} = this.props;
        const items = this.props.timeAccountingData.timeData;
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

        return <div style={{minWidth: '100%'}}>
            <div style={{
                float: 'right',
                top: 72,
                right: 16,
                position: 'fixed',
                display: 'flex',
                zIndex: 3,
                alignItems: 'flex-end'
            }}>
                <div style={{margin: 16, flex: 1}}>
                    <Button variant="fab" mini className={classes.fabLoad} color={'secondary'}
                            onClick={this.requestData}>
                        <RefreshIcon/>
                    </Button>
                </div>
                <div style={{margin: 16, flex: 1}}>
                    <Button variant="fab" mini className={classes.fab} color={'primary'}
                            onClick={this.handleClickOpen('paper')}>
                        <FilterIcon/>
                    </Button>
                </div>
                <div style={{margin: 16, flex: 1, float: 'right'}}>
                    <Button variant="fab" mini className={classes.fab} color={'primary'}
                            onClick={this.exportToExcel}>
                        <DownloadIcon/>
                    </Button>
                </div>
            </div>
            <ReactTable
                data={items}
                filterable
                defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value}
                columns={columns}
            />
            <TimeAccountingFilterDialog open={this.state.open}
                                        handleClose={this.handleClose}
                                        aria-labelledby="scroll-dialog-title"/>

        </div>
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

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(TimeAccountingDisplay));
