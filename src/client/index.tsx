import "raf/polyfill";

import App from "@shared/App";
import store from "@shared/store";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "../shared/styles/core/core.scss";

/**
 * Define root mounting point
 */
const root = document.getElementById("root");

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
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(<AppWrapper />, root);

/**
 * Register service workers
 */
if (process.env.NODE_ENV === "production") {
    OfflinePluginRuntime.install();
}
