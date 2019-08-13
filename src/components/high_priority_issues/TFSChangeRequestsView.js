import React from "react";

export default function TFSChangeRequestsView(props) {
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
