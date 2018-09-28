import {Request, Response} from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import {matchPath, RouteProps, StaticRouter} from "react-router-dom";
import App from "../../shared/App";
import routes from "../../shared/routes";
import {HtmlTemplate} from "../templates";

/**
 * DefaultController
 */
class DefaultController {

    /**
     * Catch all endpoint
     * @param req
     * @param res
     */
    public all = (req: Request, res: Response): void => {
        // TODO move somewhere else and rename this file as .ts
        const markup = renderToString(
            <StaticRouter location={req.url} context={{}}>
                <App />
            </StaticRouter>,
        );
        const activeRoute = routes.find((route: RouteProps) => !!matchPath(req.url, route));
        if (!activeRoute) {
            res.status(404).send(HtmlTemplate(markup));
        } else {
            res.status(200).send(HtmlTemplate(markup));
        }
    }
}

export default DefaultController;
