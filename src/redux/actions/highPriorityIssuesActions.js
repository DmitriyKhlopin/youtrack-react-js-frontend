import {ENDPOINT} from "../../Const";

export function getHighPriorityIssues(projects) {
    return function (dispatch) {
        dispatch({type: 'FETCH_HIGH_PRIORITY_ISSUES_PENDING'});
        const p = projects.map(item => item.shortName).join(',');
        console.log(p);
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        const url = `${ENDPOINT}/api/issues/high_priority?projects=${p}`;
        console.log(url);
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: 'FETCH_HIGH_PRIORITY_ISSUES_FULFILLED',
                    payload: json
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: 'FETCH_HIGH_PRIORITY_ISSUES_REJECTED',
                    payload: err
                });
            });
    }
}
