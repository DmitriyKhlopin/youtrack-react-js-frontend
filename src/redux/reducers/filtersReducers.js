export default function reducer(state = {
    fetching: false,
    fetched: false,
    error: null,
    proj: [],
    projDefault: [],
    projSelected: []
}, action) {
    switch (action.type) {
        case 'FETCH_PROJECTS_PENDING': {
            state = {
                ...state,
                fetching: true
            };
            break;
        }
        case 'FETCH_PROJECTS_REJECTED': {
            state = {
                ...state,
                fetching: false,
                error: action
            };
            break;
        }
        case 'FETCH_PROJECTS_FULFILLED': {
            state = {
                ...state,
                fetching: false,
                proj: action.payload.proj,
                projDefault: action.payload.projDefault,
                projSelected: action.payload.projDefault,
                fetched: true
            };
            break;
        }
        case 'ADD_PROJECT_TO_SELECTED': {
            state = {
                ...state,
                projSelected: action.payload,
            };
            break;
        }
        case 'REMOVE_PROJECT_FROM_SELECTED': {
            state = {
                ...state,
                projSelected: action.payload,
            };
            break;
        }
    }
    return state;
};