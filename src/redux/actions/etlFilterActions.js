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

export function fetchETL() {
    return function (dispatch, getState) {
        const state = getState();
        const dateFrom = state.etlFilters.dateFrom;
        const dateTo = state.etlFilters.dateTo;
        dispatch({type: "FETCH_ETL_PENDING"});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        const url = `http://10.0.172.42:8081/etl?dateFrom=${dateFrom}&dateTo=${dateTo}`;
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