import {ENDPOINT, innerProjects} from "../../Const";

export function fetchProjects() {
    return function (dispatch) {
        dispatch({type: "FETCH_PROJECTS_PENDING"});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        const url = `${ENDPOINT}/api/project`;
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: "FETCH_PROJECTS_FULFILLED",
                    payload: {
                        proj: json,
                        projDefault: json.filter(item => !innerProjects.includes(item.shortName)),
                        projSelected: json.filter(item => !innerProjects.includes(item.shortName))
                    }
                });
            })
            .catch(err => dispatch({
                type: "FETCH_PROJECTS_REJECTED",
                payload: err
            }));
    }
}

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