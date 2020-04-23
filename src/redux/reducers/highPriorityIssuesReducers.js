export default function reducer(state = {
    fetching: false,
    fetched: false,
    error: null,
    issues: [],
    primaryFilter: 'project',
    projects: [],
    customers: [],
    bindings: []
}, action) {
    switch (action.type) {
        case 'FETCH_HIGH_PRIORITY_ISSUES_PENDING': {
            state = {
                ...state,
                fetching: true
            };
            break;
        }
        case 'FETCH_HIGH_PRIORITY_ISSUES_REJECTED': {
            state = {
                ...state,
                fetching: false,
                error: action,
                issues: [],
            };
            break;
        }
        case 'FETCH_HIGH_PRIORITY_ISSUES_FULFILLED': {
            state = {
                ...state,
                fetching: false,
                issues: action.payload,
                fetched: true
            };
            break;
        }
    }
    return state;
};
