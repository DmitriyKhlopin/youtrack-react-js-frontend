import {ENDPOINT} from "../../Const";
import {sumBy} from "lodash";
import {filtersToBody} from "../../HelperFunctions";

export function fetchVelocityData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_VELOCITY_REPORT_PENDING'});
        const state = getState();
        const body = {...filtersToBody(state.reportFilters2)}
        const obj = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        };

        console.log(body);
        fetch(`${ENDPOINT}/api/chart/velocity`, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_VELOCITY_REPORT_FULFILLED',
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
        case 'FETCH_VELOCITY_REPORT_PENDING': {
            state = {
                ...state,
                isLoading: true
            };
            break;
        }
        case 'FETCH_VELOCITY_REPORT_FULFILLED': {
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

export const velocityReducer = {velocity: reducer};
export const selectVelocityData = (state) => state.velocity.data;
export const selectVelocityIsLoading = (state) => state.velocity.isLoading;
export const selectAverageVelocity = (state) => (sumBy(state.velocity.data, ({all})=>all)/state.velocity.data.length).toFixed(1);
