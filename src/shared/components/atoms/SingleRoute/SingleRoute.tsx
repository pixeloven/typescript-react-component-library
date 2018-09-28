import * as React from "react";
import {Route, RouteComponentProps, RouteProps} from "react-router-dom";

interface Props extends RouteProps {
    [key: string]: any;
    component: new (props: any) => React.Component<RouteComponentProps>;
}

const SingleRoute = ({ key, path, exact, component: Component, ...rest }: Props) => {
    const render = (props: any) => (
        <Component {...props} {...rest} />
    );
    return (
        <Route
            key={key}
            path={path}
            exact={exact}
            render={render}
        />
    );
};

export default SingleRoute;
