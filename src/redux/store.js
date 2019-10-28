import {applyMiddleware, createStore} from "redux";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import reducers from "./index";
import throttle from "lodash/throttle"

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            console.log('local state is null');
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log(e);
    }
}

const persistedState = loadState();
export const store = createStore(reducers, persistedState, applyMiddleware(promise, thunk, createLogger()));

store.subscribe(throttle(() => {

    saveState(store.getState());
}, 1000));