import {Request, Response} from "express";
import * as React from "react";
import { renderToNodeStream } from "react-dom/server";
import {matchPath, RouteProps, StaticRouter} from "react-router-dom";
import App from "../../shared/App";
import routes from "../../shared/routes";
import {Html} from "../templates";

/**
 * DefaultController
 */
class DefaultController {

    /**
     * Health check up
     * @param req
     * @param res
     */
    public health = (req: Request, res: Response): void => {
        res.status(200).send("OK");
    }

    /**
     * Catch all endpoint
     * @param req
     * @param res
     */
    public render = (req: Request, res: Response): void => {
        // TODO need to handle 404s
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
    }
}

export default DefaultController;
