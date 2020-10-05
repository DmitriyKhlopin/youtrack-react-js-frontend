import moment from 'moment';
import {ENDPOINT} from "../../Const";

export function fetchReportData() {
    return function (dispatch) {
        dispatch({type: 'FETCH_REPORT_PENDING'});
        /*fetchSigmaData();
        fetchDynamicsData();
        fetchSpentTimeData();
        fetchCreatedOnWeekData();*/
    }
}

export function fetchSpentTimeData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_SPENT_TIME_GROUPED_BY_PROJECT_TYPE_ENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const state = getState();
        const projects = state.reportFilters.projSelected.map(item => item.shortName);
        const dateFrom = state.reportFilters.dateFrom;
        const dateTo = state.reportFilters.dateTo;
        const baseUrl = `${ENDPOINT}/api/chart/`;
        const filters = '?projects=' + projects + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo;
        fetch(baseUrl + 'created_on_week' + filters, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_SPENT_TIME_GROUPED_BY_PROJECT_TYPE_FULFILLED',
                    payload: json
                }))
            .catch(err => console.log(err));
    }
}

export function fetchCreatedOnWeekData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_CREATED_BY_PARTNER_ON_WEEK_REPORT_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const state = getState();
        const projects = state.reportFilters.projSelected.map(item => item.shortName);
        const dateFrom = state.reportFilters.dateFrom;
        const dateTo = state.reportFilters.dateTo;
        const baseUrl = `${ENDPOINT}/api/chart/`;
        const filters = '?projects=' + projects + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo;
        fetch(baseUrl + 'created_on_week' + filters, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_CREATED_BY_PARTNER_ON_WEEK_REPORT_FULFILLED',
                    payload: json
                }))
            .catch(err => console.log(err));
    }
}

export function fetchDynamicsData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_DYNAMICS_REPORT_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const state = getState();
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
                        type: 'FETCH_DYNAMICS_REPORT_FULFILLED',
                        payload: res
                    })
                }
            )
            .catch(err => console.log(err));
    }
}

