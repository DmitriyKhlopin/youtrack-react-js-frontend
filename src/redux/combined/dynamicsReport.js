import {ENDPOINT} from "../../Const";

export function fetchDynamicsData(){
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_DYNAMICS_REPORT_PENDING'});
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
        const filters = `?projects=${projects}&dateFrom=${dateFrom}&dateTo=${dateTo}`;

        fetch(baseUrl + 'dynamics' + filters, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_DYNAMICS_REPORT_FULFILLED',
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
        case 'FETCH_DYNAMICS_REPORT_PENDING': {
            state = {
                ...state,
                isLoading: true
            };
            break;
        }
        case 'FETCH_DYNAMICS_REPORT_FULFILLED': {
            state = {
                ...state,
                data: action.payload,
                isLoading: false
            };
            break;
        }
    }
    return state;
};

export const dynamicsReducer = {dynamics: reducer};
export const selectDynamicsData = (state) => state.dynamics.data;
export const selectDynamicsIsLoading = (state) => state.dynamics.isLoading;
