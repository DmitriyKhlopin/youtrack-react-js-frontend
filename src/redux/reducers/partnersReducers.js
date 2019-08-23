export default function reducer(state = {
    data: [],

}, action) {
    switch (action.type) {
        case 'FETCH_PARTNERS_PENDING_FULFILLED': {
            state = {
                ...state,
                data: action.payload
            };
            break;
        }
    }
    return state;
};
