import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Action, createStore } from "redux";
import App from "../shared/App";
import "./assets/App.css";
import "./assets/semantic.css";
import {register} from "./serviceWorkers";

const rootReducer = (state: string = "asdf", action: Action) => {
    switch (action.type) {
    default:
        return state;
    }
};

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: () => string;
    }
}

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

/**
 * When using hot module replacement we need to use the render method
 * otherwise errors may occur in development.
 */
const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod((
    <Provider store={store}>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById("root"));
register();
