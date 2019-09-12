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
        const baseUrl = `${ENDPOINT}/api/kpi?dateFrom=${state.kpiFilters.dateFrom}&dateTo=${state.kpiFilters.dateTo}`;
        fetch(baseUrl, obj)
            .then(res => res.json())
            .then(json => {
                    dispatch({
                        type: 'FETCH_KPI_FULFILLED',
                        payload: json
                    })
                }
            )
            .catch(err => console.log(err));
    }
}
