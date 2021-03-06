import {DEFAULT_POST_HEADERS, ENDPOINT} from "../../Const";
import {filtersToBody} from "../../HelperFunctions";

export function fetchDynamicsData(){
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_DYNAMICS_REPORT_PENDING'});
        const state = getState();
        const obj = {
            method: 'POST',
            headers: DEFAULT_POST_HEADERS,
            body: JSON.stringify(filtersToBody(state.reportFilters2))
        };
        fetch(`${ENDPOINT}/api/chart/dynamics`, obj)
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
