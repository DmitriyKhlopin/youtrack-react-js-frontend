import {DEFAULT_POST_HEADERS, ENDPOINT} from "../../Const";
import {filtersToBody} from "../../HelperFunctions";

export function fetchSlaViolationsData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_SLA_VIOLATIONS_REPORT_PENDING'});
        const state = getState();
        const obj = {
            method: 'POST',
            headers: DEFAULT_POST_HEADERS,
            body: JSON.stringify(filtersToBody(state.reportFilters2))
        };
        const baseUrl = `${ENDPOINT}/api/chart/sla_violations`;
        fetch(baseUrl, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_SLA_VIOLATIONS_REPORT_FULFILLED',
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
        case 'FETCH_SLA_VIOLATIONS_REPORT_PENDING': {
            state = {
                ...state,
                isLoading: true
            };
            break;
        }
        case 'FETCH_SLA_VIOLATIONS_REPORT_FULFILLED': {
            state = {
                ...state,
                data: action.payload
            };
            break;
        }
    }
    return state;
};

export const slaViolationsReport = {slaViolationsReport: reducer};
export const selectSlaViolationsReportData = (state) => state.slaViolationsReport.data.map(e => {
    return {key: e.key, violated: e.value1, good: e.value2 - e.value1}
});
export const selectSlaViolationsReportIsLoading = (state) => state.slaViolationsReport.isLoading;
