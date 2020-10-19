import React, {useEffect, useState} from "react";
import {PRIORITIES_DICTIONARY, STATES_DICTIONARY} from "../../Const";
import {getIssuesWithDetails} from "../../redux/actions/highPriorityIssuesActions";
import HighPriorityIssueView from "./HighPriorityIssueView";
import {customSort} from "../../HelperFunctions";
import {useDispatch, useSelector} from "react-redux";
import {selectPartnerCustomersDictionary} from "../../redux/selectors/reportFiltersSelectors";
import {selectIsIssueDetailsLoading, selectIssueDetails, selectTags} from "../../redux/selectors/issueDetailsSelector";
import Select from "react-select";
import styles from "../../styles/components.module.css"
import {Workbook} from "../../helper_functions/export_to_excel";
import * as XLSX from 'xlsx';
import cx from "classnames";
import {format} from "date-fns";
import button from "devextreme/ui/button";
import {fetchPartnerCustomers, fetchProjects, fetchTags, selectProjects} from "../../redux/combined/dictionaries";

const customStyles = {
    container: base => ({
        ...base,
        display: 'table',
        width: '240px',
        margin: '0.5rem',
        scrollbarColor: 'gray lightgray',
    }),
};

function IssuesWithTFSDetailsDisplay() {
    const dispatch = useDispatch();
    const [priorities, setPriorities] = useState([PRIORITIES_DICTIONARY[0]]);
    const [states, setStates] = useState([]);
    const [projects, setProjects] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [primaryColumns, setPrimaryColumns] = useState(true);
    const [tags, setTags] = useState([]);
    const [allTags, setAllTags] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const projectsDictionary = useSelector(selectProjects);

    useEffect(() => {
        dispatch(fetchPartnerCustomers());
        if (projectsDictionary.length === 0) dispatch(fetchProjects());
        dispatch(fetchTags());
    }, []);

    const partnerCustomers = useSelector(selectPartnerCustomersDictionary);
    const data = useSelector(selectIssueDetails);
    const tagOptions = useSelector(selectTags);
    const isLoading = useSelector(selectIsIssueDetailsLoading);

    const loadData = () => dispatch(getIssuesWithDetails(projects, customers, priorities, states, tags, allTags));
    const clearFilters = () => {
        setProjects([]);
        setCustomers([]);
        setPriorities([]);
        setStates([]);
    };
    const selectUnresolvedStates = () => setStates(STATES_DICTIONARY.filter(e => !e.resolved))
    const selectResolvedStates = () => setStates(STATES_DICTIONARY.filter(e => e.resolved))

    const exportDefects = () => {
        const wb = new Workbook();
        let ws = XLSX.utils.json_to_sheet(data.map(e => e.flattenIssue()).flat());
        XLSX.utils.book_append_sheet(wb, ws, "issues");
        XLSX.writeFile(wb, `Статус запросов.xlsx`);
    }

    const handleProjectsChange = (selectedOption) => {
        console.log(selectedOption)
        if (selectedOption === null || selectedOption.length === 0) {
            setProjects([]);
            setCustomers([]);
        } else {
            setProjects(selectedOption);
            setCustomers([...new Set(partnerCustomers
                .filter((item) => selectedOption.map(e => e.value).includes(item.project) && item.customer !== null && customers.map(e => e.value).includes(item.customer))
                .map((item) => item.customer))]
                .sort(customSort).map(e => new Object({value: e, label: e, color: '#00B8D9'})))
        }
    }

    return (<div className={styles.column}>
        <div className={cx(styles.row, styles.wrap)}>
            <Select
                styles={customStyles}
                isMulti
                options={projectsDictionary
                }
                placeholder="Проекты"
                value={projects}
                onChange={handleProjectsChange}
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
                    .sort(customSort).map(e => new Object({value: e, label: e, color: '#00B8D9'}))
                }
                placeholder="Заказчики"
                value={customers}
                onChange={(selectedOption) => setCustomers(selectedOption === null ? [] : selectedOption)}
                closeMenuOnSelect={false}
            />
            <Select
                styles={customStyles}
                isMulti
                options={PRIORITIES_DICTIONARY}
                placeholder="Приоритеты"
                value={priorities}
                onChange={(selectedOption) => setPriorities(selectedOption === null ? [] : selectedOption)}
            />
            <Select
                styles={customStyles}
                isMulti
                options={STATES_DICTIONARY}
                placeholder="Состояния"
                value={states}
                onChange={(selectedOption) => setStates(selectedOption === null ? [] : selectedOption)}
                closeMenuOnSelect={false}
            />
            <Select
                styles={customStyles}
                isMulti
                options={tagOptions}
                placeholder="Тэги"
                value={tags}
                onChange={(selectedOption) => setTags(selectedOption === null ? [] : selectedOption)}
                closeMenuOnSelect={false}
            />
            {tags.length > 1 ? <button className={cx(styles.statefulButton, allTags ? styles.on : styles.off)} onClick={() => setAllTags(!allTags)} disabled={tags.length <= 1}>
                {allTags ? 'Только задачи со всеми тегами' : 'Задачи с любым из тегов'}
            </button> : null}
        </div>
        <div className={cx(styles.row)}>
            <button className={cx(styles.textButton/*, {[styles.buttonDisabled]: true}*/)} onClick={selectUnresolvedStates}>Выбрать незавершённые</button>
            <button className={styles.textButton} onClick={selectResolvedStates}>Выбрать завершённые</button>
            <button className={styles.textButton} onClick={clearFilters}>Очистить фильтры</button>
        </div>
        <div className={cx(styles.row)}>
            <button className={styles.textButton} onClick={loadData}>Загрузить данные</button>
            {data.length > 0
                ? <>
                    <button className={styles.textButton} onClick={exportDefects}>Выгрузить всё</button>
                    <button className={styles.textButton} onClick={exportDefects}>Выгрузить дефекты</button>
                    <button className={styles.textButton} onClick={exportDefects}>Выгрузить фичи</button>
                    <button className={styles.textButton} onClick={() => setExpanded(!expanded)}>{expanded ? 'Свернуть все баги' : 'Развернуть все баги'}</button>
                </>
                : null}

        </div>
        {isLoading
            ? <div className={styles.linearProgress}/>
            : <div className={cx(styles.column, styles.defaultMargin)}>
                {data.length === 0
                    ? <div>Нет данных</div>
                    : data.map((item, index) => <HighPriorityIssueView issue={item} key={`hpiv-${index}`} style={{minWidth: '100%'}} expanded={expanded}/>)}
            </div>}
    </div>);
}


