export default function reducer(state = {
    timeLoading: false,
    timeData: []
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
    }
    return state;
};


export const timeAccountingReducer = {timeAccounting: reducer}

export const selectTimeAccountingData = (state) => state.timeAccounting.timeData;