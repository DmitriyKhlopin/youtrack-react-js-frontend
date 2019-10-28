import React, {useEffect, useState} from "react";
import {store} from "../../redux/store";
import connect from "react-redux/es/connect/connect";
import {PAGES} from "../../Const";
import * as XLSX from 'xlsx';
import LinearProgress from "@material-ui/core/LinearProgress";
import {getHighPriorityIssues} from "../../redux/actions/highPriorityIssuesActions";
import * as moment from "moment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {fetchPartnerCustomers} from "../../redux/actions/reportFiltersActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import HighPriorityIssueView from "./HighPriorityIssueView";
import makeStyles from "@material-ui/styles/makeStyles";
import {setSelectedNavItem} from "../../redux/actions/appBarActions";
import {customSort} from "../../HelperFunctions";
import {Workbook} from "../../helper_functions/export_to_excel";

const useStyles = makeStyles(theme => ({
    content: {display: 'flex', padding: 0, margin: 0},
    controlsContainer: {width: '100%', position: 'fixed', display: 'flex', backgroundColor: '#ddd', zIndex: 3},
    issuesContainer: {width: '100%', zIndex: 2, position: 'relative', top: 72},
    multiSelect: {minWidth: 150, maxWidth: 250, margin: 8},
    button: {margin: 8, minWidth: 120},
}));


