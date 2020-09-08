export function setError(text) {
    return function (dispatch) {
        dispatch({type: "SET_ERROR", payload: text});
    }
}

export function dismissError() {
    return function (dispatch) {
        dispatch({type: 'DISMISS_ERROR'});
    }
}

export default function reducer(state = {error: null}, action) {
    switch (action.type) {
        case 'SET_ERROR': {
            state = {
                ...state, error: action.payload
            }
            break;
        }
        case 'DISMISS_ERROR': {
            state = {
                ...state, error: null
            }
            break;
        }
    }
    return state;
}

export const errorReducer = {error: reducer}
export const selectErrorExists = (state) => state.error.error !== null
export const selectErrorText = (state) => state.error.error
