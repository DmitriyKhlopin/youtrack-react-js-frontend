export default function reducer(state = {
    repositoriesData: []
}, action) {
    /*console.log(action);*/
    switch (action.type) {
        case 'FETCH_ALL_REPOSITORIES_PENDING': {
            break;
        }
        case 'FETCH_ALL_REPOSITORIES_FULFILLED': {
            state = {
                ...state,
                repositoriesData: action.payload
            };
            break;
        }
        case 'FETCH_ALL_REPOSITORIES_FAILED': {
            break;
        }
    }
    return state;
};