import {NextFunction, Request, Response} from "express";
import * as React from "react";
import {renderToNodeStream} from "react-dom/server";
import {matchPath, RouteProps, StaticRouter} from "react-router";
import App from "../../shared/App";
import routes from "../../shared/routes";
import {Html} from "../views";

/**
 * Example middleware
 * @param req
 * @param res
 * @param next
 */
export default (req: Request, res: Response, next: NextFunction): void => {
    const context = {};
    const activeRoute = routes.find((route: RouteProps) => !!matchPath(req.url, route));
    if (activeRoute) {
        // `<!doctype html>` add tp stream???
        renderToNodeStream(
            <Html files={req.files}>
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            </Html>,
        ).pipe(res);
    } else {
        res.status(404).send("O no we should be serving a 404!"); // TODO handle this in react and then pull back
    }
    // TODO what about next()???
    next();
};
