import {combineReducers} from "redux";
import reportFiltersReducers from "./reducers/reportFiltersReducers";
import reportsReducer from './reducers/reportsReducers';
import etlFiltersReducers from "./reducers/etlFiltersReducers";
import appBarReducers from "./reducers/appBarReducers";
import licenseRequestReducers from "./reducers/licenseRequestReducers";
import userReducers from "./reducers/userReducers";
import timeAccountingFiltersReducers from "./reducers/timeAccountingFiltersReducers";
import timeAccountingReducers from "./reducers/timeAccountingReducers";

export default combineReducers({
    reportFilters: reportFiltersReducers,
    timeAccountingData: timeAccountingReducers,
    timeAccountingFilters: timeAccountingFiltersReducers,
    etlFilters: etlFiltersReducers,
    reports: reportsReducer,
    appBarState: appBarReducers,
    licenseRequestState: licenseRequestReducers,
    user: userReducers
});