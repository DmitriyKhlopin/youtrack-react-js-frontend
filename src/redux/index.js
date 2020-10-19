import {combineReducers} from "redux";
import reportFiltersReducers from "./reducers/reportFiltersReducers";
import reportsReducer from './reducers/reportsReducers';
import etlFiltersReducers from "./reducers/etlFiltersReducers";
import licenseRequestReducers from "./reducers/licenseRequestReducers";
import userReducers from "./reducers/userReducers";
import timeAccountingFiltersReducers from "./reducers/timeAccountingFiltersReducers";
import timeAccountingReducers, {timeAccountingReducer} from "./reducers/timeAccountingReducers";
import actualTimeReducers from "./reducers/actualTimeReducers";
import possibleErrorsReducers from "./reducers/possibleErrorsReducers";
import drillDownReducers from "./reducers/drillDownReducers";
import kpiFiltersReducers from "./reducers/kpiFiltersReducers";
import kpiReducers from "./reducers/kpiReducers";
import repositoriesReducers from "./reducers/repositoriesReducers";
import fixedDefectsReducers from "./reducers/fixedDefectsReducers";
import workDurationReducers from "./reducers/workDurationReducers";
import highPriorityIssuesReducers from "./reducers/highPriorityIssuesReducers";
import partnersReducers from "./reducers/partnersReducers";
import abstractReportReducers from "./reducers/abstractReportReducer";
import {mainDialogReducer} from "./combined/mainDialog";
import {navigationReducer} from "./combined/navigation";
import {appBarReducer} from "./combined/appBar";
import {kpiReducer} from "./combined/kpi";
import {timeAccountingDictionaryReducer} from "./combined/timeAccountingDictionary";
import {dictionariesReducer} from "./combined/dictionaries";
import {reportFiltersReducer} from "./combined/reportFilters";
import {errorReducer} from "./combined/error";
import {sigmaReducer} from "./combined/sigmaReport";
import {dynamicsReducer} from "./combined/dynamicsReport";
import {createdOnWeekByPartnersReducer} from "./combined/createdOnWeekByPartners";

export default combineReducers({
    reportFilters: reportFiltersReducers,
    kpiFilters: kpiFiltersReducers,
    /*timeAccountingData: timeAccountingReducers,*/
    timeAccountingFilters: timeAccountingFiltersReducers,
    etlFilters: etlFiltersReducers,
    reports: reportsReducer,
    kpi: kpiReducers,

    licenseRequestState: licenseRequestReducers,
    user: userReducers,
    actualTimeData: actualTimeReducers,
    possibleErrors: possibleErrorsReducers,
    drillDown: drillDownReducers,
    repositoriesData: repositoriesReducers,
    fixedDefectsData: fixedDefectsReducers,
    workDurationData: workDurationReducers,
    highPriorityIssuesData: highPriorityIssuesReducers,
    partnersData: partnersReducers,
    abstractReportData: abstractReportReducers,
    ...mainDialogReducer,
    ...navigationReducer,
    ...appBarReducer,
    ...kpiReducer,
    ...timeAccountingDictionaryReducer,
    ...timeAccountingReducer,
    ...dictionariesReducer,
    ...reportFiltersReducer,
    ...errorReducer,
    ...sigmaReducer,
    ...dynamicsReducer,
    ...createdOnWeekByPartnersReducer
});
