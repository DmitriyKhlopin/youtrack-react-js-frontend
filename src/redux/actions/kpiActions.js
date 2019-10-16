import {ENDPOINT} from "../../Const";

export function fetchKpiReportData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_KPI_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const state = getState();
        const url1 = `${ENDPOINT}/api/kpi?mode=result2&dateFrom=${state.kpiFilters.dateFrom}&dateTo=${state.kpiFilters.dateTo}`;
        const url2 = `${ENDPOINT}/api/kpi?mode=overall&dateFrom=${state.kpiFilters.dateFrom}&dateTo=${state.kpiFilters.dateTo}`;

        Promise.all([url1, url2].map(u => fetch(u))).then(responses =>
            Promise.all(responses.map(res => res.json()))
        ).then(json => {
            console.log(json);
            dispatch({
                type: 'FETCH_KPI_FULFILLED',
                payload: json
            })
        });
        /*fetch(url1, obj)
            .then(res => res.json())
            .then(json => {
                    dispatch({
                        type: 'FETCH_KPI_FULFILLED',
                        payload: json
                    })
                }
            )
            .catch(err => console.log(err));*/
    }
}
