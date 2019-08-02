export default function reducer(state = {
    timeData: [],
    dictionaryData: []
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
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_PENDING': {
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_FULFILLED': {
            state = {
                ...state,
                dictionaryData: action.payload
            };
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_FAILED': {
            break;
        }
    }
    return state;
};
