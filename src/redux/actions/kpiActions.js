import {ENDPOINT} from "../../Const";

export function fetchKpiReportData() {
    return function (dispatch) {
        dispatch({type: 'FETCH_KPI_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const baseUrl = `${ENDPOINT}/api/kpi/`;
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