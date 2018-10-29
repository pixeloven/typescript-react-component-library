import "core-js/es6/map";
import "core-js/es6/set";
import "raf/polyfill";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Action, createStore } from "redux";
import App from "../shared/App";
import {register} from "./serviceWorkers";

import "../shared/components/styles/core/index.scss";

const rootReducer = (state: string = "asdf", action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
};

/**
 * Setup store
 */
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

/**
 * Wrap application with container, router and store
 */
const AppWrapper = () => (
    <Provider store={store}>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </Provider>
);
const HotAppWrapper = hot(module)(AppWrapper);

/**
 * When using hot module replacement we need to use the render method
 * otherwise errors may occur in development.
 */
const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(<HotAppWrapper />, document.getElementById("root"));

/**
 * Register service workers
 */
register();