Object.defineProperty(
    Object.prototype, "flattenIssue", {
        value: function flattenIssue() {
            let temp = this.devOpsBugs.concat(this.devOpsRequirements);
            if (temp.length === 0) {
                temp = [new Object({})]
            }
            return temp.map(e => new Object({
                'ID задачи': this.id,
                'Проект': this.project,
                'Заказчик': this.customer,
                'Заголовок': this.summary,
                'Время создания': format(this.created, 'yyyy-MM-dd hh-mm'),
                'Приоритет': this.priority,
                'Состояние': this.state,
                'Тип': this.type,
                'Исполнитель': this.assignee,
                'Комментарий': this.comment,
                'Автор комментария': this.commentAuthor,
                /*'Bug в DevOps': this.issue,
                'Feature в DevOps': this.requirement,*/
                'Поля Devops': null,
                'Тип (DevOps)': e.type,
                'ID задачи (DevOps)': e.id,
                'Состояние (DevOps)': e.state,
                'Reason (DevOps)': e.state,
                'Время последнего изменения (DevOps)': e.lastUpdate,
                'Итерация (DevOps)': e.iteration,
                'Исполнитель (DevOps)': e.responsible,
                'Причина закрытия ': e.resolvedReason,
                'Приоритет (DevOps)': e.priority,
                'Обнаружено в ': e.foundIn,
                'Внесено в': e.integratedIn,
                'Severity': e.severity,
                'Area': e.area,
                'Заголовок (DevOps)': e.title,
                'triage (DevOps)': e.triage,
            }))
        },
        writable: true,
        configurable: true
    }
)

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
