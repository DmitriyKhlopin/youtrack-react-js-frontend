import {DEFAULT_POST_HEADERS, ENDPOINT} from "../../Const";
import {filtersToBody} from "../../HelperFunctions";

export function fetchCreatedOnWeekByPartnersData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_CREATED_ON_WEEK_BY_PARTNER_REPORT_PENDING'});

        const state = getState();
        const obj = {
            method: 'POST',
            headers: DEFAULT_POST_HEADERS,
            body: JSON.stringify(filtersToBody(state.reportFilters2))
        };
        fetch(`${ENDPOINT}/api/chart/created_on_week` , obj)
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