function IssuesWithTFSDetailsDisplay({location, filters, data}) {
    const styles = useStyles();
    const [priorities, setPriorities] = useState(['Major', 'Normal', 'Minor']);
    const defaultPriorities = ['Major', 'Normal', 'Minor'];
    const [states, setStates] = useState(['Активные']);
    const defaultStates = ['Активные', 'Завершенные'];
    const [projects, setProjects] = useState([]);
    const [customers, setCustomers] = useState([]);
    /*const [allProjects, setAllProjects] = useState(false);
    const [allCustomers, setAllCustomers] = useState(false);
    const [allPriorities, setAllPriorities] = useState(false);*/
    const [primaryColumns, setPrimaryColumns] = useState(true);
    const [labelWidth1, setLabelWidth1] = useState(0);
    const [labelWidth2, setLabelWidth2] = useState(0);
    const [labelWidth3, setLabelWidth3] = useState(0);
    const [labelWidth4, setLabelWidth4] = useState(0);
    const inputLabel1 = React.useRef(null);
    const inputLabel2 = React.useRef(null);
    const inputLabel3 = React.useRef(null);
    const inputLabel4 = React.useRef(null);

    useEffect(() => {
        store.dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === location.pathname)[0]));
        store.dispatch(fetchPartnerCustomers());
        setLabelWidth1(inputLabel1.current.offsetWidth);
        setLabelWidth2(inputLabel2.current.offsetWidth);
        setLabelWidth3(inputLabel3.current.offsetWidth);
        setLabelWidth4(inputLabel4.current.offsetWidth);
    }, []);

    const handleChange = event => {
        if (event.target.value.includes('SelectAll')) {
            switch (event.target.name) {
                case 'Projects':
                    setProjects([...new Set(filters.partnerCustomers.map((item) => item.project))]);
                    break;
                case 'Customers':
                    setCustomers([...new Set(filters.partnerCustomers
                        .filter((item) => projects.includes(item.project) && item.customer !== null)
                        .map((item) => item.customer))]);
                    break;
                case 'Priorities':
                    setPriorities(defaultPriorities);
                    break;
                default:
                    break
            }
        } else {
            switch (event.target.name) {
                case 'Projects': {
                    setProjects(event.target.value.filter((item) => item !== ''));
                    break;
                }
                case 'Customers': {
                    setCustomers(event.target.value.filter((item) => item !== ''));
                    break;
                }
                case 'Priorities': {
                    setPriorities(event.target.value.filter((item) => item !== ''));
                    break;
                }
                case 'States': {
                    setStates(event.target.value.filter((item) => item !== ''));
                    break;
                }
                default:
                    console.log(event.target.name);
            }
        }
    };

    const loadData = () => store.dispatch(getHighPriorityIssues(projects, customers, priorities, states));

    const applyTranslations = (item) => {
        switch (item) {
            case 'Submitted': {
                return 'Зарегистрирована';
            }
            case 'Open': {
                return 'Открыта';
            }
            case 'Bug': {
                return 'Ошибка';
            }
            case 'Major': {
                return 'Высокий';
            }
            case 'Normal': {
                return 'Обычный';
            }
            case 'Minor': {
                return 'Низкий';
            }
            default : {
                return item;
            }
        }
    };

    const exportedProjects = (array) => [...new Set(array.map((item) => item.id.substring(0, item.id.indexOf('-'))))];

    const exportDefects = () => {
        const issues = data.issues.flatMap((item, index) => {
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
        const l = exportedProjects(data.issues);
        const wb = new Workbook();
        let ws = XLSX.utils.json_to_sheet(issues);
        XLSX.utils.book_append_sheet(wb, ws, "issues");
        XLSX.writeFile(wb, `Статус запросов ${l.length === 1 ? `по проекту ${l[0]}` : `по ${l.length} проектам`}.xlsx`);
    };

    const exportToExcel = () => {
        const issues = data.issues.map((item, index) => {
            return primaryColumns ? {
                '': index + 1,
                'ID задачи': item.id,
                'Заголовок': item.summary,
                'Состояние': applyTranslations(item.state),
                'Приоритет': applyTranslations(item.priority),
                'Тип': applyTranslations(item.type),
                'Исполнитель': item.assignee,
                'Комментарий': item.comment,
                'Автор комментария': item.commentAuthor,
            } : {
                '': index + 1,
                'ID задачи': item.id,
                'Проект': item.project,
                'Заказчик': item.customer,
                'Заголовок': item.summary,
                'Создана': moment.unix(item.created / 1000).format("MM/DD/YYYY"),
                'Состояние': applyTranslations(item.state),
                'Приоритет': applyTranslations(item.priority),
                'Тип': applyTranslations(item.type),
                'Исполнитель': item.assignee,
                'Комментарий': item.comment,
                'Автор комментария': item.commentAuthor,
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
        const l = exportedProjects(data.issues);
        const wb = new Workbook();
        let ws = XLSX.utils.json_to_sheet(issues);
        XLSX.utils.book_append_sheet(wb, ws, "issues");
        XLSX.writeFile(wb, `Статус запросов ${l.length === 1 ? `по проекту ${l[0]}` : `по ${l.length} проектам`}.xlsx`);
    };

    return (<div className={styles.content}>
        <div className={styles.controlsContainer}>
            <FormControl variant="outlined" className={styles.multiSelect} component='div'>
                <InputLabel ref={inputLabel1} htmlFor="outlined-projects-simple">
                    Проекты
                </InputLabel>
                <Select value={projects} onChange={handleChange} multiple={true}
                        renderValue={selected => selected.join(", ")}
                        input={
                            <OutlinedInput labelWidth={labelWidth1} name="Projects" id="outlined-projects-simple"/>
                        }>
                    {<MenuItem value="SelectAll"> <em>Выбрать все</em> </MenuItem>}
                    {[...new Set(filters.partnerCustomers.map((item) => item.project))]
                        .sort(customSort)
                        .map((item, index) => (
                            <MenuItem key={`projects-list-item-${index}`} value={item}>
                                <Checkbox checked={projects.indexOf(item) > -1}/>
                                {item}
                            </MenuItem>
                        ))}

                </Select>
            </FormControl>
            <FormControl variant="outlined" className={styles.multiSelect}>
                <InputLabel ref={inputLabel2} htmlFor="outlined-customers-simple">
                    Заказчики
                </InputLabel>
                <Select value={customers} onChange={handleChange} multiple={true}
                        renderValue={selected => selected.join(", ")}
                        input={
                            <OutlinedInput labelWidth={labelWidth2} name="Customers" id="outlined-customers-simple"/>
                        }>
                    {<MenuItem value="SelectAll"> <em>Выбрать все</em> </MenuItem>}
                    {[...new Set(filters.partnerCustomers
                        .filter((item) => projects.includes(item.project) && item.customer !== null)
                        .map((item) => item.customer))]
                        .sort(customSort)
                        .map((item, index) =>
                            (<MenuItem key={`customers-list-item-${index}`} value={item}>
                                <Checkbox checked={customers.indexOf(item) > -1}/>
                                {item}
                            </MenuItem>))}

                </Select>
            </FormControl>
            <FormControl variant="outlined" className={styles.multiSelect}>
                <InputLabel ref={inputLabel3} htmlFor="outlined-priorities-simple">
                    Приоритеты
                </InputLabel>
                <Select value={priorities} onChange={handleChange} multiple={true}
                        input={
                            <OutlinedInput
                                labelWidth={labelWidth3}
                                name="Priorities"
                                id="outlined-priorities-simple"
                            />
                        }>
                    {<MenuItem value="SelectAll"> <em>Выбрать все</em> </MenuItem>}
                    {defaultPriorities.map((item, index) => (
                        <MenuItem key={`priorities-list-item-${index}`} value={item}>{item}</MenuItem>
                    ))}

                </Select>
            </FormControl>
            <FormControl variant="outlined" className={styles.multiSelect}>
                <InputLabel ref={inputLabel4} htmlFor="outlined-states-simple">
                    Состояния
                </InputLabel>
                <Select value={states} onChange={handleChange} multiple={true}
                        input={
                            <OutlinedInput
                                labelWidth={labelWidth4}
                                name="States"
                                id="outlined-states-simple"
                            />
                        }>
                    {defaultStates.map((item, index) => (
                        <MenuItem key={`priorities-list-item-${index}`} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" className={styles.button} onClick={loadData}>
                Загрузить
            </Button>
            <Button variant="contained" color="primary" className={styles.button} onClick={exportToExcel}
                    disabled={data.issues.length === 0}>
                Выгрузить в Excel
            </Button>
            <FormControlLabel
                control={
                    <Checkbox checked={primaryColumns} onChange={() => setPrimaryColumns(!primaryColumns)}
                              disabled={data.issues.length === 0}/>
                }
                label="Только основные столбцы"/>
            <Button variant="contained" color="primary" className={styles.button} onClick={exportDefects}
                    disabled={data.issues.length === 0}>
                Выгрузить дефекты для рассылки
            </Button>
        </div>
        <div className={styles.issuesContainer}>
            {data.fetching ? <LinearProgress/> : data.issues.map((item, index) => {
                return <HighPriorityIssueView issue={item} key={`hpiv-${index}`} style={{minWidth: '100%'}}/>;
            })}
            {!data.fetching && data.issues.length === 0 ? <div>Нет данных</div> : <div/>}
        </div>
    </div>);
}

function mapStateToProps(state) {
    return {
        filters: state.reportFilters,
        data: state.highPriorityIssuesData,
    }
}

export default (connect(mapStateToProps, null)(IssuesWithTFSDetailsDisplay))
