import {subMonths} from "date-fns";

export function setSelectedProjects(payload) {
    return function (dispatch) {
        dispatch({
            type: 'SET_SELECTED_PROJECTS',
            payload: payload
        })
    }
}

export function setSelectedPartnerCustomers(payload) {
    return function (dispatch) {
        dispatch({
            type: 'SET_SELECTED_PARTNER_CUSTOMERS',
            payload: payload
        })
    }
}

export function setSelectedPriorities(payload) {
    return function (dispatch) {
        dispatch({
            type: 'SET_SELECTED_PRIORITIES',
            payload: payload
        })
    }
}

export function setSelectedTypes(payload) {
    return function (dispatch) {
        dispatch({
            type: 'SET_SELECTED_TYPES',
            payload: payload
        })
    }
}

export function setSelectedStates(payload) {
    return function (dispatch) {
        dispatch({
            type: 'SET_SELECTED_STATES',
            payload: payload
        })
    }
}

export function setSelectedTags(payload) {
    return function (dispatch) {
        dispatch({
            type: 'SET_SELECTED_TAGS',
            payload: payload
        })
    }
}

export function setFilterDateFrom(dateFrom) {
    return function (dispatch) {
        dispatch({
            type: "SET_FILTER_DATE_FROM",
            payload: dateFrom
        });
    }
}

export function setFilterDateTo(dateTo) {
    return function (dispatch) {
        dispatch({
            type: "SET_FILTER_DATE_TO",
            payload: dateTo
        });
    }
}

export default function reducer(state = {
    projects: [],
    partnerCustomers: [],
    priorities: [],
    types: [],
    states: [],
    dateFrom: subMonths(new Date(), 3),
    dateTo: new Date(),
    tags: []
}, action) {
    switch (action.type) {
        case 'SET_SELECTED_PROJECTS': {
            state = {
                ...state,
                projects: action.payload
            };
            break;
        }
        case 'SET_SELECTED_PARTNER_CUSTOMERS': {
            state = {
                ...state,
                partnerCustomers: action.payload
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
        case 'SET_SELECTED_STATES': {
            state = {
                ...state,
                states: action.payload
            };
            break;
        }
        case 'SET_SELECTED_TAGS': {
            state = {
                ...state,
                tags: action.payload
            };
            break;
        }
        case 'SET_SELECTED_PRIORITIES': {
            state = {
                ...state,
                priorities: action.payload
            };
            break;
        }
        case 'SET_FILTER_DATE_FROM': {
            state = {
                ...state,
                dateFrom: action.payload
            };
            break;
        }
        case 'SET_FILTER_DATE_TO': {
            state = {
                ...state,
                dateTo: action.payload
            };
            break;
        }
    }
    return state;
};

export const reportFiltersReducer = {reportFilters2: reducer}
export const selectSelectedProjects = (state) => state.reportFilters2.projects;
export const selectSelectedPriorities = (state) => state.reportFilters2.priorities;
export const selectSelectedPartnerCustomers = (state) => state.reportFilters2.partnerCustomers;
export const selectSelectedTypes = (state) => state.reportFilters2.types;
export const selectSelectedStates = (state) => state.reportFilters2.states;
export const selectSelectedTags = (state) => state.reportFilters2.tags;
export const selectDateFrom = (state) => state.reportFilters2.dateFrom;
export const selectDateTo = (state) => state.reportFilters2.dateTo;
