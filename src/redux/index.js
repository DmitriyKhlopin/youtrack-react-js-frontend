import {combineReducers} from "redux";
import reportFiltersReducers from "./reducers/reportFiltersReducers";
import reportsReducer from './reducers/reportsReducers';
import etlFiltersReducers from "./reducers/etlFiltersReducers";
import appBarReducers from "./reducers/appBarReducers";
import licenseRequestReducers from "./reducers/licenseRequestReducers";
import userReducers from "./reducers/userReducers";
import timeAccountingFiltersReducers from "./reducers/timeAccountingFiltersReducers";
import timeAccountingReducers from "./reducers/timeAccountingReducers";
import actualTimeReducers from "./reducers/actualTimeReducers";
import possibleErrorsReducers from "./reducers/possibleErrorsReducers";
import drillDownReducers from "./reducers/drillDownReducers";
import kpiFiltersReducers from "./reducers/kpiFiltersReducers";
import kpiReducers from "./reducers/kpiReducers";
import repositoriesReducers from "./reducers/repositoriesReducers";
import fixedDefectsReducers from "./reducers/fixedDefectsReducers";

export default combineReducers({
    reportFilters: reportFiltersReducers,
    kpiFilters: kpiFiltersReducers,
    timeAccountingData: timeAccountingReducers,
    timeAccountingFilters: timeAccountingFiltersReducers,
    etlFilters: etlFiltersReducers,
    reports: reportsReducer,
    kpi: kpiReducers,
    appBarState: appBarReducers,
    licenseRequestState: licenseRequestReducers,
    user: userReducers,
    actualTimeData: actualTimeReducers,
    possibleErrors: possibleErrorsReducers,
    drillDown: drillDownReducers,
    repositoriesData: repositoriesReducers,
    fixedDefectsData: fixedDefectsReducers
});
