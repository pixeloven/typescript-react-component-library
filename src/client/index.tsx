import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../shared/App";
import "./assets/App.css";
import "./assets/semantic.css";
import {register} from "./serviceWorkers";

/**
 * When using hot module replacement we need to use the render method
 * Otherwise erros may occur in development.
 */
const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod((
    <BrowserRouter basename="/">
        <App />
    </BrowserRouter>
), document.getElementById("root"));
register();
