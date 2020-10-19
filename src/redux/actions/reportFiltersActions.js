import {ENDPOINT, innerProjects} from "../../Const";



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
