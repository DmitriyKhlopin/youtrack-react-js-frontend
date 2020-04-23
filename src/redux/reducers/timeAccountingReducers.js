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
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_TOGGLE_PENDING': {
            state = {
                ...state,
                dictionaryData: state.dictionaryData.map(i => i.id === action.payload ? {...i, loading: true} : i)
            };
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_TOGGLE_FULFILLED': {
            state = {
                ...state,
                dictionaryData: state.dictionaryData.map(i => i.id === action.payload ? {...i, loading: undefined, approved: !i.approved} : i)
            };
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_DELETE_PENDING': {
            state = {
                ...state,
                dictionaryData: state.dictionaryData.map(i => i.id === action.payload ? {...i, deleting: true} : i)
            };
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_DELETE_FULFILLED': {
            state = {
                ...state,
                dictionaryData: state.dictionaryData.filter(i => i.id !== action.payload)
            };
            break;
        }
    }
    return state;
};


export const selectTimeAccountingData = (state) => state.timeAccountingData;