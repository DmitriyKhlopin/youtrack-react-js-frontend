import {ENDPOINT} from "../../Const";

export function getPossibleErrors() {
    return function (dispatch) {
        dispatch({type: 'FETCH_POSSIBLE_ERRORS_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const url = `${ENDPOINT}/api/active_issues_test`;
        console.log(url);
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                    /*const res = json.reduce((h, a) => Object.assign(h, { [a.ytIssueId]:( h[a.ytIssueId] || [] ).concat(a) }), {});*/
                    /*console.log(res);*/
                    dispatch({
                        type: 'FETCH_POSSIBLE_ERRORS_FULFILLED',
                        payload: json
                    })
                }
            )
            .catch(err => {
                console.log(err);
                dispatch({
                    type: 'FETCH_POSSIBLE_ERRORS_FAILED',
                    payload: err
                });
            });
    }
}