import {Request, Response} from "express";
import * as React from "react";
import {renderToNodeStream} from "react-dom/server";
import {matchPath, RouteProps, StaticRouter} from "react-router";
import {Stats} from "webpack";
import App from "../shared/App";
import routes from "../shared/routes";
import {Html} from "./templates";

interface RendererProps {
    clientStats: Stats;
    serverStats: Stats;
}

export default (props: RendererProps) => (req: Request, res: Response): void => {
    const context = {};
    const activeRoute = routes.find((route: RouteProps) => !!matchPath(req.url, route));
    if (activeRoute) {
        // `<!doctype html>` add tp stream???
        renderToNodeStream(
            <Html>
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            </Html>,
        ).pipe(res);
    } else {
        res.status(404).send("O no we should be serving a 404!");
    }
};
