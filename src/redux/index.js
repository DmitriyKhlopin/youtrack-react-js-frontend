import {combineReducers} from "redux";
import filtersReducers from "./reducers/filtersReducers";
import reportsReducer from './reducers/reportsReducers';
import etlFiltersReducers from "./reducers/etlFiltersReducers";

export default combineReducers({
    filters: filtersReducers,
    etlFilters: etlFiltersReducers,
    reports: reportsReducer,
});