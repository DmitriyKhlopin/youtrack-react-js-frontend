import {combineReducers} from "redux";
import filtersReducers from "./reducers/filtersReducers";
import reportsReducer from './reducers/reportsReducers';

export default combineReducers({
    filters: filtersReducers,
    reports: reportsReducer,
});