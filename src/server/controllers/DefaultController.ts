import {Request, Response} from "express";
import * as Renderer from "hypernova-client";
import * as devModePlugin from "hypernova-client/plugins/devModePlugin";
import {matchPath, RouteProps} from "react-router-dom";
import routes from "../../shared/routes";
import {HtmlTemplate} from "../templates";
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
        const activeRoute = routes.find((route: RouteProps) => !!matchPath(req.url, route));
        if (activeRoute) {
            const renderer = new Renderer({
                plugins: [
                    devModePlugin, // TODO need to make configurable
                ],
                url: `http://${this.config.RENDERER.HOST}:${this.config.RENDERER.HOST}/batch`,
            });
            const jobs = {
                Example: {
                    url: req.url,
                },
            };
            // todo need to failover if render fails
            renderer.render(jobs).then((html: string) => {
                res.status(200).send(HtmlTemplate(html));
            }).catch((error: Error) => {
                // TODO log error???
                // TODO render on the client side
                res.status(200).send(HtmlTemplate("CLIENT"));
            });
        } else {
            res.status(404).send(HtmlTemplate("404")); // TODO get 404 from template or ideally from react template
        }
    }

    /**
     * Health check up
     * @param req
     * @param res
     */
    public health = (req: Request, res: Response): void => {
        res.status(200).send("OK");
    }
}

export default DefaultController;
