export default function reducer(state = {
    sigmaData: {
        sigmaItems: [],
        sigma: 0,
        sigmaMaxX: 0,
        sigmaMaxY: 0
    },
    aggregatedIssuesByPartner: [],
    aggregatedTimeAccountingByProjectType: []
}, action) {
    switch (action.type) {
        case 'FETCH_REPORT_DYNAMICS_FULFILLED': {
            /*console.log(action.payload);*/
            state = {
                ...state,
                dynamicsData: action.payload
            };
            break;
        }
        case 'FETCH_REPORT_SIGMA_FULFILLED': {
            state = {
                ...state,
                sigmaData: action.payload
            };
            break;
        }
        case 'FETCH_REPORT_ISSUES_FROM_PARTNERS_OVER_LAST_WEEK_FULFILLED': {
            state = {
                ...state,
                aggregatedIssuesByPartner: action.payload
            };
            break;
        }
        case 'FETCH_REPORT_TIME_ACCOUNTING_EXTENDED_GROUPED_FULFILLED': {
            state = {
                ...state,
                aggregatedTimeAccountingByProjectType: action.payload
            };
            break;
        }
    }
    return state;
};