import React, {useState} from "react";
import styles from "../../styles/components.module.css";
import cx from "classnames";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBug, faPlus} from "@fortawesome/free-solid-svg-icons";

export default function HighPriorityIssueView({issue, expanded}) {
    const [expand, setExpand] = useState(false);
    const bugColor = issue.devOpsBugs.length === issue.devOpsBugs.filter(e => ['Closed', 'Resolved'].includes(e.state)).length ? styles.iconGood : styles.iconBad
    /*console.log({id: issue.id, bugColor, l1: issue.devOpsBugs.length, l2: issue.devOpsBugs.filter(e => ['Closed', 'Resolved'].includes(e.state)).length})*/

    return (
            <div className={cx(styles.column, styles.card, styles.defaultMargin)}>
                <div className={cx(styles.row, styles.spread)}>
                    <div className={styles.column}>
                        <div className={cx(styles.row, styles.defaultMargin, styles.defaultPadding, styles.spread, styles.title)}>
                            <a href={`https://support.fsight.ru/issue/${issue.id}`} target="_blank" style={{textDecoration: 'none', overflowWrap: 'break-word'}}>{issue.id + " " + issue.summary}</a>
                        </div>
                        <div className={cx(styles.row, styles.defaultMargin, styles.defaultPadding)}>
                            <span className={styles.textSecondary} style={{marginRight: '1rem'}}>{issue.priority}</span>
                            <span className={styles.textSecondary} style={{marginRight: '1rem'}}>{issue.type}</span>
                            <span className={styles.textSecondary} style={{marginRight: '1rem'}}>{issue.state}</span>
                        </div>
                    </div>
                    <div className={styles.expand}/>
                    {issue.devOpsBugs.length > 0
                        ? <div className={cx(styles.stack, styles.defaultPadding, styles.defaultMargin, bugColor)} onClick={() => setExpand(!expand)}>
                            <FontAwesomeIcon icon={faBug} size={'2x'} className={cx(styles.mediumMargin, styles.mediumPadding)}/>
                            <div className={styles.textPrimary} style={{position: 'absolute', right: 0, top: 0,}}>{issue.devOpsBugs.length}</div>
                        </div>
                        : null}

                    {issue.devOpsRequirements.length > 0
                        ? <div className={cx(styles.stack, styles.defaultPadding, styles.defaultMargin)} style={{color: '#1976D2'}}>
                            <FontAwesomeIcon icon={faPlus} size={'2x'} className={cx(styles.mediumMargin, styles.mediumPadding)}/>
                            <div className={styles.textPrimary} style={{position: 'absolute', right: 0, top: 0,}}>{issue.devOpsRequirements.length}</div>
                        </div>
                        : null}
                </div>
                <div className={cx(styles.row, styles.defaultMargin, styles.defaultPadding)}>
                    <span className={styles.textSecondary} style={{marginRight: '1rem'}}>{Number(issue.timeUser / 3600).toFixed(2)}</span>
                    <span className={styles.textSecondary} style={{marginRight: '1rem'}}>{Number(issue.timeAgent / 3600).toFixed(2)}</span>
                    <span className={styles.textSecondary} style={{marginRight: '1rem'}}>{Number(issue.timeDeveloper / 3600).toFixed(2)}</span>
                </div>
                {expanded || expand
                    ? <div className={styles.column}>
                        {issue.devOpsBugs.map((e, index) => <DevOpsBug key={`${index}-issues-${issue.id}-bug-${e.id}`} bug={e}/>)}
                    </div>
                    : null
                }
            </div>
    )
}

function DevOpsBug({bug}) {
    return (
            <div className={cx(styles.card, styles.column, styles.defaultMargin, styles.defaultPadding)}>
                {/*{JSON.stringify(bug)}*/}
                <a href={`https://tfsprod.fsight.ru/Foresight/AP/_workitems/edit/${bug.id}`} target="_blank" className={styles.title}>{`${bug.type} ${bug.id}`}</a>
                <div className={cx(styles.row, styles.spread)}>
                    <span>Приоритет: {bug.priority}</span>
                    <span>Severity: {bug.severity}</span>
                    <span>State: {bug.state}</span>
                    <span>Reason: {bug.reason}</span>
                    <span>Resolved reason{bug.resolvedReason}</span>
                    <span>Last update{bug.lastUpdate}</span>
                </div>
                <div className={cx(styles.row)}>
                    <span>Итерация: {bug.iteration}</span>
                    <span>Исполнитель: {bug.responsible}</span>
                </div>
                <div className={cx(styles.row, styles.spread)}>
                    <span>Found in: {bug.foundIn}</span>
                    <span>Integrated in: {bug.integratedIn}</span>
                </div>
            </div>
    )
}