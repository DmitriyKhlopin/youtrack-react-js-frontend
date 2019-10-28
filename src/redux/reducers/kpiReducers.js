import {customMap} from "../../HelperFunctions";

export default function reducer(state = {
    fetching: false,
    fetched: false,
    error: null,
    kpiData: [],
    detailedData: [],
    /*proj: [],
    projDefault: [],
    projSelected: [],
    dateFrom: moment().subtract(8, 'weeks').format('YYYY-MM-DD'),
    dateTo: moment().format('YYYY-MM-DD'),*/
}, action) {
    switch (action.type) {
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