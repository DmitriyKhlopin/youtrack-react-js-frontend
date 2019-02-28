import {ENDPOINT} from '../../Const';

export function fetchIterations() {
    return function (dispatch) {
        dispatch({type: 'FETCH_ITERATIONS_PENDING'});
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
                    type: 'FETCH_ITERATIONS_FULFILLED',
                    payload: {
                        iterations: json.sort(stringSort)
                    }
                });
            })
            .catch(err => dispatch({
                type: 'FETCH_ITERATIONS_REJECTED',
                payload: err
            }));
    }
}

export function fetchYouTrackBuilds() {
    return function (dispatch) {
        dispatch({type: 'FETCH_YOUTRACK_BUILDS_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        /*const url = `${ENDPOINT}/api/tfs/iterations`;*/
        const url = `https://support.fsight.ru/api/admin/customFieldSettings/bundles/version/61-1/values?$top=-1&fields=$type,archived,assembleDate,avatarUrl,color(id),description,fullName,hasRunningJob,id,isResolved,issueRelatedGroup(icon),localizedName,login,name,ordinal,owner(id,login,ringId),releaseDate,released,ringId,teamForProject(ringId),usersCount`;
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: 'FETCH_YOUTRACK_BUILDS_FULFILLED',
                    payload: json
                });
            })
            .catch(err => dispatch({
                type: 'FETCH_YOUTRACK_BUILDS_REJECTED',
                payload: err
            }));
    }
}

export function fetchBuildsByIteration(iteration) {
    return function (dispatch) {
        dispatch({type: 'FETCH_BUILDS_BY_ITERATION_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                /*'Accept': 'application/json'*/
            }
        };
        const url = `${ENDPOINT}/api/tfs/builds?iteration=${encodeURIComponent(iteration)}`;
        fetch(url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: 'FETCH_BUILDS_BY_ITERATION_FULFILLED',
                    payload: {
                        builds: json.sort(stringSort)
                    }
                });
            })
            .catch(err => dispatch({
                type: 'FETCH_BUILDS_BY_ITERATION_REJECTED',
                payload: err
            }));
    }
}

export function getFixedByIterationAndBuild(iteration, build) {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_FIXED_BY_ITERATION_AND_BUILD_PENDING'});
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
                    type: 'FETCH_FIXED_BY_ITERATION_AND_BUILD_FULFILLED',
                    payload: {
                        items: json/*.sort(stringSort)*/
                    }
                });
            })
            .catch(err => dispatch({
                type: 'FETCH_FIXED_BY_ITERATION_AND_BUILD_REJECTED',
                payload: err
            }));
    }
}

export function checkIfBuildExists(iterationId, buildIds) {
    return function (dispatch, getState) {
        const state = getState();
        console.log(iterationId);
        console.log(buildIds);
        var versionPrefix = '';
        var versionSuffix = '';
        switch (state.fixedDefectsData.iterations[iterationId]) {
            case '\\P7\\PP9\\9.0': {
                versionPrefix = '9.0.';
                break;
            }
            case '\\P7\\PP9\\9.0\\1.0': {
                break;
            }
            case '\\P7\\PP9\\9.0\\1.0\\Update 1': {
                versionPrefix = '9.0.';
                versionSuffix = '.June';
                break;
            }
            case '\\P7\\PP9\\9.0\\1.0\\Update 1\\ZRN_brunch': {
                break;
            }
            case '\\P7\\PP9\\9.0\\1.0\\Update 2': {
                break;
            }
            case '\\P7\\PP9\\9.0\\1.0\\Update 2\\Additional': {
                break;
            }
            case '\\P7\\PP9\\9.0\\1.0\\Update 2\\Update TNT_Step1': {
                break;
            }
            case '\\P7\\PP9\\9.0\\1.0\\Update 2\\Update TNT_Step2': {
                break;
            }
            case '\\P7\\PP9\\9.0\\1.0\\Update 3': {
                break;
            }
        }
        const builds = buildIds.map((e) => `${versionPrefix}${state.fixedDefectsData.builds[e]}${versionSuffix}`);
        const existingBuilds = state.fixedDefectsData.youTrackBuilds.map(e => e.name);

        const absentBuilds = builds.filter(e => !existingBuilds.includes(e)).map(e => {
            return {build: e, isPosting: false, isPosted: false}
        });
        if (absentBuilds.length > 0) dispatch({type: 'SET_ABSENT_BUILDS', payload: absentBuilds})
    }
}


export function addBuild(build) {
    return function (dispatch, getState) {
        console.log(`sending request to backend with build ${build}`);
        const state = getState();
        var s = state.fixedDefectsData.absentBuilds;
        for (var i in s) {
            if (s[i].build === build) {
                s[i].isPosting = true;
                break;
            }
        }
        console.log(s);
        dispatch({
            type: 'POST_BUILD_PENDING',
            payload: s
        });
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

