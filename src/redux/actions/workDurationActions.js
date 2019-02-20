import {ENDPOINT} from "../../Const";

export function getWorkDuration(projects) {
    return function (dispatch) {
        dispatch({type: "FETCH_WORK_DURATION_PENDING"});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        console.log(projects.join());
        const url = `${ENDPOINT}/api/work_duration?projectShortName=${projects.join()}`;
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: "FETCH_WORK_DURATION_FULFILLED",
                    payload: {
                        durationItems: json,
                    }
                });
            })
            .catch(err => dispatch({
                type: "FETCH_WORK_DURATION_REJECTED",
                payload: err
            }));
    }
}
