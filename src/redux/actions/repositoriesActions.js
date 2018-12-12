import {ENDPOINT} from "../../Const";

export function getAllRepositoriesData() {
    return function (dispatch) {
        dispatch({type: 'FETCH_ALL_REPOSITORIES_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        fetch(`${ENDPOINT}/api/hints/repositories`, obj)
            .then(res => res.json())
            .then(json => {
                    dispatch({
                        type: 'FETCH_ALL_REPOSITORIES_FULFILLED',
                        payload: json
                    })
                }
            )
            .catch(err => {
                console.log(err);
                dispatch({
                    type: 'FETCH_ALL_REPOSITORIES_FAILED',
                    payload: err
                });
            });
    }
}

export function postRepository(repository) {
    return function (dispatch) {
        dispatch({type: 'POST_REPOSITORY_PENDING'});
        const obj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'

            },
            body: JSON.stringify(repository)
        };
        fetch(`${ENDPOINT}/api/hints/repositories`, obj)
            .then(res => {
                console.log(res);
                dispatch({
                    type: 'POST_REPOSITORY_FULFILLED',
                    /*payload: json*/
                })
            })
            .catch(err => {
                console.log(err);
                dispatch({type: 'POST_REPOSITORY_FAILED'})
            })
    }
}