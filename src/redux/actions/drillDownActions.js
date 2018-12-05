export function openDrillDown(filters) {
    return function (dispatch, getState) {
        dispatch({
            type: 'DRILLDOWN_DIALOG_OPEN',
            payload: filters
        })
    }
}

export function closeDrillDown(filters) {
    return function (dispatch, getState) {
        dispatch({
            type: 'DRILLDOWN_DIALOG_CLOSE',
            payload: filters
        })
    }
}