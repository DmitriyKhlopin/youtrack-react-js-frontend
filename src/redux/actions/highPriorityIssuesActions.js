import {ENDPOINT} from "../../Const";

export function getHighPriorityIssues() {
    return function (dispatch) {
        dispatch({type: 'FETCH_HIGH_PRIORITY_ISSUES_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        const url = `${ENDPOINT}/api/issues/high_priority`;
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
