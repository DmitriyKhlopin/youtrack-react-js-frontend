export default function reducer(state = {
/*    sigmaData: {
        sigmaItems: [],
        sigma: 0,
        sigmaMaxX: 0,
        sigmaMaxY: 0
    },*/
    aggregatedIssuesByPartner: [],
    aggregatedTimeAccountingByProjectType: []
}, action) {
    switch (action.type) {
        case 'FETCH_DYNAMICS_REPORT_FULFILLED': {
            /*console.log(action.payload);*/
            state = {
                ...state,
                dynamicsData: action.payload
            };
            break;
        }
/*        case 'FETCH_SIGMA_REPORT_FULFILLED': {
            state = {
                ...state,
                sigmaData: action.payload
            };
            break;
        }*/
        case 'FETCH_CREATED_BY_PARTNER_ON_WEEK_REPORT_FULFILLED': {
            state = {
                ...state,
                aggregatedIssuesByPartner: action.payload
            };
            break;
        }
        case 'FETCH_SPENT_TIME_GROUPED_BY_PROJECT_TYPE_FULFILLED': {
            state = {
                ...state,
                aggregatedTimeAccountingByProjectType: action.payload
            };
            break;
        }
    }
    return state;
};
