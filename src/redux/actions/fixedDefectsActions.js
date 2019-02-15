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
    return function (dispatch, getState) {
        dispatch({type: "FETCH_FIXED_BY_ITERATION_AND_BUILD_PENDING"});
        const state = getState();
        const obj = {
            method: 'GET',
            headers: {
                /*'Accept': 'application/json'*/
            }
        };
        const builds = build.map((e) => state.fixedDefectsData.builds[e]);

        const url = `${ENDPOINT}/api/tfs?action=fixed&iteration=${encodeURIComponent(iteration)}&build=${encodeURIComponent(builds.toString())}`;
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

export function clearWorkItems() {
    return function (dispatch) {
        dispatch({type: 'CLEAR_WORK_ITEMS'});
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

