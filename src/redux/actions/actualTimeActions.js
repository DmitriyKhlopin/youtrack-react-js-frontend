import {ENDPOINT} from "../../Const";
import moment from "moment";

export function getData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_ACTUAL_TIME_DATA_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const state = getState();
        const selected = state.actualTimeData.selectedUsersData;
        console.log(state.actualTimeData.usersData);
        console.log(selected);
        const users = state.actualTimeData.usersData.filter(item => selected.includes(item.fullName));
        console.log(users);
        const email = users.map(item => item.email);
        console.log(email);
        const dateFrom = state.actualTimeData.dateFrom;
        const dateTo = state.actualTimeData.dateTo;
        const filters = '?emails=' + email.join(",") + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo;
        const url = `${ENDPOINT}/api/time/work/fact${filters}`;
        console.log(url);
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                    dispatch({
                        type: 'FETCH_ACTUAL_TIME_DATA_FULFILLED',
                        payload: json.map(item => {
                            const i = item;
                            i.date = moment(item.date).format('YYYY-MM-DD');
                            return i
                        })
                    })
                }
            )
            .catch(err => {
                console.log(err);
                dispatch({
                    type: 'FETCH_ACTUAL_TIME_DATA_FAILED',
                    payload: err
                });
            });
    }
}

export function getActualTimeUsers() {
    return function (dispatch) {
        dispatch({type: 'FETCH_ACTUAL_TIME_USERS_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        fetch(`${ENDPOINT}/api/users`, obj)
            .then(res => res.json())
            .then(json => {
                    dispatch({
                        type: 'FETCH_ACTUAL_TIME_USERS_FULFILLED',
                        payload: json
                    })
                }
            )
            .catch(err => {
                console.log(err);
                dispatch({
                    type: 'FETCH_ACTUAL_TIME_USERS_FAILED',
                    payload: err
                });
            });
    }
}

export function setActualTimeDateFrom(dateFrom) {
    return function (dispatch) {
        dispatch({
            type: "ACTUAL_TIME_SET_DATE_FROM",
            payload: dateFrom
        });
    }
}

export function setActualTimeDateTo(dateTo) {
    return function (dispatch) {
        dispatch({
            type: "ACTUAL_TIME_SET_DATE_TO",
            payload: dateTo
        });
    }
}

export function setCurrentlySelectedUsers(data) {
    return function (dispatch) {
        dispatch({
            type: "ACTUAL_TIME_SET_CURRENTLY_SELECTED_USERS",
            payload: data
        });
    }
}