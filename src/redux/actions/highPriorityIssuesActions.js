import {ENDPOINT} from "../../Const";

export function getIssuesWithDetails(projects, customers, priorities, states) {
    return function (dispatch) {
        dispatch({type: 'FETCH_HIGH_PRIORITY_ISSUES_PENDING'});
        console.log(projects.map(e => e.value));
        console.log(customers.map(e => e.value));
        console.log(priorities.map(e => e.value));
        const obj = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "priorities": priorities.map(e => e.value),
                "tags": [
                    "критично"
                ],
                "states": [
                    "Направлена разработчику"
                ],
                "detailedStates": [
                    "Backlog 2ЛП"
                ],
                "projects": projects.map(e => e.value),
                "customers": customers.map(e => e.value)
            })
        };

        const url = `${ENDPOINT}/api/issues/detailed`;
        fetch(encodeURI(url), obj)
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


export function getDictionaries() {
    return function (dispatch) {
        dispatch({type: 'FETCH_DETAILED_ISSUES_DICTIONARIES_PENDING'});
        const obj = {
            method: 'GET',
            headers: {'Accept': 'application/json'},
        };
        const url = `${ENDPOINT}/api/issues/detailed`;
        fetch(encodeURI(url), obj)
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