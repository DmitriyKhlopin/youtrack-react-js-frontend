import moment from "moment";

export default function reducer(state = {
    reportData: [],
    usersData: [],
    selectedUsersData: [],
    dateFrom: moment().format('YYYY-MM-DD'),
    dateTo: moment().format('YYYY-MM-DD'),
}, action) {
    switch (action.type) {
        case 'FETCH_ACTUAL_TIME_DATA_PENDING': {
            break;
        }
        case 'FETCH_ACTUAL_TIME_DATA_FULFILLED': {
            state = {
                ...state,
                reportData: action.payload
            };
            break;
        }
        case 'FETCH_ACTUAL_TIME_DATA_FAILED': {
            break;
        }
        case 'FETCH_ACTUAL_TIME_USERS_PENDING': {
            break;
        }
        case 'FETCH_ACTUAL_TIME_USERS_FULFILLED': {
            state = {
                ...state,
                usersData: action.payload
            };
            break;
        }
        case 'FETCH_ACTUAL_TIME_USERS_FAILED': {
            break;
        }
        case 'ACTUAL_TIME_SET_DATE_FROM': {
            state = {
                ...state,
                dateFrom: action.payload
            };
            break;
        }
        case 'ACTUAL_TIME_SET_DATE_TO': {
            state = {
                ...state,
                dateTo: action.payload
            };
            break;
        }
        case 'ACTUAL_TIME_SET_CURRENTLY_SELECTED_USERS':{
            state = {
                ...state,
                selectedUsersData: action.payload
            };
            break;
        }
    }
    return state;
};