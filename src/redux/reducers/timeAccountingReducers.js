export default function reducer(state = {
    timeData: []
}, action) {
    switch (action.type) {
        case 'FETCH_TIME_ACCOUNTING_PENDING': {
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_FULFILLED': {
            state = {
                ...state,
                timeData: action.payload
            };
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_FAILED': {
            break;
        }
    }
    return state;
};