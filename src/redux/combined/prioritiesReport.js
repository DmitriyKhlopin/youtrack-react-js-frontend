import {DEFAULT_POST_HEADERS, ENDPOINT} from "../../Const";
import {filtersToBody} from "../../HelperFunctions";

export function fetchPrioritiesReportData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_PRIORITIES_REPORT_PENDING'});
        const state = getState();
        const obj = {
            method: 'POST',
            headers: DEFAULT_POST_HEADERS,
            body: JSON.stringify(filtersToBody(state.reportFilters2))
        };
        const baseUrl = `${ENDPOINT}/api/chart/priorities`;
        fetch(baseUrl, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_PRIORITIES_REPORT_FULFILLED',
                    payload: json
                }))
            .catch(err => console.log(err));
    }
}

export default function reducer(state = {
    data: [],
    isLoading: false
}, action) {
    switch (action.type) {
        case 'FETCH_PRIORITIES_REPORT_PENDING': {
            state = {
                ...state,
                isLoading: true
            };
            break;
        }
        case 'FETCH_PRIORITIES_REPORT_FULFILLED': {
            state = {
                ...state,
                data: action.payload
            };
            break;
        }
    }
    return state;
};

export const prioritiesReport = {prioritiesReport: reducer};
export const selectPrioritiesReportData = (state) => state.prioritiesReport.data;
export const selectPrioritiesReportIsLoading = (state) => state.prioritiesReport.isLoading;
