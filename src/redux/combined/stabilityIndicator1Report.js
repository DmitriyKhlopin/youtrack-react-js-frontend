import {DEFAULT_POST_HEADERS, ENDPOINT} from "../../Const";
import {filtersToBody} from "../../HelperFunctions";

export function fetchStabilityIndicator1Data() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_STABILITY_INDICATOR_1_REPORT_PENDING'});
        const state = getState();
        const obj = {
            method: 'POST',
            headers: DEFAULT_POST_HEADERS,
            body: JSON.stringify(filtersToBody(state.reportFilters2))
        };
        const baseUrl = `${ENDPOINT}/api/chart/stabilization/indicator/1`;
        fetch(baseUrl, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_STABILITY_INDICATOR_1_REPORT_FULFILLED',
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
        case 'FETCH_STABILITY_INDICATOR_1_REPORT_PENDING': {
            state = {
                ...state,
                isLoading: true
            };
            break;
        }
        case 'FETCH_STABILITY_INDICATOR_1_REPORT_FULFILLED': {
            state = {
                ...state,
                data: action.payload
            };
            break;
        }
    }
    return state;
};

export const stabilityIndicator1Report = {stabilityIndicator1Report: reducer};
export const selectStabilityIndicator1ReportData = (state) => state.stabilityIndicator1Report.data;
export const selectStabilityIndicator1ReportMaxValue = (state) => Math.max(state.stabilityIndicator1Report.data.map(e => e.value));
export const selectStabilityIndicator1ReportIsLoading = (state) => state.stabilityIndicator1Report.isLoading;
