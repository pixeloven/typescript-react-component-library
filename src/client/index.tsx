import "raf/polyfill";

import App from "@shared/App";
import rootReducer from "@shared/store/rootReducer";
import rootSaga from "@shared/store/rootSaga";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import "../shared/styles/core/core.scss";

/**
 * Define root mounting point
 */
const root = document.getElementById("root");

/**
 * Setup redux dev tool
 */
const reduxDevToolExtension = () => {
    return ((w: Window) => {
        if (w && w.devToolsExtension) {
            return w.devToolsExtension();
        }
        return () => undefined;
    })(window || {});
};

/**
 * Setup store
 *
 * @todo Move this to a new location
 */
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(sagaMiddleware),
        reduxDevToolExtension(),
    ),
);
sagaMiddleware.run(rootSaga);

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

/**
 * When using hot module replacement we need to use the render method
 * otherwise errors may occur in development.
 */
const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(<AppWrapper />, root);

/**
 * Register service workers
 */
if (process.env.NODE_ENV === "production") {
    OfflinePluginRuntime.install();
}
