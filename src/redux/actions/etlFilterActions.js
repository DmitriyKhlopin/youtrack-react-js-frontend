import {ENDPOINT} from "../../Const";

export function setEtlFilterDateFrom(dateFrom) {
    return function (dispatch) {
        dispatch({
            type: "SET_ETL_FILTER_DATE_FROM",
            payload: dateFrom
        });
    }
}

export function setEtlFilterDateTo(dateTo) {
    return function (dispatch) {
        dispatch({
            type: "SET_ETL_FILTER_DATE_TO",
            payload: dateTo
        });
    }
}

export function fetchETL(dateType, startDate, endDate, parameters) {
    return function (dispatch/*, getState*/) {
        console.log({startDate, endDate, parameters})
        dispatch({type: "FETCH_ETL_PENDING"});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        const url = `${ENDPOINT}/api/etl?dateType=${dateType}&dateFrom=${startDate}&dateTo=${endDate}&parameters=${parameters}`;
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: "FETCH_ETL_FULFILLED",
                    payload: json
                });
            })
            .catch(err => dispatch({
                type: "FETCH_ETL_REJECTED",
                payload: err
            }))
    }
}
