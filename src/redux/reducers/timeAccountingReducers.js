export default function reducer(state = {
    timeLoading: false,
    timeData: [],
    dictionaryData: []
}, action) {
    switch (action.type) {
        case 'FETCH_TIME_ACCOUNTING_PENDING': {
            state = {
                ...state,
                timeLoading: true
            };
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_FULFILLED': {
            state = {
                ...state,
                timeLoading: false,
                timeData: action.payload
            };
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_FAILED': {
            state = {
                ...state,
                timeLoading: false,
            };
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
