import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../shared/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.hydrate((
    <BrowserRouter basename="/">
        <App />
    </BrowserRouter>
), document.getElementById("root"));
registerServiceWorker();
