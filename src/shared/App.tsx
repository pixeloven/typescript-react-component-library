import * as React from "react";
import {Switch} from "react-router-dom";
import "./assets/App.css";
import "./assets/semantic.css";
import {SingleRoute} from "./components/atoms";
import {NoMatch} from "./components/pages";
import routes from "./routes";

class App extends React.Component {
    public render(): React.ReactNode {
        return (
            <Switch>
                {routes.map((props, index) => <SingleRoute key={index} {...props} />)}
                <SingleRoute key={routes.length} component={NoMatch}/>
            </Switch>
        );
    }
}

export default App;
