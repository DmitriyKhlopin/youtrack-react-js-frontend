import * as moment from "moment";
import React from "react";
import TFSDefectView from "./TFSDefectView";

export default function TFSIssueView(props) {
    const tfsIssue = props.data;
    const now = moment();
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
                Issue <a href={`https://tfsprod.fsight.ru/Foresight/AP/_workitems/edit/${tfsIssue.issueId}`}
                         target="_blank"
                         style={{textDecoration: 'none', color: color}}>{tfsIssue.issueId}</a> {tfsIssue.issueState}
            </div>
            <div>{stateSuffix}</div>
            {tfsIssue.defects.map((item, index) => <TFSDefectView key={`hpi-tfs-defect-${index}`} data={item}/>)}
        </div>
    );
}
