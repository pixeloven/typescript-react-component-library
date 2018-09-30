import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../shared/App";
import {register} from "./serviceWorkers";

ReactDOM.hydrate((
    <BrowserRouter basename="/">
        <App />
    </BrowserRouter>
), document.getElementById("root"));
register();
