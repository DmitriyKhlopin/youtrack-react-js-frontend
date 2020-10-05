import {TYPES_DICTIONARY} from "../../Const";

export function setSelectedProjects(projects) {
    return function (dispatch) {
        dispatch({
            type: 'SET_SELECTED_PROJECTS',
            payload: projects
        })
    }
}

export function setSelectedTypes(types) {
    return function (dispatch) {
        dispatch({
            type: 'SET_SELECTED_TYPES',
            payload: types
        })
    }
}

export default function reducer(state = {
    projects: [],
    types: []
}, action) {
    switch (action.type) {
        case 'SET_SELECTED_PROJECTS': {
            state = {
                ...state,
                projects: action.payload
            };
            break;
        }
        case 'SET_SELECTED_TYPES': {
            state = {
                ...state,
                types: action.payload
            };
            break;
        }
    }
    return state;
};

export const reportFiltersReducer = {reportFilters2: reducer}
export const selectSelectedProjects = (state) => state.reportFilters2.projects;
export const selectSelectedTypes = (state) => state.reportFilters2.types;
