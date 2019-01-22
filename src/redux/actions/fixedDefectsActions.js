import {ENDPOINT} from "../../Const";

export function fetchIterations() {
    return function (dispatch) {
        dispatch({type: "FETCH_ITERATIONS_PENDING"});
        const obj = {
            method: 'GET',
            headers: {
                /*'Accept': 'application/json'*/
            }
        };

        const url = `${ENDPOINT}/api/tfs/iterations`;
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: "FETCH_ITERATIONS_FULFILLED",
                    payload: {
                        iterations: json.sort(stringSort)
                    }
                });
            })
            .catch(err => dispatch({
                type: "FETCH_ITERATIONS_REJECTED",
                payload: err
            }));
    }
}

export function fetchBuildsByIteration(iteration) {
    return function (dispatch) {
        dispatch({type: "FETCH_BUILDS_BY_ITERATION_PENDING"});
        const obj = {
            method: 'GET',
            headers: {
                /*'Accept': 'application/json'*/
            }
        };

        const url = `${ENDPOINT}/api/tfs/builds?iteration=${encodeURIComponent(iteration)}`;
        console.log(url);
        /*console.log(`${ENDPOINT}/api/tfs/builds?iteration=${encodeURIComponent(iteration)}`);*/
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: "FETCH_BUILDS_BY_ITERATION_FULFILLED",
                    payload: {
                        builds: json.sort(stringSort)
                    }
                });
            })
            .catch(err => dispatch({
                type: "FETCH_BUILDS_BY_ITERATION_REJECTED",
                payload: err
            }));
    }
}

export function getFixedByIterationAndBuild(iteration, build) {
    return function (dispatch) {
        dispatch({type: "FETCH_FIXED_BY_ITERATION_AND_BUILD_PENDING"});
        const obj = {
            method: 'GET',
            headers: {
                /*'Accept': 'application/json'*/
            }
        };
        console.log(iteration);
        console.log(build);

        const url = `${ENDPOINT}/api/tfs?action=fixed&iteration=${encodeURIComponent(iteration)}&build=${encodeURIComponent(build)}`;
        console.log(url);
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: "FETCH_FIXED_BY_ITERATION_AND_BUILD_FULFILLED",
                    payload: {
                        items: json/*.sort(stringSort)*/
                    }
                });
            })
            .catch(err => dispatch({
                type: "FETCH_FIXED_BY_ITERATION_AND_BUILD_REJECTED",
                payload: err
            }));
    }
}

export function sendItemToYouTrack(changeRequestId) {
    return function (dispatch) {
        dispatch({type: "SEND_ITEM_TO_YOUTRACK_PENDING"});
        const obj = {
            method: 'GET',
            headers: {
                /*'Accept': 'application/json'*/
            }
        };
        console.log(changeRequestId);
        const url = `${ENDPOINT}/api/tfs?action=postChangeRequest&changeRequestId=${changeRequestId}`;
        console.log(url);
        fetch(url, obj)
            /*.then(res => res.json())*/
            .then(res => res.text())
            .then(res => {
                dispatch({
                    type: "SEND_ITEM_TO_YOUTRACK_FULFILLED",
                    payload: {
                        youTrackId: res
                    }
                });
            })
            .catch(err => dispatch({
                type: "SEND_ITEM_TO_YOUTRACK_REJECTED",
                payload: err
            }));
    }
}

const stringSort = function (a, b) {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }
    // a должно быть равным b
    return 0;
};

