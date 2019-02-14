export default function reducer(state = {
    fetching: false,
    fetched: false,
    error: null,
    iterations: [],
    builds: [],
    items: [],
    youTrackId: null
}, action) {
    switch (action.type) {
        case 'CLEAR_WORK_ITEMS': {
            state = {
                ...state,
                items: []
            };
            break;
        }
        case 'FETCH_ITERATIONS_PENDING': {
            state = {
                ...state,
                fetching: true
            };
            break;
        }
        case 'FETCH_ITERATIONS_REJECTED': {
            state = {
                ...state,
                fetching: false,
                error: action
            };
            break;
        }
        case 'FETCH_ITERATIONS_FULFILLED': {
            state = {
                ...state,
                fetching: false,
                iterations: action.payload.iterations,
                fetched: true
            };
            break;
        }
        case 'FETCH_BUILDS_BY_ITERATION_PENDING': {
            state = {
                ...state,
                fetching: true,
                items: []
            };
            break;
        }
        case 'FETCH_BUILDS_BY_ITERATION_REJECTED': {
            state = {
                ...state,
                fetching: false,
                error: action
            };
            break;
        }
        case 'FETCH_BUILDS_BY_ITERATION_FULFILLED': {
            state = {
                ...state,
                fetching: false,
                builds: action.payload.builds,
                /*projDefault: action.payload.projDefault,
                projSelected: action.payload.projDefault,*/
                fetched: true
            };
            break;
        }
        case 'FETCH_FIXED_BY_ITERATION_AND_BUILD_PENDING': {
            state = {
                ...state,
                fetching: true,
                youTrackId: null,
                items: []
            };
            break;
        }
        case 'FETCH_FIXED_BY_ITERATION_AND_BUILD_REJECTED': {
            state = {
                ...state,
                fetching: false,
                error: action
            };
            break;
        }
        case 'FETCH_FIXED_BY_ITERATION_AND_BUILD_FULFILLED': {
            state = {
                ...state,
                fetching: false,
                items: action.payload.items,
                /*projDefault: action.payload.projDefault,
                projSelected: action.payload.projDefault,*/
                fetched: true
            };
            break;
        }
        case 'SEND_ITEM_TO_YOUTRACK_PENDING': {
            for (var j in state.items) {
                if (state.items[j].changeRequestId === action.payload.changeRequestId) {
                    state.items[j].isPublishing = true;
                    break; //Stop this loop, we found it!
                }
            }
            state = {
                ...state,
                /*fetching: true*/
            };
            break;
        }
        case 'SEND_ITEM_TO_YOUTRACK_REJECTED': {
            state = {
                ...state,
                fetching: false,
                error: action
            };
            break;
        }
        case 'SEND_ITEM_TO_YOUTRACK_FULFILLED': {
            for (var i in state.items) {
                if (state.items[i].changeRequestId === action.payload.changeRequestId) {
                    state.items[i].youTrackId = action.payload.youTrackId;
                    state.items[i].isPublishing = false;
                    break; //Stop this loop, we found it!
                }
            }
            state = {
                ...state,
                /*fetching: false,*/
                /*items: action.payload.youTrackId,*/
                /*fetched: true*/
            };
            break;
        }
    }
    return state;
};
