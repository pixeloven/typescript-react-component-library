import "raf/polyfill";

import App from "@shared/App";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Action, createStore } from "redux";
import "../shared/styles/core/core.scss";

/**
 * Define root mounting point
 */
const root = document.getElementById("root");

/**
 * Create root reducer
 * @param state
 * @param action
 *
 * @todo Move this to a new location
 */
const rootReducer = (state: string = "asdf", action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
};

/**
 * Setup redux dev tool
 */
const reduxDevToolExtension = () => {
    return ((w: Window) => {
        if (w && w.__REDUX_DEVTOOLS_EXTENSION__) {
            return w.__REDUX_DEVTOOLS_EXTENSION__();
        }
        return undefined;
    })(window || {});
};

/**
 * Setup store
 *
 * @todo Move this to a new location
 */
const store = createStore(rootReducer, reduxDevToolExtension());

const AppWrapper = () => (
    <Provider store={store}>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </Provider>
);

/**
 * When using hot module replacement we need to use the render method
 * otherwise errors may occur in development.
 */
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(<AppWrapper />, root);

/**
 * Register service workers
 */
if (process.env.NODE_ENV === "production") {
    OfflinePluginRuntime.install();
}
