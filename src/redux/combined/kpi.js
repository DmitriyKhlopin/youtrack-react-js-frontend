import {ENDPOINT} from "../../Const";
import {customMap} from "../../HelperFunctions";
import {format} from "date-fns"

export function fetchKpiData() {
    return function (dispatch, getState) {
        dispatch({type: 'FETCH_KPI_PENDING'});
        const obj = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };
        const state = getState();
        const df = format(state.kpi.dateFrom, 'yyyy-MM-dd');
        const dt = format(state.kpi.dateTo, 'yyyy-MM-dd');
        const url1 = `${ENDPOINT}/api/kpi?mode=result&dateFrom=${df}&dateTo=${dt}`;
        const url2 = `${ENDPOINT}/api/kpi?mode=overall&dateFrom=${df}&dateTo=${dt}`;

        Promise.all([url1, url2].map(u => fetch(u, obj))).then(responses =>
            Promise.all(responses.map(res => res.json()))
        ).then(json => {
            console.log(json);
            dispatch({
                type: 'FETCH_KPI_FULFILLED',
                payload: json
            })
        });
    }
}

export function setKpiDateFrom(dateFrom) {
    return function (dispatch) {
        dispatch({
            type: "SET_KPI_DATE_FROM",
            payload: dateFrom
        });
    }
}

export function setKpiDateTo(dateTo) {
    return function (dispatch) {
        dispatch({
            type: "SET_KPI_DATE_TO",
            payload: dateTo
        });
    }
}


export default function reducer(state = {
    fetching: false,
    dateFrom: new Date(),
    dateTo: new Date(),
    kpiData: [],
    detailedData: [],
}, action) {
    switch (action.type) {
        case 'SET_KPI_DATE_FROM': {
            state = {
                ...state,
                dateFrom: action.payload
            };
            break;
        }
        case 'SET_KPI_DATE_TO': {
            state = {
                ...state,
                dateTo: action.payload
            };
            break;
        }
        case 'FETCH_KPI_PENDING': {
            state = {
                ...state,
                fetching: true
            };
            break;
        }
        case 'FETCH_KPI_REJECTED': {
            state = {
                ...state,
                fetching: false,
                error: action
            };
            break;
        }
        case 'FETCH_KPI_FULFILLED': {
            const data = action.payload[0];
            let solutionsRating = [];
            let clarificationRating = [];
            let postponementRating = [];
            let evaluationRating = [];
            let issueTypeRating = [];
            let priorityRating = [];
            let levelRating = [];
            let violationsRating = [];
            if (data && data !== null) {
                solutionsRating = customMap(data, 'solutionSum');
                clarificationRating = customMap(data, 'clarificationSum');
                postponementRating = customMap(data, 'postponementSum');
                evaluationRating = customMap(data, 'evaluationSum');
                issueTypeRating = customMap(data, 'issueTypeSum');
                priorityRating = customMap(data, 'prioritySum');
                levelRating = customMap(data, 'levelSum');
                violationsRating = customMap(data, 'violations');
            }

            let detailedData = [
                {name: 'Решения', data: solutionsRating},
                {name: 'Уточнения', data: clarificationRating},
                {name: 'Переносы', data: postponementRating},
                {name: 'Оценки', data: evaluationRating},
                {name: 'Типы запросов', data: issueTypeRating},
                {name: 'Приоритеты запросов', data: priorityRating},
                {name: 'Уровни решения', data: levelRating},
                {name: 'Нарушения', data: violationsRating},
            ];
            state = {
                ...state,
                fetching: false,
                kpiData: action.payload,
                detailedData: detailedData,
                fetched: true
            };
            break;
        }
    }
    return state;
};


export const kpiReducer = {kpi: reducer}
export const selectKpiIsFetching = (state) => state.kpi.fetching;
export const selectKpiDateFrom = (state) => state.kpi.dateFrom;
export const selectKpiDateTo = (state) => state.kpi.dateTo;
export const selectKpiData = (state) => state.kpi.kpiData[0];
export const selectKpiOverallData = (state) => state.kpi.kpiData[1];
export const selectKpiDetails = (state) => state.kpi.detailedData;