import React, {useEffect, useState} from "react";
import {PAGES} from "../../Const";
import {getIssuesWithDetails} from "../../redux/actions/highPriorityIssuesActions";
import {fetchPartnerCustomers} from "../../redux/actions/reportFiltersActions";
import HighPriorityIssueView from "./HighPriorityIssueView";
import {setSelectedNavItem} from "../../redux/actions/appBarActions";
import {customSort} from "../../HelperFunctions";
import {useDispatch, useSelector} from "react-redux";
import {selectPartnerCustomersDictionary} from "../../redux/selectors/reportFiltersSelectors";
import {selectIssueDetails} from "../../redux/selectors/issueDetailsSelector";
import Select, {components} from "react-select";
import styles from "../../styles/components.module.css"

/*
const useStyles = makeStyles(theme => ({
    content: {display: 'flex', padding: 0, margin: 0},
    controlsContainer: {width: '100%', position: 'fixed', display: 'flex', backgroundColor: '#ddd', zIndex: 3},
    issuesContainer: {width: '100%', zIndex: 2, position: 'relative', top: 72},
    multiSelect: {minWidth: 150, maxWidth: 250, margin: 8},
    button: {margin: 8, minWidth: 120},
}));
*/

const PRIORITIES_DICTIONARY = [
    {value: 'Major', label: 'Высокий', color: '#00B8D9'},
    {value: 'Normal', label: 'Обычный', color: '#00B8D9'},
    {value: 'Minor', label: 'Низкий', color: '#00B8D9'}
]


function IssuesWithTFSDetailsDisplay({location}) {
    const dispatch = useDispatch();
    const [priorities, setPriorities] = useState([PRIORITIES_DICTIONARY[0]]);
    const [states, setStates] = useState(['Активные']);
    const [projects, setProjects] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [primaryColumns, setPrimaryColumns] = useState(true);
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        dispatch(setSelectedNavItem(PAGES.filter((page) => page.path === location.pathname)[0]));
        dispatch(fetchPartnerCustomers());
    }, []);

    const partnerCustomers = useSelector(selectPartnerCustomersDictionary);
    const data = useSelector(selectIssueDetails);

    const loadData = () => dispatch(getIssuesWithDetails(projects, customers, priorities, states));
    const exportDefects = () => window.alert("Not implemented");
    const exportToExcel = () => window.alert("Not implemented");
    const clearFilters = () => {
        setProjects([]);
        setCustomers([]);
        setPriorities([]);
        setStates([]);
    };


    const customStyles = {
        container: base => ({
            ...base,
            display: 'inline-block',
            width: '400px',
            margin: '8px',
        }),
    };

    return (<div className={styles.column}>
        <div className={styles.row}>
            <Select
                styles={customStyles}
                isMulti
                options={[...new Set(partnerCustomers.map((item) => item.project))]
                    .sort(customSort).map(e => {
                        return {value: e, label: e, color: '#00B8D9'}
                    })
                }
                placeholder="Проекты"
                value={projects}
                onChange={(selectedOption) => setProjects(selectedOption)}
                closeMenuOnSelect={false}
                /*components={{ ValueContainer }}*/
                isSearchable={true}
            />

            <Select
                styles={customStyles}
                isMulti
                options={[...new Set(partnerCustomers
                    .filter((item) => projects.map(e => e.value).includes(item.project) && item.customer !== null)
                    .map((item) => item.customer))]
                    .sort(customSort).map(e => {
                        return {value: e, label: e, color: '#00B8D9'}
                    })
                }
                placeholder="Заказчики"
                value={customers}
                onChange={(selectedOption) => setCustomers(selectedOption)}
                closeMenuOnSelect={false}
            />
            <Select
                styles={customStyles}
                isMulti
                options={PRIORITIES_DICTIONARY}
                placeholder="Приоритеты"
                value={priorities}
                onChange={(selectedOption) => setPriorities(selectedOption)}
            />
            {/*<FormControl variant="outlined" className={styles.multiSelect} component='div'>
                <InputLabel ref={inputLabel1} htmlFor="outlined-projects-simple">
                    Проекты
                </InputLabel>
                <Select value={projects} onChange={handleChange} multiple={true}
                        renderValue={selected => selected.join(", ")}
                        input={
                            <OutlinedInput labelWidth={labelWidth1} name="Projects" id="outlined-projects-simple"/>
                        }>
                    {<MenuItem value="SelectAll"> <em>Выбрать все</em> </MenuItem>}
                    {[...new Set(partnerCustomers.map((item) => item.project))]
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
                    {[...new Set(partnerCustomers
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
                    disabled={data.length === 0}>
                Выгрузить в Excel
            </Button>
            <FormControlLabel
                control={
                    <Checkbox checked={primaryColumns} onChange={() => setPrimaryColumns(!primaryColumns)}
                              disabled={data.length === 0}/>
                }
                label="Только основные столбцы"/>
            <Button variant="contained" color="primary" className={styles.button} onClick={exportDefects}
                    disabled={data.length === 0}>
                Выгрузить дефекты для рассылки
            </Button>
            <Button variant="contained" color="primary" className={styles.button} onClick={exportToExcel}
                    disabled={data.length === 0}>
                Сбросить фильтры
            </Button>*/}
        </div>
        <div className={styles.row}>
            <button onClick={loadData}>Загрузить данные</button>
            <button onClick={() => setExpanded(!expanded)}>{expanded ? 'Свернуть все баги' : 'Развернуть все баги'}</button>
            <button onClick={clearFilters}>Очистить фильтры</button>
        </div>
        <div className={styles.column}>
            {data.map((item, index) => <HighPriorityIssueView issue={item} key={`hpiv-${index}`} style={{minWidth: '100%'}} expanded={expanded}/>)}
            {data.length === 0 ? <div>Нет данных</div> : null}
        </div>
    </div>);
}


export default IssuesWithTFSDetailsDisplay



/*
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
* */
