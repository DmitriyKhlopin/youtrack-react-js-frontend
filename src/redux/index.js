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

export default combineReducers({
    reportFilters: reportFiltersReducers,
    timeAccountingData: timeAccountingReducers,
    timeAccountingFilters: timeAccountingFiltersReducers,
    etlFilters: etlFiltersReducers,
    reports: reportsReducer,
    appBarState: appBarReducers,
    licenseRequestState: licenseRequestReducers,
    user: userReducers,
    actualTimeData: actualTimeReducers,
    possibleErrors: possibleErrorsReducers,
    drillDown: drillDownReducers
});