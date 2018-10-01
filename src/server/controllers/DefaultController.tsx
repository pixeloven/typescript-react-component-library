import {Request, Response} from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import {matchPath, RouteProps, StaticRouter} from "react-router-dom";
import App from "../../shared/App";
import routes from "../../shared/routes";
import {HtmlTemplate} from "../templates";

import * as Renderer from "hypernova-client";
import * as devModePlugin from "hypernova-client/plugins/devModePlugin";
import Controller from "./Controller";
/**
 * DefaultController
 */
class DefaultController extends Controller {

    /**
     * Render from service
     * @param req
     * @param res
     */
    public render = (req: Request, res: Response): void => {
        const renderer = new Renderer({
            plugins: [
                devModePlugin, // TODO need to mamke configurable
            ],
            url: `http://${this.config.RENDERER.HOST}:${this.config.RENDERER.HOST}/batch`,
        });
        const jobs = {
            Example: { name: req.query.name || "Stranger" },
        };
        renderer.render(jobs).then(html => res.send(html));
    }

    /**
     * Catch all endpoint
     * @param req
     * @param res
     */
    public root = (req: Request, res: Response): void => {
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

    public health = (req: Request, res: Response): void => {
        res.status(200).send("OK");
    }
}

export default DefaultController;
