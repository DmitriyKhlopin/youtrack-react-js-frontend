import {DEFAULT_POST_HEADERS, ENDPOINT} from "../../Const";
import {filtersToBody} from "../../HelperFunctions";

export function fetchAverageLifetimeUnresolvedData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_AVERAGE_LIFETIME_U_REPORT_PENDING'});
        const state = getState();
        const obj = {
            method: 'POST',
            headers: DEFAULT_POST_HEADERS,
            body: JSON.stringify(filtersToBody(state.reportFilters2))
        };
        const baseUrl = `${ENDPOINT}/api/chart/avg_lifetime_unresolved`;
        fetch(baseUrl, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_AVERAGE_LIFETIME_U_REPORT_FULFILLED',
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
        case 'FETCH_AVERAGE_LIFETIME_U_REPORT_PENDING': {
            state = {
                ...state,
                isLoading: true
            };
            break;
        }
        case 'FETCH_AVERAGE_LIFETIME_U_REPORT_FULFILLED': {
            state = {
                ...state,
                data: action.payload
            };
            break;
        }
    }
    return state;
};

export const averageLifetimeUnresolvedReport = {averageLifetimeUnresolvedReport: reducer};
export const selectAverageLifetimeUnresolvedReportData = (state) => state.averageLifetimeUnresolvedReport.data;
export const selectAverageLifetimeUnresolvedReportIsLoading = (state) => state.averageLifetimeUnresolvedReport.isLoading;
