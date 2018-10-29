import moment from 'moment';
import {ENDPOINT} from "../../Const";

export function fetchReportData(/*projects, dateFrom, dateTo*/) {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_REPORT_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const state = getState();
        console.log(state);
        const projects = state.reportFilters.projSelected.map(item => item.shortName);
        const dateFrom = state.reportFilters.dateFrom;
        const dateTo = state.reportFilters.dateTo;
        const baseUrl = `${ENDPOINT}/api/chart/`;
        const filters = '?projects=' + projects + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo;
        fetch(baseUrl + 'dynamics' + filters, obj)
            .then(res => res.json())
            .then(json => {
                    const res = json.map(function (item) {
                        item.week = moment(item.week).format('L');
                        return item
                    });
                    /*console.log(res)*/
                    dispatch({
                        type: 'FETCH_REPORT_DYNAMICS_FULFILLED',
                        payload: res
                    })
                }
            )
            .catch(err => console.log(err));

        fetch(baseUrl + 'sigma' + filters, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_REPORT_SIGMA_FULFILLED',
                    payload: {
                        sigmaItems: json.data,
                        sigma: json.sigma,
                        sigmaMaxX: Math.max(...json.data.map(item => item.day)) + 2,
                        sigmaMaxY: Math.max(...json.data.map(item => item.count)) + 2,
                    }
                }))
            .catch(err => console.log(err));

        fetch(baseUrl + 'created_on_week' + filters, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_REPORT_ISSUES_FROM_PARTNERS_OVER_LAST_WEEK_FULFILLED',
                    payload: json
                }))
            .catch(err => console.log(err));
    }
}