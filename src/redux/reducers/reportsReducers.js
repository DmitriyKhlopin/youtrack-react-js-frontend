export default function reducer(state = {
    sigmaData: {
        sigmaItems: [],
        sigma: 0,
        sigmaMaxX: 0,
        sigmaMaxY: 0
    }
    /*fetching: false,
    fetched: false,
    error: null,
    proj: [],
    projDefault: [],
    projSelected: []*/
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
    }
    return state;
};