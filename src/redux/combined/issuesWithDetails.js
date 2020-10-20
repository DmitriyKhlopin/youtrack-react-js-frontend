import {ENDPOINT} from "../../Const";

export function getIssuesWithDetails() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_ISSUES_WITH_DETAILS_PENDING'});
        const state = getState();
        const projects = state.reportFilters2.projects.map(item => item.value);
        const priorities = state.reportFilters2.priorities.map(item => item.value);
        const states = state.reportFilters2.states.map(item => item.value);
        const types = state.reportFilters2.types.map(item => item.value);
        const customers = state.reportFilters2.partnerCustomers.map(item => item.value);
        const tags = state.reportFilters2.tags.map(item => item.value);
        const body = {
            "priorities": priorities,
            "tags": tags,
            "states": states,
            "detailedStates": [
                "Backlog 2ЛП"
            ],
            "types": types,
            "projects": projects,
            "customers": customers
        }
        const obj = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        };

        console.log(body);

        const url = `${ENDPOINT}/api/issues/detailed`;
        fetch(encodeURI(url), obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: 'FETCH_ISSUES_WITH_DETAILS_FULFILLED',
                    payload: json
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: 'FETCH_ISSUES_WITH_DETAILS_REJECTED',
                    payload: err
                });
            });
    }
}


export default function reducer(state = {
    fetching: false,
    fetched: false,
    issues: [],
}, action) {
    switch (action.type) {
        case 'FETCH_ISSUES_WITH_DETAILS_PENDING': {
            state = {
                ...state,
                fetching: true,
                fetched: false,
            };
            break;
        }
        case 'FETCH_ISSUES_WITH_DETAILS_REJECTED': {
            state = {
                ...state,
                fetching: false,
                issues: [],
            };
            break;
        }
        case 'FETCH_ISSUES_WITH_DETAILS_FULFILLED': {
            state = {
                ...state,
                fetching: false,
                fetched: true,
                issues: action.payload
            };
            break;
        }
    }
    return state;
};

export const issuesWithDetailsReducer = {issuesWithDetails: reducer}
export const selectIssuesWithDetailsData = (state) => state.issuesWithDetails.issues;
export const selectIssuesWithDetailsIsLoading = (state) => state.issuesWithDetails.fetching;
