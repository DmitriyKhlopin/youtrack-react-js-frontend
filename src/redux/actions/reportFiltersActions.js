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
                        proj: json.sort(stringSort),
                        projDefault: json.filter(item => !innerProjects.includes(item.shortName)).sort(stringSort),
                        projSelected: json.filter(item => !innerProjects.includes(item.shortName)).sort(stringSort)
                    }
                });
            })
            .catch(err => dispatch({
                type: "FETCH_PROJECTS_REJECTED",
                payload: err
            }));
    }
}

export function fetchPartnerCustomers() {
    return function (dispatch) {
        dispatch({type: "FETCH_PARTNER_CUSTOMERS_PENDING"});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        const url = `${ENDPOINT}/api/partner_customers`;
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: "FETCH_PARTNER_CUSTOMERS_FULFILLED",
                    payload: json,
                });
            })
            .catch(err => dispatch({
                type: "FETCH_PARTNER_CUSTOMERS_REJECTED",
                payload: err
            }));
    }
}

export function fetchTags() {
    return function (dispatch) {
        dispatch({type: "FETCH_TAGS_PENDING"});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        const url = `${ENDPOINT}/api/dictionary/tags`;
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: "FETCH_TAGS_FULFILLED",
                    payload: json.map(e => new Object({value: e, label: e, color: '#00B8D9'})),
                });
            })
            .catch(err => dispatch({
                type: "FETCH_TAGS_REJECTED",
                payload: err
            }));
    }
}

const stringSort = function (a, b) {
    if (a.shortName > b.shortName) {
        return 1;
    } else {
        return -1;
    }
};

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
            type: "REPORT_FILTERS_SET_DATE_FROM",
            payload: dateFrom
        });
    }
}

export function setDateTo(dateTo) {
    return function (dispatch) {
        dispatch({
            type: "REPORT_FILTERS_SET_DATE_TO",
            payload: dateTo
        });
    }
}

export function toggleSelectedPartnerAndProject(item) {
    return function (dispatch, getState) {
        let arr = getState().reportFilters.selectedPartners.slice();
        const index = arr.findIndex(a => a.project === item.projectId && a.ets === item.etsProject && a.customer === item.customerName);
        if (index !== -1) arr.splice(index, 1); else arr.push({
            project: item.projectId,
            ets: item.etsProject,
            customer: item.customerName
        });
        dispatch({type: "TOGGLE_SELECTION_SINGLE_PARTNER_AND_PROJECT", payload: arr})
    }
}

export function setSelectedPartnersAndProjects(filter) {
    return function (dispatch, getState) {
        const data = getState().partnersData.data;
        let arr = getState().reportFilters.selectedPartners ? getState().reportFilters.selectedPartners.slice() : [];
        data.filter((pr) => pr['customerName'].toLowerCase().includes(filter.toLowerCase()))
            .forEach((item) => {
                const index = arr.findIndex(a => a.project === item.projectId && a.ets === item.etsProject && a.customer === item.customerName);
                if (index === -1) {
                    arr.push({project: item.projectId, ets: item.etsProject, customer: item.customerName})
                }
            });

        dispatch({type: "TOGGLE_SELECTION_MULTIPLE_PARTNERS_AND_PROJECTS", payload: [...new Set(arr)]})
    }
}

export function clearPartnersAndProjects() {
    return function (dispatch) {
        dispatch({type: "CLEAR_SELECTION_PARTNERS_AND_PROJECTS"});
    }
}