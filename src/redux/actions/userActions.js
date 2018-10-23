export function setUserLogin(login) {
    return function (dispatch) {
        dispatch({
            type: "SET_USER_LOGIN",
            payload: login
        });
    }
}

export function setUserPassword(password) {
    return function (dispatch) {
        dispatch({
            type: "SET_USER_PASSWORD",
            payload: password
        });
    }
}

export function fetchToken() {
    return function (dispatch) {
        dispatch({
            type: "FETCH_TOKEN_PENDING",
        });

        dispatch({
            type: "FETCH_TOKEN_FULFILLED",
            payload: 'a'
        });
    }
}

/*
export function setUsertoken(token) {
    return function (dispatch) {
        dispatch({
            type: "SET_USER_TOKEN",
            payload: token
        });
    }
}*/
