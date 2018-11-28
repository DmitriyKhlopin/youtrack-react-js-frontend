export default function reducer(state = {
    possibleErrorsData: []
}, action) {
    switch (action.type) {
        case 'FETCH_POSSIBLE_ERRORS_PENDING': {
            break;
        }
        case 'FETCH_POSSIBLE_ERRORS_FULFILLED': {
            state = {
                ...state,
                possibleErrorsData: action.payload
            };
            break;
        }
        case 'FETCH_POSSIBLE_ERRORS_FAILED': {
            break;
        }
    }
    return state;
};