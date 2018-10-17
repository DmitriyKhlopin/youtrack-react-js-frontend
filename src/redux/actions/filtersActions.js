import {innerProjects} from "../../Const";

export function fetchProjects() {
    return function (dispatch) {
        dispatch({type: "FETCH_PROJECTS_PENDING"});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        const url = "http://10.0.172.42:8081/api/project";
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
            type: "ADD_PROJECT_TO_SELECTED",
            payload: id
        });
    }
}

export function removeProjectFromSelected(id) {
    return function (dispatch) {
        dispatch({
            type: "REMOVE_PROJECT_FROM_SELECTED",
            payload: id
        });
    }
}

export function selectProjectsByMode(mode) {
    return function (dispatch) {
        dispatch({
            type: "SELECT_PROJECTS_BY_MODE",
            payload: mode
        });
    }
}

