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