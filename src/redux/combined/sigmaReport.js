import {ENDPOINT} from "../../Const";
import {filtersToBody} from "../../HelperFunctions";

export function fetchSigmaData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_SIGMA_REPORT_PENDING'});
        const state = getState();
        const obj = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(filtersToBody(state.reportFilters2))
        };


        fetch(`${ENDPOINT}/api/chart/sigma`, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_SIGMA_REPORT_FULFILLED',
                    payload: {
                        sigmaItems: json.data,
                        sigma: json.sigma,
                        sigmaMaxX: Math.max(...json.data.map(item => item.day)) + 2,
                        sigmaMaxY: Math.max(...json.data.map(item => item.count)) + 2,
                    }
                }))
            .catch(err => console.log(err));
    }
}


export function fetchSigmaDataByDayValue(day) {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_SIGMA_BY_DAYS_PENDING'});
        const state = getState();
        const obj = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(filtersToBody(state.reportFilters2))
        };
        const url = `${ENDPOINT}/api/issues/sigma?days=${day}`;
        fetch(url, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_SIGMA_BY_DAYS_FULFILLED',
                    payload: json
                }))
            .catch(err => console.log(err));
    }
}


export default function reducer(state = {
    sigmaData: {
        sigmaItems: [],
        sigma: 0,
        sigmaMaxX: 0,
        sigmaMaxY: 0
    },
    details: [],
    isLoading: false
}, action) {
    switch (action.type) {
        case 'FETCH_SIGMA_REPORT_FULFILLED': {
            state = {
                ...state,
                sigmaData: action.payload
            };
            break;
        }
        case 'FETCH_SIGMA_BY_DAYS_PENDING': {
            state = {
                ...state,
                isLoading: true
            };
            break;
        }
        case 'FETCH_SIGMA_BY_DAYS_FULFILLED': {
            state = {
                ...state,
                details: action.payload,
                isLoading: false
            };
            break;
        }
    }
    return state;
};

export const sigmaReducer = {sigma: reducer};
export const selectSigmaData = (state) => state.sigma.sigmaData;
export const selectSigmaIssuesCount = (state) => state.sigma.sigmaData.sigmaItems.sum('count');
export const selectSigmaDetails = (state) => state.sigma.details;
export const selectSigmaIsLoading = (state) => state.sigma.isLoading;
