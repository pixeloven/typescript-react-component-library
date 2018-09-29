import * as React from "react";
import {Route, RouteComponentProps, RouteProps} from "react-router-dom";

interface Props extends RouteProps {
    key: Optional<number>;
    component: new (props: RouteComponentProps) => React.Component<RouteComponentProps>;
}

const SingleRoute = ({ key, path, exact, component: Component, ...rest }: Props) => {
    const render = (props: RouteComponentProps) => (
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
