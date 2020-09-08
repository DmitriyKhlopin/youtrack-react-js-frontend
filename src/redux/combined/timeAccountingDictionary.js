import {ENDPOINT} from "../../Const";
import {setError} from "./error";

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

async function read(stream) {
    const reader = stream.getReader();
    let v;
    while (true) {
        const {done, value} = await reader.read();

        if (done) {
            break;
        }
        console.log(`Получено ${value.length} байт`)
        console.log(value);
        v = value;
    }
    return v;
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
                switch (res.status) {
                    case 400: {
                        dispatch({type: 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_POST_FULFILLED'});
                        Promise.resolve(res.json()).then(json => dispatch(setError(json.value)));
                        break;
                    }
                    default: {
                        dispatch({type: 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_POST_FULFILLED'});
                        dispatch(fetchTimeAccountingDictionaryData());
                        break;
                    }
                }

            })
            /*.then(res => res.json())
            .then((json,res) => {
                console.log(json);
                console.log(res);
                switch (json.status) {
                    case 400: {
                        read(json.body).then(value => dispatch(setError(value)));
                        dispatch({type: 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_POST_FULFILLED'});
                        break;
                    }
                    default: {
                        dispatch({type: 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_POST_FULFILLED'});
                        dispatch(fetchTimeAccountingDictionaryData());
                        break;
                    }
                }

            })*/
            .catch(err => {
                console.log(err);

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


export default function reducer(state = {
    loading: false,
    posting: false,
    data: []
}, action) {
    switch (action.type) {
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_PENDING': {
            state = {
                ...state,
                loading: true
            }
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_FULFILLED': {
            state = {
                ...state,
                loading: false,
                data: action.payload
            };
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_FAILED': {
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_POST_PENDING': {
            state = {
                ...state,
                posting: true
            };
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_POST_FULFILLED': {
            state = {
                ...state,
                posting: false
            };
            break;
        }
        /*case 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_TOGGLE_PENDING': {
            state = {
                ...state,
                data: state.dictionaryData.map(i => i.id === action.payload ? {...i, loading: true} : i)
            };
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_TOGGLE_FULFILLED': {
            state = {
                ...state,
                dictionaryData: state.dictionaryData.map(i => i.id === action.payload ? {...i, loading: undefined, approved: !i.approved} : i)
            };
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_DELETE_PENDING': {
            state = {
                ...state,
                dictionaryData: state.dictionaryData.map(i => i.id === action.payload ? {...i, deleting: true} : i)
            };
            break;
        }
        case 'FETCH_TIME_ACCOUNTING_DICTIONARY_ITEM_DELETE_FULFILLED': {
            state = {
                ...state,
                dictionaryData: state.dictionaryData.filter(i => i.id !== action.payload)
            };
            break;
        }*/
    }
    return state;
};


export const timeAccountingDictionaryReducer = {timeAccountingDictionary: reducer}

export const selectTimeAccountingData = (state) => state.timeAccountingDictionary.data;
export const selectTimeAccountingDataIsLoading = (state) => state.timeAccountingDictionary.loading;
export const selectTimeAccountingDataIsPosting = (state) => state.timeAccountingDictionary.posting;
