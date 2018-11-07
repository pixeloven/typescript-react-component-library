/**
 * Bootstrap development env
 */
import "./boostrap/development";

/**
 * Import dependencies
 */
import chalk from "chalk";
import express, {NextFunction, Request, Response} from "express";
import path from "path";
import openBrowser from "react-dev-utils/openBrowser";
import WebpackDevServerUtils from "react-dev-utils/WebpackDevServerUtils";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import webpackClientConfig from "./app/configs/webpack/client";
import webpackServerConfig from "./app/configs/webpack/server";
import Env from "./app/libraries/Env";
import Logger from "./app/libraries/Logger";
import {handleError, sleep} from "./app/macros";

/**
 * Get WebpackDevServerUtils functions
 */
const {
    choosePort,
    prepareUrls,
} = WebpackDevServerUtils;

const PUBLIC_PATH = Env.config("PUBLIC_URL", "/");
const DEFAULT_HOST = Env.config("HOST", "localhost");
const DEFAULT_PROTOCOL = Env.config("PROTOCOL", "http");
const DEFAULT_PORT = parseInt(Env.config("PORT", "8080"), 10);

/**
 * @todo for some reason we get a bunch of uncaught exceptions in the browser after re-compile
 * @todo add error handling middleware to catch errors
 */
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
        Logger.info(`Attempting to bind to HOST: ${chalk.cyan(urls.localUrlForBrowser)}`);
        Logger.info(`If successful the application will launch automatically.`);
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

        /**
         * Setup webpack dev middleware
         * @todo can use the reporter to better handle errors in console (FORMATTING)
         * @todo Should replace the log so we can inject it into reporter
         */
        const webpackDevMiddlewareInstance = webpackDevMiddleware(combinedCompiler, {
            index: false,
            logLevel: "silent",
            publicPath: PUBLIC_PATH,
            reporter: (middlewareOptions, reporterOptions) => {
                if (reporterOptions.state) {
                    let message = "Compiled successfully.";
                    if (reporterOptions.stats) {
                        if (reporterOptions.stats.hasErrors()) {
                            message = "Failed to compile.";
                        } else if (reporterOptions.stats.hasWarnings()) {
                            message = "Compiled with warnings.";
                        }
                        const displayStats = (middlewareOptions.stats !== false);
                        if (displayStats) {
                            if (reporterOptions.stats.hasErrors()) {
                                Logger.error(reporterOptions.stats.toString(middlewareOptions.stats));
                            } else if (reporterOptions.stats.hasWarnings()) {
                                Logger.warn(reporterOptions.stats.toString(middlewareOptions.stats));
                            } else {
                                Logger.info(reporterOptions.stats.toString(middlewareOptions.stats));
                            }
                        }
                        Logger.info(message);
                    }
                } else {
                    Logger.info("Compiling...");
                }
            },
            serverSideRender: true,
            stats: "minimal",
        });
        app.use(webpackDevMiddlewareInstance);

        /**
         * Setup hot middleware for client & server
         */
        const clientCompiler = combinedCompiler.compilers.find(compiler => compiler.name === "client");
        if (clientCompiler) {
            app.use(webpackHotMiddleware(clientCompiler, {
                log: Logger.info,
            }));
        }
        app.use(webpackHotServerMiddleware(combinedCompiler));

        /**
         * Create error handler for server errors
         * @todo Should render a basic page with the same stack style as the dev-middleware
         */
        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            res.status(500).send(`<h1>Unexpected Error</h1><p>See console for more details.</p>`);
        });
        /**
         * Start express server on specific host and port
         */
        app.listen(PORT, DEFAULT_HOST, (error?: Error) => {
            if (error) {
                handleError(error);
            }
            Logger.info("Starting development server...");
            openBrowser(urls.localUrlForBrowser);
        });
    }).catch((error: Error) => {
        handleError(error);
    });
} catch (error) {
    handleError(error);
}
