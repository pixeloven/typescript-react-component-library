/**
 * Bootstrap development env
 */
import "./boostrap/development";

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

// TODO delete old start script
// Clean up config and move it into src?
// TODO fix tsConfig and tsLint one everything is in src
    // Missing: Fancy overlay withc clickable stack traces
// TODO need to fix build

/**
 * Get WebpackDevServerUtils functions
 */
const {
    choosePort,
    prepareUrls,
} = WebpackDevServerUtils;

const HOST = Env.config("HOST", "localhost");
const PROTOCOL = Env.config("PROTOCOL", "http");
const PORT = parseInt(Env.config("PORT", "8080"), 10);

Env.define("UV_THREADPOOL_SIZE", "128");

/**
 * We attempt to use the default port but if it is busy, we offer the user to
 * run on a different port. `choosePort()` Promise resolves to the next free port.
 */
choosePort(HOST, PORT).then((port: number) => {
// TODO need to differnetiate between build public path and public URL which should just be "/"
    const publicPath = Env.config("PUBLIC_URL", "/");
// TODO need to make it so that if server side change is made then hard refresh.
// TODO https://github.com/gaearon/react-hot-loader

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
        publicPath,
        serverSideRender: true,
    }));
    if (clientCompiler) {
        app.use(webpackHotMiddleware(clientCompiler));
    }
    app.use(webpackHotServerMiddleware(combinedCompiler));

    /**
     * Start express server on specific host and port
     */
    const urls = prepareUrls(PROTOCOL, HOST, port);
    app.listen(port, HOST, (error?: Error) => {
        if (error && error.message) {
            console.log(error.message);
        }
        console.log(chalk.cyan("\nStarting development server...\n"));
        openBrowser(urls.localUrlForBrowser);
    });
}).catch((error: Error) => {
    if (error && error.message) {
        console.log(chalk.red(error.message));
        console.log();
    }
    process.exit(1);
});
