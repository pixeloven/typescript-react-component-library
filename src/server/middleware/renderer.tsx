import {NextFunction, Request, Response} from "express";
import * as React from "react";
import {renderToNodeStream} from "react-dom/server";
import {StaticContext, StaticRouter} from "react-router";
import App from "../../shared/App";
import {Html} from "../views";

/**
 * Example middleware
 * @description Outputs a readable stream which means we could split up the render to faster first to byte
 * @param req
 * @param res
 * @param next
 */
export default (req: Request, res: Response, next: NextFunction): void => {
    // TODO map to promises
    // const matchedRoutes = routes.find((route: RouteProps) => !!matchPath(req.url, route));
    //
    // const promises = branch.map(() => {
    //     // Load the data for that route. Include match information
    //     // so route parameters can be passed through.
    //     // return store.dispatch(route.loadData(match))
    // });
    // Promise.all(promises).then(() => {
    //
    // }); // TODO catch as 500

    const staticContext: StaticContext = {}; // TODO use to find 404s
    const stream = renderToNodeStream(
        <Html files={req.files}>
            <StaticRouter location={req.url} context={staticContext}>
                <App />
            </StaticRouter>
        </Html>,
    );
    res.status(staticContext.statusCode || 200);
    stream.pipe(res);
    next();
};
