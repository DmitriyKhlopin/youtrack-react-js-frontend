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

export function fetchTimeAccountingDictionaryData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_TIME_ACCOUNTING_DICTIONARY_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json; charset=utf-8'
            }
        };
        const state = getState();
        console.log(state);
        fetch(`${ENDPOINT}/api/time/dictionary`, obj)
            .then(res => res.json())
            .then(json => {
                    dispatch({
                        type: 'FETCH_TIME_ACCOUNTING_DICTIONARY_FULFILLED',
                        payload: json
                    })
                }
            )
            .catch(err => {
                console.log(err);
                dispatch({
                    type: 'FETCH_TIME_ACCOUNTING_DICTIONARY_FAILED',
                    payload: err
                });
            });
    }
}

export function postTimeAccountingDictionaryItem(data) {
    return function (dispatch) {
        dispatch({type: 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_POST_PENDING'});
        const obj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            body: JSON.stringify(data)
        };
        fetch(`${ENDPOINT}/api/time/dictionary`, obj)
            .then(res => {
                console.log(res);
                dispatch(fetchTimeAccountingDictionaryData());
                /*dispatch({
                    type: 'POST_REPOSITORY_FULFILLED',
                    /!*payload: json*!/
                })*/
            })
            .catch(err => {
                console.log(err);
                /*dispatch({type: 'POST_REPOSITORY_FAILED'})*/
            })
    }
}

export function toggleTimeAccountingDictionaryItem(id) {
    return function (dispatch) {
        dispatch({type: 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_TOGGLE_PENDING', payload: id});
        const obj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        };
        fetch(`${ENDPOINT}/api/time/dictionary/${id}`, obj)
            .then(res => {
                console.log(res);
                dispatch({
                    type: 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_TOGGLE_FULFILLED',
                    payload: id
                })
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_TOGGLE_FAILED',
                    payload: id
                })
            })
    }
}

export function deleteTimeAccountingDictionaryItem(id) {
    return function (dispatch) {
        dispatch({type: 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_DELETE_PENDING', payload: id});
        const obj = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        };
        fetch(`${ENDPOINT}/api/time/dictionary/${id}`, obj)
            .then(res => {
                console.log(res);
                dispatch({
                    type: 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_DELETE_FULFILLED',
                    payload: id
                })
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_DELETE_FAILED',
                    payload: id
                })
            })
    }
}