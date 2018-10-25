import * as React from "react";
import {Switch} from "react-router-dom";
import {SingleRoute} from "./components/elements";
import {NoMatch} from "./components/pages";
import routes from "./routes";

// TODO https://github.com/diegohaz/arc/blob/master/src-example/components/App.js
// TODO template should be here not in pages
// TODO this should also be stateless
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
