import {ENDPOINT} from "../../Const";

export function fetchCreatedOnWeekByPartnersData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_CREATED_ON_WEEK_BY_PARTNER_REPORT_PENDING'});
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
        fetch(baseUrl + 'created_on_week' + filters, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_CREATED_ON_WEEK_BY_PARTNER_REPORT_FULFILLED',
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
        case 'FETCH_CREATED_ON_WEEK_BY_PARTNER_REPORT_PENDING': {
            state = {
                ...state,
                isLoading: true
            };
            break;
        }
        case 'FETCH_CREATED_ON_WEEK_BY_PARTNER_REPORT_FULFILLED': {
            state = {
                ...state,
                data: action.payload
            };
            break;
        }
    }
    return state;
};

export const createdOnWeekByPartnersReducer = {createdOnWeekByPartners: reducer};
export const selectCreatedOnWeekByPartnersData = (state) => state.createdOnWeekByPartners.data;
export const selectCreatedOnWeekByPartnersIsLoading = (state) => state.createdOnWeekByPartners.isLoading;
