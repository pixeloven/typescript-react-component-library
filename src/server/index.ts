import cors from "cors";
import express from "express";
import expressWinston from "express-winston";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import winston from "winston";
import webpackClientConfig from "../../scripts/app/configs/webpack/client";
import webpackServerConfig from "../../scripts/app/configs/webpack/server";
import {config} from "./config";
import {DefaultController} from "./controllers";

// https://github.com/webpack/webpack-dev-middleware/
// https://github.com/luangjokaj/react-ssr-boilerplate
// TODO rename templates views and use the above repo as an example... can just use .ejs and have just one
// TODO make it so you can build just the server and not client too

/**
 * Create express application
 * @type {Function}
 */
const app = express();
app.use(cors());

/**
 * Setup webpack hot module replacement for development or static file serving for prod
 */
if (process.env.NODE_ENV === "development") {
    const combinedCompiler = webpack([webpackClientConfig, webpackServerConfig]);
    const clientCompiler = combinedCompiler.compilers.find(compiler => compiler.name === "client");
    app.use(webpackDevMiddleware(combinedCompiler));
    if (clientCompiler) {
        app.use(webpackHotMiddleware(clientCompiler));
    }
    app.use(webpackHotServerMiddleware(combinedCompiler));
} else {
    /**
     * Setup express logger
     * TODO {json: true,colorize: true} for config
     */
    // TODO should setup a logger for prod and dev
    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console(),
        ],
    }));

    app.use("/public", express.static("build/public"));
}

/**
 * This defines a catch all route for serving all react pages
 */
const defaultController = new DefaultController();

/**
 * Register endpoints
 */
app.get("/health", defaultController.health);
app.get("*", defaultController.render);

/**
 * Start express server on specific host and port
 */
app.listen(config.CLIENT.PORT, config.CLIENT.HOST, () => {
    console.log(`Running on http://${config.CLIENT.HOST}:${config.CLIENT.PORT}`);
});
