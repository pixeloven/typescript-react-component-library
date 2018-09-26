import * as React from "react";
import { Route, Switch } from "react-router-dom";
import "./assets/App.css";
import {Blog, Home} from "./components/pages";

class App extends React.Component {
    public render(): React.ReactNode {
        return (
            <Switch>
                <Route exact={true} path="/" component={Home}/>
                <Route path="/blog" component={Blog}/>
            </Switch>
        );
    }
}

export default App;
