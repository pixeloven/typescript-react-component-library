import {NextFunction, Request, Response} from "express";
import {Stats} from "webpack";
import {renderer} from "./middleware";

interface RendererOptions {
    clientStats: Stats;
    serverStats: Stats;
}

/**
 * Webpack Dev server
 * @param options
 */
export default (options: RendererOptions) => {

    // TODO might still be able to register static server here and routes
    /**
     * Register client settings
     * @description Currently CSS is not emitted and is therefore inline. This means we don't yet need to reference it here.
     *
     * @todo hanle more than one CSS or JS file
     * @todo Support code splitting
     * @todo Support vendor JS splitting
     */
    return (req: Request, res: Response, next: NextFunction): void => {
        if (options.clientStats.hash) {
            const hash = options.clientStats.hash.substring(0, 8);
            req.files = {
                js: [`static/js/main.${hash}.js`],
            };
        }
        renderer(req, res, next);
    };
};
