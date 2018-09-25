import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

// TODO add a build step to move semantic from import 'semantic-ui-css/semantic.min.css';
import "./assets/index.css";
import "./assets/semantic.css";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <App />,
  document.getElementById("root") as HTMLElement,
);
registerServiceWorker();
