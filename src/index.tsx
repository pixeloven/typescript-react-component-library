import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./assets/index.css";
import "./assets/semantic.css";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render((
    <BrowserRouter basename="/">
        <App />
    </BrowserRouter>
), document.getElementById("root"));
registerServiceWorker();
