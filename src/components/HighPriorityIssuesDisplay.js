import React, {Component} from "react";
import store from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import * as PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {styles} from "../Styles";
import connect from "react-redux/es/connect/connect";
import {fetchTimeAccountingData} from "../redux/actions/timeAccountingActions";
import {PAGES} from "../Const";
import ImportExportIcon from '@material-ui/icons/CloudDownload';

import * as XLSX from 'xlsx';

import LinearProgress from "@material-ui/core/LinearProgress";
import {getHighPriorityIssues} from "../redux/actions/highPriorityIssuesActions";
import {Fab} from "@material-ui/core";
import * as moment from "moment";
import {now} from "moment";
import Paper from "@material-ui/core/Paper";

function Workbook() {
    if (!(this instanceof Workbook))
        return new Workbook();
    this.SheetNames = [];
    this.Sheets = {}
}

//TODO style={classes.content} causes crashes in firefox

class HighPriorityIssuesDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            scroll: 'paper',
            projects: []
        }
    }

    requestData = () => {
        store.dispatch(fetchTimeAccountingData());
    };

    componentDidMount() {
        console.log(this.props.location);
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === this.props.location.pathname)[0]));
        store.dispatch(getHighPriorityIssues());
    }

    handleChange = event => {
        this.setState({[event.target.name.toLowerCase()]: event.target.value});
    };


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

    exportToExcel() {
        const issues = this.props.highPriorityIssuesData.issues.map((item) => {
            return {
                id: item.id,
                summary: item.summary,
                created: moment.unix(item.created / 1000).format("MM/DD/YYYY"),
                priority: item.priority,
                state: item.state,
                comment: item.comment,
                issues: item.tfsData
                    .map((item) => `${item.issueId} - ${item.issueState} ${item.issueMergedIn === null ? '' : ` - ${item.issueMergedIn}`}`)
                    .join(', '),
                defects: item.tfsData
                    .flatMap((item) => item.defects).map((item) => `${item.defectId} - ${item.defectReason} - ${item.developmentManager}`)
                    .join(', '),
                changeRequests: item.tfsData
                    .flatMap((item) => item.defects)
                    .flatMap((item) => item.changeRequests)
                    .map((item) => `${item.changeRequestId} - ${item.changeRequestMergedIn} - ${item.iterationPath}`)
                    .join(', ')
            }
        });

        const wb = new Workbook();
        let ws = XLSX.utils.json_to_sheet(issues);
        XLSX.utils.book_append_sheet(wb, ws, "issues");
        XLSX.writeFile(wb, "export.xlsx");
    }

    render() {
        return <div style={{minWidth: '100%'}}>
            <Fab style={{position: 'absolute', top: 80, right: 16}} color={'secondary'}
                 onClick={() => this.exportToExcel()}>
                <ImportExportIcon/>
            </Fab>
            {this.props.highPriorityIssuesData.fetching ?
                <LinearProgress/> : this.props.highPriorityIssuesData.issues.map((item, index) => {
                    {/*<div key={`di-${index}`}>{JSON.stringify(item)}</div>)*/
                    }
                    return <HighPriorityIssueView issue={item} key={`hpiv-${index}`}/>;
                })}
        </div>;
    }
}


HighPriorityIssuesDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        highPriorityIssuesData: state.highPriorityIssuesData
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, null)(HighPriorityIssuesDisplay));

class HighPriorityIssueView extends Component {
    render() {
        const issue = this.props.issue;
        console.log(issue);
        return (<Paper style={{padding: 16, margin: 16}}>
            <div>{issue.id} {issue.summary}</div>
            <div>{issue.comment}</div>
            {issue.tfsData.map((item, index) => <TFSIssueView key={`hpivas-${index}`} data={item}/>)}
        </Paper>);
    }
}

class TFSIssueView extends Component {
    render() {
        const tfsIssue = this.props.data;

        const now = moment(now);
        const then = moment(tfsIssue.issueLastUpdate, 'YYYY/MM/DD HH:mm:ss');
        const duration = now.diff(then, 'days');
        let color;
        switch (true) {
            case duration > 2 && tfsIssue.issueState !== 'Closed': {
                color = '#e53935';
                break;
            }
            case duration > 1 && tfsIssue.issueState !== 'Closed': {
                color = '#fb8c00';
                break;
            }
            case tfsIssue.issueState !== 'Closed': {
                color = '#c0ca33';
                break;
            }
            case tfsIssue.issueState === 'Closed': {
                color = '#43a047';
                break;
            }
            default: {
                color = 'grey';
                break;
            }
        }

        let stateSuffix;
        switch (tfsIssue.issueState) {
            case 'Closed': {
                stateSuffix = tfsIssue.issueMergedIn === null ? '' : ` (внесено в ${tfsIssue.issueMergedIn}, бранч - ${tfsIssue.iterationPath})`;
                break;
            }
            default: {
                stateSuffix = ` (без изменения с ${tfsIssue.issueLastUpdate})`;
                break;
            }
        }

        return (
            <div style={{marginLeft: 8, padding: 8}}>
                <div>Issue {tfsIssue.issueId}</div>
                <div style={{color: color}}>{tfsIssue.issueState}{stateSuffix}</div>
                {tfsIssue.defects.map((item, index) => <TFSDefectView key={`hpi-tfs-defect-${index}`} data={item}/>)}
            </div>
        );
    }
};

class TFSDefectView extends Component {
    render() {
        const tfsDefect = this.props.data;
        return (<div style={{marginLeft: 32, marginTop: 16}}>
            <div>{tfsDefect.defectId}</div>
            <div>{tfsDefect.defectReason}</div>
            <div>{tfsDefect.developmentManager}</div>
            <div>{tfsDefect.iterationPath}</div>
            {tfsDefect.changeRequests.map((item, index) => <TFSChangeRequestsView key={`hpi-tfs-defect-${index}`}
                                                                                  data={item}/>)}
        </div>);
    }
};

class TFSChangeRequestsView extends Component {
    render() {
        const tfsChangeRequest = this.props.data;
        return (<div style={{marginLeft: 48, marginTop: 16}}>
            <div>{tfsChangeRequest.changeRequestId}</div>
            <div>{tfsChangeRequest.changeRequestMergedIn}</div>
            <div>{tfsChangeRequest.changeRequestReason}</div>
            <div>{tfsChangeRequest.iterationPath}</div>
        </div>);
    }
};
