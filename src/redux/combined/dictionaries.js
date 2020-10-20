import {ENDPOINT} from "../../Const";
import {stringSort} from "../../helper_functions/sorting";
import {customSort} from "../../HelperFunctions";

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

export function fetchProjects() {
    return function (dispatch) {
        dispatch({type: "FETCH_PROJECTS_DICTIONARY_PENDING"});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        const url = `${ENDPOINT}/api/dictionary/project/commercial`;
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: "FETCH_PROJECTS_DICTIONARY_FULFILLED",
                    payload: json.sort(stringSort)
                });
            })
            .catch(err => dispatch({
                type: "FETCH_PROJECTS_DICTIONARY_REJECTED",
                payload: err
            }));
    }
}

export function fetchPartnerCustomers() {
    return function (dispatch) {
        dispatch({type: "FETCH_PARTNER_CUSTOMERS_DICTIONARY_PENDING"});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        const url = `${ENDPOINT}/api/dictionary/partner_customers`;
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: "FETCH_PARTNER_CUSTOMERS_DICTIONARY_FULFILLED",
                    payload: json,
                });
            })
            .catch(err => dispatch({
                type: "FETCH_PARTNER_CUSTOMERS_DICTIONARY_REJECTED",
                payload: err
            }));
    }
}


function reducer(state = {
    projects: [],
    partnerCustomers: [],
    tags: [],
    fetching: false,
    error: undefined
}, action) {
    switch (action.type) {
        case 'FETCH_PROJECTS_DICTIONARY_PENDING': {
            state = {
                ...state,
                fetching: true
            };
            break;
        }
        case 'FETCH_PROJECTS_DICTIONARY_REJECTED': {
            state = {
                ...state,
                fetching: false,
                error: action
            };
            break;
        }
        case 'FETCH_PROJECTS_DICTIONARY_FULFILLED': {
            state = {
                ...state,
                fetching: false,
                projects: action.payload,
            };
            break;
        }
        case 'FETCH_PARTNER_CUSTOMERS_DICTIONARY_PENDING': {
            state = {
                ...state,
                fetching: true
            };
            break;
        }
        case 'FETCH_PARTNER_CUSTOMERS_DICTIONARY_REJECTED': {
            state = {
                ...state,
                fetching: false,
                error: action
            };
            break;
        }
        case 'FETCH_PARTNER_CUSTOMERS_DICTIONARY_FULFILLED': {
            state = {
                ...state,
                partnerCustomers: action.payload,
                fetching: false
            };
            break;
        }
        case 'FETCH_TAGS_FULFILLED': {
            state = {
                ...state,
                tags: action.payload,
                fetching: false
            };
            break;
        }
    }
    return state;
}

export const dictionariesReducer = {dictionaries: reducer}
export const selectProjects = (state) => state.dictionaries.projects;
export const selectPartnerCustomers = (state) => [...new Set(state.dictionaries.partnerCustomers
    .filter((item) => state.reportFilters2.projects.map(e => e.value).includes(item.project) && item.customer !== null)
    .map((item) => item.customer))].sort(customSort).map(e => new Object({value: e, label: e, color: '#00B8D9'}));

export const selectTags = (state) => state.dictionaries.tags;
