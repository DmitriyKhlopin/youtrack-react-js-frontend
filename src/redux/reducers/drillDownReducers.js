import moment from "moment";

export default function reducer(state = {
    drillDownOpen: false,
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
        case 'DRILLDOWN_DIALOG_OPEN': {
            state = {
                ...state,
                drillDownOpen: true
            };
            break;
        }
        case 'DRILLDOWN_DIALOG_CLOSE': {
            state = {
                ...state,
                drillDownOpen: false
            };
            break;
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