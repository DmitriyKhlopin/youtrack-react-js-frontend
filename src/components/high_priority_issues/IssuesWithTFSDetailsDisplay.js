import React, {useState} from "react";
import HighPriorityIssueView from "./HighPriorityIssueView";
import {useDispatch, useSelector} from "react-redux";
import styles from "../../styles/components.module.css"
import {Workbook} from "../../helper_functions/export_to_excel";
import * as XLSX from 'xlsx';
import cx from "classnames";
import {format} from "date-fns";
import button from "devextreme/ui/button";
import {getIssuesWithDetails, selectIssuesWithDetailsData, selectIssuesWithDetailsIsLoading} from "../../redux/combined/issuesWithDetails";


function IssuesWithTFSDetailsDisplay() {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);
    const data = useSelector(selectIssuesWithDetailsData);
    const isLoading = useSelector(selectIssuesWithDetailsIsLoading);
    /*const isLoading = false;*/

    const loadData = () => {
        dispatch(getIssuesWithDetails())
    };
    const exportDefects = () => {
        const wb = new Workbook();
        const d= data.map(e => e.flattenIssue());
        console.log(d);
        let ws = XLSX.utils.json_to_sheet(d.flat());
        XLSX.utils.book_append_sheet(wb, ws, "issues");
        XLSX.writeFile(wb, `Статус запросов.xlsx`);
    }

    return (<div className={styles.column}>
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

            return temp.map(e => {
                console.log(e.createdDate);
                const created = e.createdDate ? format(e.createdDate, 'yyyy-MM-dd hh-mm') : ''
                const updated = e.updatedDate ? format(e.updatedDate, 'yyyy-MM-dd hh-mm') : ''
                return new Object({
                    'ID задачи': this.id,
                    'Проект': this.project,
                    'Заказчик': this.customer,
                    'Заголовок': this.summary,
                    'Время создания': this.created? format(this.created, 'yyyy-MM-dd hh-mm'):'',
                    'Приоритет': this.priority,
                    'Состояние': this.state,
                    'Тип': this.type,
                    'Исполнитель': this.assignee,
                    'Комментарий': this.comment,
                    'Автор комментария': this.commentAuthor,
                    'Bug в DevOps': this.issue,
                    'Feature в DevOps': this.requirement,
                    'Поля Devops': null,
                    'Тип (DevOps)': e.type,
                    'ID задачи (DevOps)': e.systemId,
                    'Состояние (DevOps)': e.state,
                    'Sprint': e.sprint,
                    'Reason (DevOps)': e.reason,
                    'Время создания (DevOps)': created,
                    'Время последнего изменения (DevOps)': updated,
                    'Итерация (DevOps)': e.iteration,
                    'Исполнитель (DevOps)': e.assignee,
                    'Причина закрытия ': e.resolvedReason,
                    'Приоритет (DevOps)': e.priority,
                    'Обнаружено в ': e.foundIn,
                    'Внесено в': e.integratedIn,
                    'Severity': e.severity,
                    'Area': e.area,
                    'Заголовок (DevOps)': e.title,
                    'triage': e.triage,
                    'Author': e.author
                })
            })
        },
        writable: true,
        configurable: true
    }
)

export default IssuesWithTFSDetailsDisplay
