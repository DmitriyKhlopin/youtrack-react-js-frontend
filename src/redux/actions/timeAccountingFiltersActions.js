import {ENDPOINT, innerProjects} from "../../Const";

export function feetchEmpoyees() {
    return function (dispatch) {
        dispatch({type: "FETCH_TIME_ACCOUNTING_EMPLOYEES"});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        const url = `${ENDPOINT}/api/project`;
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: "FETCH_TIME_ACCOUNTING_EMPLOYEES_FULFILLED",
                    payload: {
                        proj: json,
                        projDefault: json.filter(item => !innerProjects.includes(item.shortName)),
                        projSelected: json.filter(item => !innerProjects.includes(item.shortName))
                    }
                });
            })
            .catch(err => dispatch({
                type: "FETCH_TIME_ACCOUNTING_EMPLOYEES_REJECTED",
                payload: err
            }));
    }
}

export function setTimeAccountingDateFrom(dateFrom) {
    return function (dispatch) {
        dispatch({
            type: "TIME_ACCOUNTING_FILTERS_SET_DATE_FROM",
            payload: dateFrom
        });
    }
}

export function setTimeAccountingDateTo(dateTo) {
    return function (dispatch) {
        dispatch({
            type: "TIME_ACCOUNTING_FILTERS_SET_DATE_TO",
            payload: dateTo
        });
    }
}