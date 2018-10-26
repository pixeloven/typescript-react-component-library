/**
 * Bootstrap development env
 */
import "./boostrap/development";

/**
 * Import dependencies
 */
import chalk from "chalk";
import express from "express";
import path from "path";
import openBrowser from "react-dev-utils/openBrowser";
import WebpackDevServerUtils from "react-dev-utils/WebpackDevServerUtils";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import Env from "./app/configs/env";
import webpackClientConfig from "./app/configs/webpack/client";
import webpackServerConfig from "./app/configs/webpack/server";
import {handleError, sleep} from "./app/helpers";

/**
 * Get WebpackDevServerUtils functions
 */
const {
    choosePort,
    prepareUrls,
} = WebpackDevServerUtils;

// TODO should rename to PUBLIC_PATH - document as "/" or "/public" etc
// TODO add DOMAIN to combine to form PUBLIC_URL??
const PUBLIC_PATH = Env.config("PUBLIC_URL", "/");
const DEFAULT_HOST = Env.config("HOST", "localhost");
const DEFAULT_PROTOCOL = Env.config("PROTOCOL", "http");
const DEFAULT_PORT = parseInt(Env.config("PORT", "8080"), 10);

// TODO need to make it so that if server side change is made then hard refresh.
// TODO missing fancy create-react-app error handling
try {
    /**
     * We attempt to use the default port but if it is busy, we offer the user to
     * run on a different port. `choosePort()` Promise resolves to the next free port.
     */
    choosePort(DEFAULT_HOST, DEFAULT_PORT).then((PORT: number) => {

        /**
         * Notify user of host binding
         */
        const urls = prepareUrls(DEFAULT_PROTOCOL, DEFAULT_HOST, PORT);
        console.info(chalk.green(`Attempting to bind to HOST: ${chalk.white(urls.localUrlForBrowser)}`));
        sleep(3000);

        /**
         * Create express application
         * @type {Function}
         */
        const app = express();
        app.use(express.static(path.resolve(process.cwd(), "public")));

        /**
         * Setup webpack hot module replacement for development
         */
        const combinedCompiler = webpack([webpackClientConfig, webpackServerConfig]);
        const clientCompiler = combinedCompiler.compilers.find(compiler => compiler.name === "client");
        app.use(webpackDevMiddleware(combinedCompiler, {
            publicPath: PUBLIC_PATH,
            serverSideRender: true,
        }));
        if (clientCompiler) {
            app.use(webpackHotMiddleware(clientCompiler));
        }
        app.use(webpackHotServerMiddleware(combinedCompiler));

        /**
         * Start express server on specific host and port
         */
        app.listen(PORT, DEFAULT_HOST, (error?: Error) => {
            if (error) {
                handleError(error);
            }
            console.info(chalk.green("Starting development server...\n"));
            openBrowser(urls.localUrlForBrowser);
        });
    }).catch((error: Error) => {
        handleError(error);
    });
} catch (error) {
    handleError(error);
}
