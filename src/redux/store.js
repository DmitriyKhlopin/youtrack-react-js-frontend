import {applyMiddleware, createStore} from "redux";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import reducers from "./index";

export default createStore(reducers, applyMiddleware(promise(), thunk, createLogger()));
