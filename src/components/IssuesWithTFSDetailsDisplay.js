import React, {Component} from "react";
import store from "../redux/store";
import {setSelectedNavItem} from "../redux/actions/appBarActions";
import withStyles from "@material-ui/core/styles/withStyles";
import connect from "react-redux/es/connect/connect";
import {fetchTimeAccountingData} from "../redux/actions/timeAccountingActions";
import {PAGES, Workbook} from "../Const";
import * as XLSX from 'xlsx';

import LinearProgress from "@material-ui/core/LinearProgress";
import {getHighPriorityIssues} from "../redux/actions/highPriorityIssuesActions";
import * as moment from "moment";
import {now} from "moment";
import {createStyles, makeStyles} from "@material-ui/styles";
import {red} from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = createStyles({
    content: {
        overflow: 'auto',
        flexGrow: 1,
        padding: 0,
        margin: '64px 0px 0px 0px',
        position: 'relative',
        display: 'flex',
    },
    formControl: {
        margin: 8,
        minWidth: 120,
    },

});

//TODO style={classes.content} causes crashes in firefox
const IssuesWithTFSDetailsDisplay = withStyles(styles)(class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                open: false,
                scroll: 'paper',
                projects: [],
                customers: [],
                defaultPriorities: ['Major', 'Normal', 'Minor'],
                priorities: ['Major', 'Normal', 'Minor'],
                defaultStates: ['Активные', 'Завершенные'],
                states: ['Активные'],
                selectedAllProjects: false,
                selectedAllCustomers: false,
                selectedAllPriorities: false,
                labelWidth1: 0,
                labelWidth2: 0,
                labelWidth3: 0,
                labelWidth4: 0,
                primaryColumnsOnly: true
            }
        }

        requestData = () => {
            store.dispatch(fetchTimeAccountingData());
        };

        componentDidMount() {
            store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === this.props.location.pathname)[0]));
            if (this.props.reportFilters.proj.length === 0) {
                store.dispatch(fetchProjects());
            }
            if (this.props.reportFilters.partnerCustomers.length === 0) {
                store.dispatch(fetchPartnerCustomers());
            }
            this.setState({
                labelWidth1: ReactDOM.findDOMNode(this.InputLabelRef1).offsetWidth,
                labelWidth2: ReactDOM.findDOMNode(this.InputLabelRef2).offsetWidth,
                labelWidth3: ReactDOM.findDOMNode(this.InputLabelRef3).offsetWidth,
                labelWidth4: ReactDOM.findDOMNode(this.InputLabelRef4).offsetWidth,
            });
        }

        handleChange = event => {
            if (event.target.value.includes('SelectAll')) {
                let t;
                switch (event.target.name) {
                    case 'Projects':
                        t = this.state.selectedAllProjects ? [] : this.props.reportFilters.proj;
                        break;
                    case 'Customers':
                        t = this.state.selectedAllCustomers ? [] : Array.from([...new Set(this.props.reportFilters.partnerCustomers.filter((item) => this.state.projects.map((p) => p.shortName).includes(item.project)))]);
                        break;
                    case 'Priorities':
                        t = this.state.selectedAllPriorities ? [] : this.state.defaultPriorities;
                        break;
                    default:
                        t = [];
                        break
                }
                this.setState({
                    [event.target.name.toLowerCase()]: t,
                    [`selectedAll${event.target.name}`]: !this.state[`selectedAll${event.target.name}`],
                });
            } else {
                this.setState({[event.target.name.toLowerCase()]: event.target.value.filter((item) => item !== '')});
            }

        };

        loadData = () => {
            store.dispatch(getHighPriorityIssues(this.state.projects, this.state.customers, this.state.priorities, this.state.states));
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

        applyTranslations(item) {
            let t;
            switch (item) {
                case 'Submitted': {
                    t = 'Зарегистрирована';
                    break;
                }
                case 'Open': {
                    t = 'Открыта';
                    break;
                }
                case 'Bug': {
                    t = 'Ошибка';
                    break;
                }
                case 'Major': {
                    t = 'Высокий';
                    break;
                }
                case 'Normal': {
                    t = 'Обычный';
                    break;
                }
                case 'Minor': {
                    t = 'Низкий';
                    break;
                }
                default : {
                    t = item;
                    break;
                }

            }
            return t
        }

        exportedProjects = (array) => {
            return [...new Set(array.map((item) => item.id.substring(0, item.id.indexOf('-'))))];
        };

        exportDefects = () => {
            const issues = this.props.highPriorityIssuesData.issues.flatMap((item, index) => {
                return item.tfsData
                    .flatMap((a) => a.defects).map((b) => {
                        return {
                            tl: b.developmentManager,
                            defect: b.defectId,
                            state: b.defectState,
                            reason: b.defectReason,
                            deadline: b.defectDeadline,
                            id: item.id,
                            comment: item.comment
                        }
                    });

            });
            const i = this.exportedProjects(this.props.highPriorityIssuesData.issues);
            console.log(issues);
            const wb = new Workbook();
            let ws = XLSX.utils.json_to_sheet(issues);
            XLSX.utils.book_append_sheet(wb, ws, "issues");
            XLSX.writeFile(wb, `Статус запросов ${i.length === 1 ? `по проекту ${i[0]}` : `по ${i.length} проектам`}.xlsx`);
        };


        exportToExcel = () => {
            const issues = this.props.highPriorityIssuesData.issues.map((item, index) => {
                return this.state.primaryColumnsOnly ? {
                    '': index + 1,
                    'ID задачи': item.id,
                    'Заголовок': item.summary,
                    'Состояние': this.applyTranslations(item.state),
                    'Приоритет': this.applyTranslations(item.priority),
                    'Тип': this.applyTranslations(item.type),
                    'Комментарий': item.comment,
                } : {
                    '': index + 1,
                    'ID задачи': item.id,
                    'Проект': item.project,
                    'Заказчик': item.customer,
                    'Заголовок': item.summary,
                    'Создана': moment.unix(item.created / 1000).format("MM/DD/YYYY"),
                    'Состояние': this.applyTranslations(item.state),
                    'Приоритет': this.applyTranslations(item.priority),
                    'Тип': this.applyTranslations(item.type),
                    'Комментарий': item.comment,
                    'Поле Issue': item.issue,
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
                        .join(', '),
                    timeUser: item.timeUser,
                    timeAgent: item.timeAgent,
                    timeDeveloper: item.timeDeveloper,
                }
            });
            const i = this.exportedProjects(this.props.highPriorityIssuesData.issues);
            const wb = new Workbook();
            let ws = XLSX.utils.json_to_sheet(issues);
            XLSX.utils.book_append_sheet(wb, ws, "issues");
            XLSX.writeFile(wb, `Статус запросов ${i.length === 1 ? `по проекту ${i[0]}` : `по ${i.length} проектам`}.xlsx`);
        };

        render() {
            const {classes} = this.props;
            return <div style={{display: 'flex', padding: 0, margin: 0}}>
                <div style={{
                    minWidth: '100%',
                    position: 'fixed',
                    display: 'flex',
                    backgroundColor: '#ddd',
                    zIndex: 3
                }}>
                    <FormControl variant="outlined" style={{minWidth: 150, maxWidth: 250, margin: 8}} component='div'>
                        <InputLabel
                            ref={ref => {
                                this.InputLabelRef1 = ref;
                            }}
                            htmlFor="outlined-projects-simple"
                        >
                            Проекты
                        </InputLabel>
                        <Select
                            value={this.state.projects}
                            onChange={this.handleChange}
                            multiple={true}
                            renderValue={selected => selected.map((item => item.shortName)).join(", ")}
                            input={
                                <OutlinedInput
                                    labelWidth={this.state.labelWidth1}
                                    name="Projects"
                                    id="outlined-projects-simple"
                                />
                            }
                        >
                            {<MenuItem value="SelectAll"> <em>Выбрать все</em> </MenuItem>}
                            {this.props.reportFilters.proj.map((item, index) => (
                                <MenuItem key={`projects-list-item-${index}`} value={item}><Checkbox
                                    checked={this.state.projects.indexOf(item) > -1}/>{item.shortName}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" style={{minWidth: 150, maxWidth: 250, margin: 8}}>
                        <InputLabel
                            ref={ref => {
                                this.InputLabelRef2 = ref;
                            }}
                            htmlFor="outlined-customers-simple"
                        >
                            Заказчики
                        </InputLabel>
                        <Select
                            value={this.state.customers}
                            onChange={this.handleChange}
                            multiple={true}
                            input={
                                <OutlinedInput
                                    labelWidth={this.state.labelWidth2}
                                    name="Customers"
                                    id="outlined-customers-simple"
                                />
                            }
                        >
                            {<MenuItem value="SelectAll"> <em>Выбрать все</em> </MenuItem>}
                            {this.props.reportFilters.partnerCustomers.filter((item) => this.state.projects.map((p) => p.shortName).includes(item.project)).map((item, index) => (
                                <MenuItem key={`customers-list-item-${index}`} value={item}>{item.customer}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" style={{minWidth: 150, maxWidth: 250, margin: 8}}>
                        <InputLabel
                            ref={ref => {
                                this.InputLabelRef3 = ref;
                            }}
                            htmlFor="outlined-priorities-simple"
                        >
                            Приоритеты
                        </InputLabel>
                        <Select
                            value={this.state.priorities}
                            onChange={this.handleChange}
                            multiple={true}
                            input={
                                <OutlinedInput
                                    labelWidth={this.state.labelWidth3}
                                    name="Priorities"
                                    id="outlined-priorities-simple"
                                />
                            }
                        >
                            {<MenuItem value="SelectAll"> <em>Выбрать все</em> </MenuItem>}
                            {this.state.defaultPriorities.map((item, index) => (
                                <MenuItem key={`priorities-list-item-${index}`} value={item}>{item}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>


                    <FormControl variant="outlined" style={{minWidth: 150, maxWidth: 250, margin: 8}}>
                        <InputLabel
                            ref={ref => {
                                this.InputLabelRef4 = ref;
                            }}
                            htmlFor="outlined-states-simple"
                        >
                            Состояния
                        </InputLabel>
                        <Select
                            value={this.state.states}
                            onChange={this.handleChange}
                            multiple={true}
                            input={
                                <OutlinedInput
                                    labelWidth={this.state.labelWidth4}
                                    name="States"
                                    id="outlined-states-simple"
                                />
                            }
                        >
                            {this.state.defaultStates.map((item, index) => (
                                <MenuItem key={`priorities-list-item-${index}`} value={item}>{item}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>


                    <Button variant="contained" color="primary" style={{minWidth: 150, margin: 8}}
                            className={classes.formControl} onClick={this.loadData}>
                        Загрузить
                    </Button>
                    <Button variant="contained" color="primary" style={{minWidth: 150, margin: 8}}
                            onClick={this.exportToExcel}>
                        Выгрузить в Excel
                    </Button>
                    <FormControlLabel control={<Checkbox checked={this.state.primaryColumnsOnly}
                                                         onChange={() => this.setState({primaryColumnsOnly: !this.state.primaryColumnsOnly})}/>}
                                      label="Только основные столбцы"/>
                    <Button variant="contained" color="primary" style={{minWidth: 150, margin: 8}}
                            onClick={this.exportDefects}>
                        Выгрузить дефекты для рассылки
                    </Button>
                </div>
                <div style={{
                    minWidth: '100%',
                    zIndex: 2,
                    position: 'relative',
                    top: 72,
                }}>
                    {this.props.highPriorityIssuesData.fetching ?
                        <LinearProgress/> : this.props.highPriorityIssuesData.issues.map((item, index) => {
                            return <HighPriorityIssueView issue={item} key={`hpiv-${index}`} style={{minWidth: '100%'}}/>;
                        })}
                    {!this.props.highPriorityIssuesData.fetching && this.props.highPriorityIssuesData.issues.length === 0 ?
                        <div>Нет данных</div> : <div/>}
                </div>
            </div>;
        }
    }
);

function mapStateToProps(state) {
    return {
        appBarState: state.appBarState,
        reportFilters: state.reportFilters,
        highPriorityIssuesData: state.highPriorityIssuesData
    }
}

export default (connect(mapStateToProps, null)(IssuesWithTFSDetailsDisplay));


function HighPriorityIssueView(props) {
    const classes = useStyles();
    const issue = props.issue;
    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    return (<Card className={classes.card}>
        <CardHeader
            title={
                <a href={`https://support.fsight.ru/issue/${issue.id}`}
                   target="_blank" style={{textDecoration: 'none'}}>{issue.id + " " + issue.summary}</a>
            }/>
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
        /*transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),*/
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    formControl: {
        margin: 8,
        minWidth: 150,
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
            <div>
                Issue <a href={`https://tfsprod.fsight.ru/Prognoz/P7/_workitems?_a=edit&id=${tfsIssue.issueId}`}
                         target="_blank"
                         style={{textDecoration: 'none', color: color}}>{tfsIssue.issueId}</a> {tfsIssue.issueState}
            </div>
            <div>{stateSuffix}</div>
            {tfsIssue.defects.map((item, index) => <TFSDefectView key={`hpi-tfs-defect-${index}`} data={item}/>)}
        </div>
    );
}

function TFSDefectView(props) {
    const tfsDefect = props.data;
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
        <div>Defect <a href={`https://tfsprod.fsight.ru/Prognoz/P7/_workitems?_a=edit&id=${tfsDefect.defectId}`}
                       target="_blank"
                       style={{
                           textDecoration: 'none',
                           color: color
                       }}>{tfsDefect.defectId}</a> - {tfsDefect.defectState} - {tfsDefect.defectReason}</div>
        <div>{tfsDefect.defectDeadline}</div>
        <div>{tfsDefect.developmentManager}</div>
        <div>{tfsDefect.iterationPath}</div>
        {tfsDefect.changeRequests.map((item, index) => <TFSChangeRequestsView key={`hpi-tfs-defect-${index}`}
                                                                              data={item} color={color}/>)}
    </div>);

}

function TFSChangeRequestsView(props) {
    const tfsChangeRequest = props.data;
    return (<div style={{marginLeft: 32, marginTop: 8}}>
        <div>Change request <a
            href={`https://tfsprod.fsight.ru/Prognoz/P7/_workitems?_a=edit&id=${tfsChangeRequest.changeRequestId}`}
            target="_blank"
            style={{textDecoration: 'none', color: props.color}}>{tfsChangeRequest.changeRequestId}</a></div>
        <div>{tfsChangeRequest.changeRequestMergedIn}</div>
        <div>{tfsChangeRequest.changeRequestReason}</div>
        <div>{tfsChangeRequest.iterationPath}</div>
    </div>);
}
