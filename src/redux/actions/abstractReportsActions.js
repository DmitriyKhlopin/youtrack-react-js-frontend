import moment from 'moment';
import {ENDPOINT} from "../../Const";

export function fetchAbstractReportData(id, filters) {
    return function (dispatch) {
        dispatch({type: 'FETCH_REPORT_ENDING', id: id});
        const obj = {
            method: 'POST',
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json;charset=UTF-8'

            },
            body: JSON.stringify(filters)
        };
        fetch(`${ENDPOINT}/api/report/partner/${id}`, obj)
            .then(res => res.json())
            .then(json =>
                dispatch({
                    type: 'FETCH_REPORT_FULFILLED',
                    id: id,
                    payload: json
                }))
            .catch(err => console.log(err));
    }
}