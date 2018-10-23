export default function reducer(state = {
    login: '',
    password: '',
    token: null
}, action) {
    switch (action.type) {
        case 'SET_USER_LOGIN': {
            state = {
                ...state,
                login: action.payload,
            };
            break;
        }
        case 'SET_USER_PASSWORD': {
            state = {
                ...state,
                password: action.payload
            };
            break;
        }
        case 'FETCH_TOKEN_FULFILLED': {
            state = {
                ...state,
                token: action.payload
            };
            break;
        }
    }
    return state;
};