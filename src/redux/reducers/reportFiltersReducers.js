import {innerProjects, licProjects} from "../../Const";
import moment from "moment";

export default function reducer(state = {
    fetching: false,
    fetched: false,
    error: null,
    proj: [],
    projDefault: [],
    projSelected: [],
    dateFrom: moment().subtract(8, 'weeks').format('YYYY-MM-DD'),
    dateTo: moment().format('YYYY-MM-DD'),
}, action) {
    switch (action.type) {
        case 'FETCH_PROJECTS_PENDING': {
            state = {
                ...state,
                fetching: true
            };
            break;
        }
        case 'FETCH_PROJECTS_REJECTED': {
            state = {
                ...state,
                fetching: false,
                error: action
            };
            break;
        }
        case 'FETCH_PROJECTS_FULFILLED': {
            state = {
                ...state,
                fetching: false,
                proj: action.payload.proj,
                projDefault: action.payload.projDefault,
                projSelected: action.payload.projDefault,
                fetched: true
            };
            break;
        }
        case 'REPORT_FILTERS_ADD_PROJECT_TO_SELECTED': {
            const pr = [...state.projSelected];
            pr.push(...state.proj.filter(item => item.shortName === action.payload));
            pr.sort(compare);
            state = {
                ...state,
                projSelected: pr
            };
            break;
        }
        case 'REPORT_FILTERS_REMOVE_PROJECT_FROM_SELECTED': {
            const pr = [...state.projSelected];
            const chipToDelete = pr.map(item => item.shortName).indexOf(action.payload);
            pr.splice(chipToDelete, 1);
            pr.sort(compare);
            state = {
                ...state,
                projSelected: pr
            };
            break;
        }
        case 'REPORT_FILTERS_SET_DATE_FROM': {
            state = {
                ...state,
                dateFrom: action.payload
            };
            break;
        }
        case 'REPORT_FILTERS_SET_DATE_TO': {
            state = {
                ...state,
                dateTo: action.payload
            };
            break;
        }
        case 'REPORT_FILTERS_SELECT_PROJECTS_BY_MODE': {
            switch (action.payload) {
                case 'PP': {
                    const pr = [...state.proj];
                    const ps = pr.filter(item => !innerProjects.includes(item.shortName));
                    console.log(ps);
                    state = {
                        ...state,
                        projSelected: ps
                    };
                    break;
                }
                case 'notPP': {
                    const pr = [...state.proj];
                    const ps = pr.filter(item => innerProjects.includes(item.shortName));
                    console.log(ps);
                    state = {
                        ...state,
                        projSelected: ps
                    };
                    break;
                }
                case 'LIC': {
                    const pr = [...state.proj];
                    const ps = pr.filter(item => licProjects.includes(item.shortName));
                    console.log(ps);
                    state = {
                        ...state,
                        projSelected: ps
                    };
                    break;
                }
                case 'ALL': {
                    const pr = [...state.proj];
                    state = {
                        ...state,
                        projSelected: pr
                    };
                    break;
                }
                case 'NONE': {
                    state = {
                        ...state,
                        projSelected: []
                    };
                    break;
                }

            }
        }
    }
    return state;
};

function compare(a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}