import React from "react";
import TFSChangeRequestsView from "./TFSChangeRequestsView";

export default function TFSDefectView(props) {
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
