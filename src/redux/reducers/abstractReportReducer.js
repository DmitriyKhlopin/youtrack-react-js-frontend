export default function reducer(state = {
    data: {}
}, action) {
    switch (action.type) {
        case 'FETCH_REPORT_FULFILLED': {
            /*console.log(state);*/
            const d = state;
            d.data[action.id] = action.payload;
            state = {...d};
            break;
        }
    }
    /*console.log(state);*/
    return state;
};
