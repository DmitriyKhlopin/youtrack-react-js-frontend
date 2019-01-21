export default function reducer(state = {
    fetching: false,
    fetched: false,
    error: null,
    iterations: [],
    builds: [],
    items: [],
    /*projDefault: [],
    projSelected: [],
    dateFrom: moment().subtract(8, 'weeks').format('YYYY-MM-DD'),
    dateTo: moment().format('YYYY-MM-DD'),*/
}, action) {
    switch (action.type) {
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
                /*projDefault: action.payload.projDefault,
                projSelected: action.payload.projDefault,*/
                fetched: true
            };
            break;
        }
        case 'FETCH_BUILDS_BY_ITERATION_PENDING': {
            state = {
                ...state,
                fetching: true
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
                fetching: true
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
    }
    return state;
};
