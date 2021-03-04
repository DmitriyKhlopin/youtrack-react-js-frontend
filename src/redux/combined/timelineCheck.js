import {ENDPOINT} from "../../Const";

export function fetchTimelineDataById(issueId) {
    return function (dispatch) {
        dispatch({type: 'FETCH_DETAILED_STATE_TRANSITIONS_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };


        fetch(`${ENDPOINT}/api/issues/detailed_state_transitions?issueId=${issueId}`, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_DETAILED_STATE_TRANSITIONS_FULFILLED',
                    payload: json
                }))
            .catch(err => console.log(err));
    }
}


export default function reducer(state = {
    transitions: [],
    isLoading: false
}, action) {
    switch (action.type) {
        case 'FETCH_DETAILED_STATE_TRANSITIONS_FULFILLED': {
            state = {
                ...state,
                transitions: action.payload,
                isLoading: false
            };
            break;
        }
        case 'FETCH_DETAILED_STATE_TRANSITIONS_PENDING': {
            state = {
                ...state,
                isLoading: true
            };
            break;
        }
    }
    return state;
};

export const timelineCheckReducer = {timelineCheck: reducer};
export const selectTimelineCheckData = (state) => state.timelineCheck.transitions;
export const selectTimelineCheckIsLoading = (state) => state.timelineCheck.isLoading;
