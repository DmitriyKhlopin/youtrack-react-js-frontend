import {ENDPOINT} from "../../Const";

export function getHighPriorityIssues(projects, customers, priorities, states) {
    return function (dispatch) {
        dispatch({type: 'FETCH_HIGH_PRIORITY_ISSUES_PENDING'});
        const projectsString = projects.map(item => item.shortName).join(',');
        const customersString = customers.map(item => item.customer).join(',');
        const prioritiesString = priorities.join(',');
        const statesString = states.join(',');
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const url = `${ENDPOINT}/api/issues/high_priority?projects=${projectsString}&customers=${customersString}&priorities=${prioritiesString}&states=${statesString}`;
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
