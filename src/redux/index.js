import {combineReducers} from "redux";
import filtersReducers from "./reducers/filtersReducers";

export default combineReducers({
    filters: filtersReducers,
});