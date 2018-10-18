import moment from "moment";

export default function reducer(state = {
    proj: [],
    projDefault: [],
    projSelected: [],
    dateFrom: moment().subtract(1, 'weeks').format('YYYY-MM-DD'),
    dateTo: moment().format('YYYY-MM-DD'),
}, action) {
    switch (action.type) {
        case 'SET_ETL_FILTER_DATE_FROM': {
            state = {
                ...state,
                dateFrom: action.payload
            };
            break;
        }
        case 'SET_ETL_FILTER_DATE_TO': {
            state = {
                ...state,
                dateTo: action.payload
            };
            break;
        }
    }
    return state;
};