import React, {Component} from "react";
import store from "../../redux/store";
import {setSelectedNavItem} from "../../redux/actions/appBarActions";
import withStyles from "@material-ui/core/styles/withStyles";
import connect from "react-redux/es/connect/connect";
import {fetchTimeAccountingData} from "../../redux/actions/timeAccountingActions";
import {PAGES, Workbook} from "../../Const";
import * as XLSX from 'xlsx';

import LinearProgress from "@material-ui/core/LinearProgress";
import {getHighPriorityIssues} from "../../redux/actions/highPriorityIssuesActions";
import * as moment from "moment";
import {createStyles} from "@material-ui/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {fetchPartnerCustomers} from "../../redux/actions/reportFiltersActions";
import * as ReactDOM from "react-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import HighPriorityIssueView from "./HighPriorityIssueView";

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
                window.alert('Not implemented');
                /*let t;
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
                });*/
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

        customSort = function (a, b) {
            if (a > b) {
                return 1;
            } else {
                return -1;
            }
        };

        render() {
            const {classes} = this.props;
            console.log(this.state.projects);
            console.log(this.state.customers);
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
                            renderValue={selected => selected.join(", ")}
                            input={
                                <OutlinedInput
                                    labelWidth={this.state.labelWidth1}
                                    name="Projects"
                                    id="outlined-projects-simple"
                                />
                            }
                        >
                            {<MenuItem value="SelectAll"> <em>Выбрать все</em> </MenuItem>}
                            {[...new Set(this.props.reportFilters.partnerCustomers.map((item) => item.project))]
                                .sort(this.customSort)
                                .map((item, index) => (
                                    <MenuItem key={`projects-list-item-${index}`} value={item}>
                                        <Checkbox checked={this.state.projects.indexOf(item) > -1}/>
                                        {item}
                                    </MenuItem>
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
                            renderValue={selected => selected.join(", ")}
                            input={
                                <OutlinedInput
                                    labelWidth={this.state.labelWidth2}
                                    name="Customers"
                                    id="outlined-customers-simple"
                                />
                            }
                        >
                            {<MenuItem value="SelectAll"> <em>Выбрать все</em> </MenuItem>}
                            {[...new Set(this.props.reportFilters.partnerCustomers
                                .filter((item) => this.state.projects.includes(item.project) && item.customer !== null)
                                .map((item) => item.customer))]
                                .sort(this.customSort)
                                .map((item, index) =>
                                    (<MenuItem key={`customers-list-item-${index}`} value={item}>
                                        <Checkbox checked={this.state.customers.indexOf(item) > -1}/>
                                        {item}
                                    </MenuItem>))}

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
        reportFilters: state.reportFilters,
        highPriorityIssuesData: state.highPriorityIssuesData
    }
}

export default (connect(mapStateToProps, null)(IssuesWithTFSDetailsDisplay));






