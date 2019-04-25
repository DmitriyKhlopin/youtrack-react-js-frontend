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
import clsx from 'clsx';
import * as XLSX from 'xlsx';

import LinearProgress from "@material-ui/core/LinearProgress";
import {getHighPriorityIssues} from "../redux/actions/highPriorityIssuesActions";
import {Fab} from "@material-ui/core";
import * as moment from "moment";
import {now} from "moment";
import {makeStyles} from "@material-ui/styles";
import {red} from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {fetchPartnerCustomers, fetchProjects} from "../redux/actions/reportFiltersActions";
import * as ReactDOM from "react-dom";

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
        /*store.dispatch(getHighPriorityIssues());*/
        if (this.props.reportFilters.proj.length === 0) {
            store.dispatch(fetchProjects());
            store.dispatch(fetchPartnerCustomers());
        }
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef2).offsetWidth,
        });
    }

    handleChange = event => {
        this.setState({[event.target.name.toLowerCase()]: event.target.value});
    };

    loadData = () => {
        store.dispatch(getHighPriorityIssues(this.state.projects));
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
        const {classes} = this.props;
        return <div style={{minWidth: '100%', position: 'relative'}}>
            <div style={{
                display: 'flex',
                /*flexWrap: 'wrap',*/
            }}>
                <FormControl variant="outlined" /*className={classes.formControl}*/ style={{minWidth: 150, margin: 8}}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef2 = ref;
                        }}
                        htmlFor="outlined-projects-simple"
                    >
                        Projects
                    </InputLabel>
                    <Select
                        value={this.state.projects}
                        onChange={this.handleChange}
                        multiple={true}
                        input={
                            <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="Projects"
                                id="outlined-projects-simple"
                            />
                        }
                    >
                        {<MenuItem value="">
                            <em>Select project</em>
                        </MenuItem>}
                        {this.props.reportFilters.proj.map((item, index) => (
                            <MenuItem key={`projects-list-item-${index}`} value={item}>{item.shortName}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <FormControl variant="outlined"
                             style={{minWidth: 150, margin: 8, height: '100vh', verticalAlign: "bottom"}}>
                    <Button variant="contained" color="primary" className={classes.button2} onClick={this.loadData}>
                        Загрузить
                    </Button>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <Button variant="contained" color="primary" className={classes.button2}
                            onClick={() =>

                                this.exportToExcel()
                            }>
                        Выгрузить в xlsx
                    </Button>
                </FormControl>
            </div>
            {this.props.highPriorityIssuesData.fetching ?
                <LinearProgress/> : this.props.highPriorityIssuesData.issues.map((item, index) => {
                    return <HighPriorityIssueView issue={item} key={`hpiv-${index}`}/>;
                })}
            <Fab style={{position: 'absolute', top: 80, right: 16}} color={'secondary'}
                 onClick={() => this.exportToExcel()}>
                <ImportExportIcon/>
            </Fab>
        </div>;
    }
}


HighPriorityIssuesDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        reportFilters: state.reportFilters,
        highPriorityIssuesData: state.highPriorityIssuesData
    }
}

export default withStyles(styles)(connect(mapStateToProps, null)(HighPriorityIssuesDisplay));


function HighPriorityIssueView(props) {
    const classes = useStyles();
    const issue = props.issue;
    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    return (<Card className={classes.card}>
        <CardHeader
            title={issue.id + " " + issue.summary}
            action={
                <IconButton className={clsx(classes.expand, {[classes.expandOpen]: expanded,})}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Show more">
                    <ExpandMoreIcon/>
                </IconButton>
            }
        />
        <CardContent className={classes.content} onClick={handleExpandClick}>
            <Typography>{issue.state}</Typography>
            <Typography>{issue.comment === null ? 'Нет комментария' : issue.comment}</Typography>
            <Typography>{issue.tfsData.length === 0 ? 'Нет issue в TFS' : `${issue.tfsData.length} issue в TFS`}</Typography>
            <Typography>{[...new Set(issue.tfsData.map((e) => e.issueState))].map((e) => e + " " + issue.tfsData.filter((i) => i.issueState === e).length).join('; ')}</Typography>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                {issue.tfsData.map((item, index) => <TFSIssueView key={`hpivas-${index}`} data={item}/>)}
            </CardContent>
        </Collapse>

    </Card>);

}

const useStyles = makeStyles(theme => ({
    card: {
        margin: 16,
        maxWidth: '100%',
    },
    content: {
        paddingTop: 0,
        paddingBottom: 0,
    },

    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function TFSIssueView(props) {
    const tfsIssue = props.data;
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
            stateSuffix = tfsIssue.issueMergedIn === null ? '' : `Внесено в ${tfsIssue.issueMergedIn}, бранч - ${tfsIssue.iterationPath}`;
            break;
        }
        default: {
            stateSuffix = `Без изменения с ${tfsIssue.issueLastUpdate}`;
            break;
        }
    }


    return (
        <div style={{color: color, padding: 0}}>
            <div>Issue {tfsIssue.issueId} {tfsIssue.issueState}</div>
            <div>{stateSuffix}</div>
            {tfsIssue.defects.map((item, index) => <TFSDefectView key={`hpi-tfs-defect-${index}`} data={item}/>)}
        </div>
    );
};

class TFSDefectView extends Component {
    render() {
        const tfsDefect = this.props.data;
        let color;
        switch (tfsDefect.defectReason.toLowerCase()) {
            case 'test passed': {
                color = '#43a047';
                break;
            }
            case 'not a bug': {
                color = '#43a047';
                break;
            }
            case 'duplicate': {
                color = '#43a047';
                break;
            }
            case 'assigned': {
                color = '#c0ca33';
                break;
            }
            case 'cannot reproduce': {
                color = '#fb8c00';
                break;
            }
            case 'fixed': {
                color = '#e53935';
                break;
            }
            case 'not fixed': {
                color = '#e53935';
                break;
            }
            default: {
                color = 'grey';
                break;
            }
        }

        return (<div style={{marginLeft: 16, marginTop: 8, color: color}}>
            <div>Defect {tfsDefect.defectId} - {tfsDefect.defectReason}</div>
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
        return (<div style={{marginLeft: 32, marginTop: 8}}>
            <div>Change request {tfsChangeRequest.changeRequestId}</div>
            <div>{tfsChangeRequest.changeRequestMergedIn}</div>
            <div>{tfsChangeRequest.changeRequestReason}</div>
            <div>{tfsChangeRequest.iterationPath}</div>
        </div>);
    }
};
