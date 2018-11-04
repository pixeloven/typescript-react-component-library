import {Route} from "@shared/components/atoms";
import routes from "@shared/routes";
import * as React from "react";
import {Helmet} from "react-helmet";
import {Switch} from "react-router-dom";

/**
 * Wrap application with router and implement react helmet
 */
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
