export default function reducer(state = {
    fetching: false,
    fetched: false,
    error: null,
    durationItems: [],
}, action) {
    switch (action.type) {
        case 'FETCH_WORK_DURATION_PENDING': {
            state = {
                ...state,
                fetching: true
            };
            break;
        }
        case 'FETCH_WORK_DURATION_REJECTED': {
            state = {
                ...state,
                fetching: false,
                error: action
            };
            break;
        }
        case 'FETCH_WORK_DURATION_FULFILLED': {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                durationItems: action.payload.durationItems,
            };
            break;
        }
    }
    return state;
};
