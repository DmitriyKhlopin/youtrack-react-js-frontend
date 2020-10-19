export function addProjectToSelected(id) {
    return function (dispatch) {
        dispatch({
            type: "REPORT_FILTERS_ADD_PROJECT_TO_SELECTED",
            payload: id
        });
    }
}

export function removeProjectFromSelected(id) {
    return function (dispatch) {
        dispatch({
            type: "REPORT_FILTERS_REMOVE_PROJECT_FROM_SELECTED",
            payload: id
        });
    }
}

export function selectProjectsByMode(mode) {
    return function (dispatch) {
        dispatch({
            type: "REPORT_FILTERS_SELECT_PROJECTS_BY_MODE",
            payload: mode
        });
    }
}

export function setDateFrom(dateFrom) {
    return function (dispatch) {
        dispatch({
            type: "KPI_FILTERS_SET_DATE_FROM",
            payload: dateFrom
        });
    }
}

export function setDateTo(dateTo) {
    return function (dispatch) {
        dispatch({
            type: "KPI_FILTERS_SET_DATE_TO",
            payload: dateTo
        });
    }
}
