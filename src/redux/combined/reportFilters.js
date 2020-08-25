export function setSelectedProjects(projects) {
    return function (dispatch) {
        dispatch({
            type: 'SET_SELECTED_PROJECTS',
            payload: projects
        })
    }
}

export default function reducer(state = {
    projects: []
}, action) {
    switch (action.type) {
        case 'SET_SELECTED_PROJECTS': {
            state = {
                ...state,
                projects: action.payload
            };
            break;
        }
    }
    return state;
};

export const reportFiltersReducer = {reportFilters2: reducer}
export const selectSelectedProjects = (state) => state.reportFilters2.projects;