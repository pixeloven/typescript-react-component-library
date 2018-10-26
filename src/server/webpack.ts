import {NextFunction, Request, Response} from "express";
import {Stats} from "webpack";
import {renderer} from "./middleware";

interface RendererOptions {
    clientStats: Stats;
    serverStats: Stats; // TODO might still be able to register static server here
}

export default (options: RendererOptions) => {
    // TODO attach stats to req.files and then next.
    // TODO check if development...
    // TODO need another one for production to do this from ENV.
    // TODO how about other app stuff like health???
    return (req: Request, res: Response, next: NextFunction): void => {
        renderer(req, res, next);
    };
};
