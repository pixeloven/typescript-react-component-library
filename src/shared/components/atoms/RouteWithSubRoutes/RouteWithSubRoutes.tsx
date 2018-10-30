import * as React from "react";
import {Route, RouteComponentProps, RouteProps} from "react-router-dom";

interface Props extends RouteProps {
    component: new (props: RouteComponentProps) => React.Component<RouteComponentProps>;
}

const RouteWithSubRoutes = ({ component: Component, exact, path, ...rest }: Props) => {
    const render = (props: RouteComponentProps) => (
        <Component {...props} {...rest} />
    );
    return (
        <Route
            exact={exact}
            path={path}
            render={render}
        />
    );
};

export default RouteWithSubRoutes;
