export function setSelectedNavItem(title) {
    return function (dispatch) {
        dispatch({
            type: "SET_SELECTED_NAV_ITEM",
            payload: title
        });
    }
}

export function toggleAppBar() {
    return function (dispatch) {
        dispatch({
            type: "TOGGLE_APP_BAR"
        });
    }
}

export function openMainDialog() {
    return function (dispatch) {
        dispatch({
            type: 'OPEN_MAIN_DIALOG'
        })
    }
}

export function closeMainDialog() {
    return function (dispatch) {
        dispatch({
            type: 'CLOSE_MAIN_DIALOG'
        })
    }
}