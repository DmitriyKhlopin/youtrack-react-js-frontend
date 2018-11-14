import moment from "moment";

export default function reducer(state = {
    dateFrom: moment().format('YYYY-MM-DD'),
    dateTo: moment().format('YYYY-MM-DD'),
}, action) {
    switch (action.type) {
        case 'TIME_ACCOUNTING_FILTERS_SET_DATE_FROM': {
            state = {
                ...state,
                dateFrom: action.payload
            };
            break;
        }
        case 'TIME_ACCOUNTING_FILTERS_SET_DATE_TO': {
            state = {
                ...state,
                dateTo: action.payload
            };
            break;
        }
    }
    return state;
};