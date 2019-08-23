import {ENDPOINT} from "../../Const";

export function fetchPartners() {
    return function (dispatch) {
        dispatch({type: 'FETCH_PARTNERS_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        fetch(`${ENDPOINT}/api/partners`, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_PARTNERS_PENDING_FULFILLED',
                    payload: json
                }))
            .catch(err => console.log(err));
    }
}
