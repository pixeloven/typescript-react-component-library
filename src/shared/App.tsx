import * as React from "react";
import {Helmet} from "react-helmet";
import {Switch} from "react-router-dom";
import {Route} from "./components/atoms";
import routes from "./routes";

// TODO https://github.com/diegohaz/arc/blob/master/src-example/components/App.js
// TODO template should be here not in pages
// TODO this should also be stateless
class App extends React.Component {
    public render(): React.ReactNode {
        const mappedRoutes = routes.map((route, index) => (
            <Route key={index} {...route} />
        ));
        return (
            <React.Fragment>
                <Helmet
                    titleTemplate="%s | React App"
                />
                <Switch>
                    {mappedRoutes}
                </Switch>
            </React.Fragment>
        );
    }
}

export default App;
