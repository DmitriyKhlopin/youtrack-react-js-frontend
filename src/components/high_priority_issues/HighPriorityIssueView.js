import React, {useState} from "react";
import styles from "../../styles/components.module.css";
import cx from "classnames";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBug} from "@fortawesome/free-solid-svg-icons";

export default function HighPriorityIssueView({issue, expanded}) {
    const [expand, setExpand] = useState(false);
    return (
        <div className={cx(styles.column, styles.card, styles.defaultMargin, styles.defaultPadding)}>
            <div className={cx(styles.row, styles.spread)}>
                <div className={styles.column}>
                    <div className={cx(styles.row, styles.defaultMargin, styles.defaultPadding, styles.spread)}>
                        <a href={`https://support.fsight.ru/issue/${issue.id}`} target="_blank" style={{textDecoration: 'none'}}>{issue.id + " " + issue.summary}</a>
                    </div>
                    <div className={cx(styles.row, styles.defaultMargin, styles.defaultPadding)}>
                        <span className={styles.textSecondary} style={{marginRight: '1rem'}}>{issue.priority}</span>
                        <span className={styles.textSecondary} style={{marginRight: '1rem'}}>{issue.type}</span>
                        <span className={styles.textSecondary} style={{marginRight: '1rem'}}>{issue.state}</span>
                    </div>
                </div>
                <div className={cx(styles.column)}>
                    <div className={cx(styles.row, styles.centered)} onClick={() => setExpand(!expand)}>
                        <span style={{margin: '0.5rem', color: 'red'}}>{issue.devOpsBugs.length}</span>
                        <FontAwesomeIcon icon={faBug} size={'2x'} style={{margin: '1rem', color: 'red'}}/>
                    </div>
                </div>
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
        <div className={cx(styles.column, styles.card, styles.defaultMargin, styles.defaultPadding)}>
            {JSON.stringify(bug)}
            <div className={cx(styles.row, styles.spread)}>
                <a href={`https://tfsprod.fsight.ru/Foresight/AP/_workitems/edit/${bug.id}`} target="_blank" className={styles.notDecorated}>{bug.id}</a>
                <span>{bug.priority}</span>
                <span>{bug.severity}</span>
                <span>{bug.state}</span>
                <span>{bug.reason}</span>
                <span>{bug.lastUpdate}</span>
            </div>
            <div className={cx(styles.row, styles.spread)}>
                <span>{bug.iteration}</span>
                <span>{bug.responsible}</span>
            </div>
            <div className={cx(styles.row, styles.spread)}>
                <span>{bug.foundIn}</span>
                <span>{bug.integratedIn}</span>
            </div>
        </div>
    )
}