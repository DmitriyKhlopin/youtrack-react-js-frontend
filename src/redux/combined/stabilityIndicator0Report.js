import {DEFAULT_POST_HEADERS, ENDPOINT} from "../../Const";
import {filtersToBody} from "../../HelperFunctions";

export function fetchStabilityIndicator0Data() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_STABILITY_INDICATOR_0_REPORT_PENDING'});
        const state = getState();
        const obj = {
            method: 'POST',
            headers: DEFAULT_POST_HEADERS,
            body: JSON.stringify(filtersToBody(state.reportFilters2))
        };
        const baseUrl = `${ENDPOINT}/api/chart/stabilization/indicator/0`;
        fetch(baseUrl, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_STABILITY_INDICATOR_0_REPORT_FULFILLED',
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
        case 'FETCH_STABILITY_INDICATOR_0_REPORT_PENDING': {
            state = {
                ...state,
                isLoading: true
            };
            break;
        }
        case 'FETCH_STABILITY_INDICATOR_0_REPORT_FULFILLED': {
            state = {
                ...state,
                data: action.payload
            };
            break;
        }
    }
    return state;
};

export const stabilityIndicator0Report = {stabilityIndicator0Report: reducer};
export const selectStabilityIndicator0ReportData = (state) => state.stabilityIndicator0Report.data;
export const selectStabilityIndicator0ReportMaxValue = (state) => Math.max(state.stabilityIndicator0Report.data.map(e => e.value));
export const selectStabilityIndicator0ReportIsLoading = (state) => state.stabilityIndicator0Report.isLoading;
