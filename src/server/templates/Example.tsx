import * as React from "react";
import {StaticRouter} from "react-router";
import App from "../../shared/App";

interface Props {
    url: string;
}

function Example({url}: Props) {
    return (
        <StaticRouter location={url} context={{}}>
            <App />
        </StaticRouter>
    );
}

export default Example;
