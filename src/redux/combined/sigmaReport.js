import {ENDPOINT} from "../../Const";

export function fetchSigmaData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_SIGMA_REPORT_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const state = getState();
        const projects = state.reportFilters2.projects.map(item => item.value);
        const dateFrom = state.reportFilters.dateFrom;
        const dateTo = state.reportFilters.dateTo;
        const baseUrl = `${ENDPOINT}/api/chart/`;
        const filters = '?projects=' + projects + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo;

        fetch(baseUrl + 'sigma' + filters, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_SIGMA_REPORT_FULFILLED',
                    payload: {
                        sigmaItems: json.data,
                        sigma: json.sigma,
                        sigmaMaxX: Math.max(...json.data.map(item => item.day)) + 2,
                        sigmaMaxY: Math.max(...json.data.map(item => item.count)) + 2,
                    }
                }))
            .catch(err => console.log(err));
    }
}


export function fetchSigmaDataByValue() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_SIGMA_BY_DATE_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const state = getState();
        const projects = state.reportFilters2.projects.map(item => item.value);
        const dateFrom = state.reportFilters.dateFrom;
        const dateTo = state.reportFilters.dateTo;
        const baseUrl = `${ENDPOINT}/api/chart/`;
        const filters = '?projects=' + projects + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo;
        fetch(baseUrl + 'sigma' + filters, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_SIGMA_BY_DATE_FULFILLED',
                    payload: json
                }))
            .catch(err => console.log(err));
    }
}