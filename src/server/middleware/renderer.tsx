import {Html} from "@server/views";
import App from "@shared/App";
import {NextFunction, Request, Response} from "express";
import * as React from "react";
import {renderToString} from "react-dom/server";
import {StaticContext, StaticRouter} from "react-router";

/**
 * Example middleware
 * @description Outputs a readable stream which means we could split up the render to faster first to byte
 * @param req
 * @param res
 * @param next
 */
export default (req: Request, res: Response, next: NextFunction): void => {
    // TODO handle data fetching https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4
    const staticContext: StaticContext = {
        statusCode: 200,
    };
    const markup = renderToString(
        <Html files={req.files}>
            <StaticRouter location={req.url} context={staticContext}>
                <App />
            </StaticRouter>
        </Html>,
    );
    res.status(staticContext.statusCode || 200).send(markup);
    next();
};
