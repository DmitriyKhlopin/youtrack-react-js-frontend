export default function reducer(state = {
    fetching: false,
    fetched: false,
    error: null,
    kpiData: [],
    /*proj: [],
    projDefault: [],
    projSelected: [],
    dateFrom: moment().subtract(8, 'weeks').format('YYYY-MM-DD'),
    dateTo: moment().format('YYYY-MM-DD'),*/
}, action) {
    switch (action.type) {
        case 'FETCH_KPI_PENDING': {
            state = {
                ...state,
                fetching: true
            };
            break;
        }
        case 'FETCH_KPI_REJECTED': {
            state = {
                ...state,
                fetching: false,
                error: action
            };
            break;
        }
        case 'FETCH_KPI_FULFILLED': {
            state = {
                ...state,
                fetching: false,
                kpiData: action.payload,
                fetched: true
            };
            break;
        }
    }
    return state;
};