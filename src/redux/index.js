import {combineReducers} from "redux";
import reportFiltersReducers from "./reducers/reportFiltersReducers";
import reportsReducer from './reducers/reportsReducers';
import etlFiltersReducers from "./reducers/etlFiltersReducers";
import appBarReducers from "./reducers/appBarReducers";
import licenseRequestReducers from "./reducers/licenseRequestReducers";
import userReducers from "./reducers/userReducers";

export default combineReducers({
    reportFilters: reportFiltersReducers,
    etlFilters: etlFiltersReducers,
    reports: reportsReducer,
    appBarState: appBarReducers,
    licenseRequestState: licenseRequestReducers,
    user: userReducers
});