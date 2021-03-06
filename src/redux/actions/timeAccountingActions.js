import {ENDPOINT} from "../../Const";

export function fetchTimeAccountingData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_TIME_ACCOUNTING_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const state = getState();
        console.log(state);
        const dateFrom = state.timeAccountingFilters.dateFrom;
        const dateTo = state.timeAccountingFilters.dateTo;
        const filters = '?dateFrom=' + dateFrom + '&dateTo=' + dateTo;
        fetch(`${ENDPOINT}/api/time${filters}`, obj)
            .then(res => res.json())
            .then(json => {
                    dispatch({
                        type: 'FETCH_TIME_ACCOUNTING_FULFILLED',
                        payload: json
                    })
                }
            )
            .catch(err => {
                console.log(err);
                dispatch({
                    type: 'FETCH_TIME_ACCOUNTING_FAILED',
                    payload: err
                });
            });
    }
}
