/* tslint:disable no-var-requires */
/**
 * Initialize env vars
 */
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";
process.env.HOST = process.env.HOST || "0.0.0.0";
process.env.PORT = process.env.PORT || "3000";

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on("unhandledRejection", err => {
    throw err;
});

import * as fs from "fs";
import "../config/env";

const chalk = require("chalk");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const clearConsole = require("react-dev-utils/clearConsole");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
const {
    choosePort,
    createCompiler,
    prepareProxy,
    prepareUrls,
} = require("react-dev-utils/WebpackDevServerUtils");
const openBrowser = require("react-dev-utils/openBrowser");
const paths = require("../config/paths");
const config = require("../config/webpack.config.dev");
const createDevServerConfig = require("../config/webpackDevServer.config");

/**
 * Warn and crash if required files are missing
 */
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
}

/**
 * Define signals for server termination
 */
type Signals = "SIGINT" | "SIGTERM";
const signals: Signals[] = ["SIGINT", "SIGTERM"];

/**
 * Set default constants
 */
const DEFAULT_PORT = parseInt(process.env.PORT, 10);
const DEFAULT_HOST = process.env.HOST;
const DEFAULT_PROTOCOL = process.env.HTTPS === "true" ? "https" : "http";
const useYarn = fs.existsSync(paths.yarnLockFile);
const isInteractive = process.stdout.isTTY;

// TODO should get this from env
const appName = require(paths.appPackageJson).name;
const proxySetting = require(paths.appPackageJson).proxy;

/**
 * Notify user of host binding
 */
console.log(chalk.cyan(`Attempting to bind to HOST environment variable: ${chalk.yellow(chalk.bold(DEFAULT_HOST))}`));
console.log(`If this was unintentional, check that you haven"t mistakenly set it in your shell.`);
console.log(`Learn more here: ${chalk.yellow("http://bit.ly/2mwWSwH")}`);
console.log();

/**
 * We attempt to use the default port but if it is busy, we offer the user to
 * run on a different port. `choosePort()` Promise resolves to the next free port.
 */
choosePort(DEFAULT_HOST, DEFAULT_PORT).then((port: string) => {
    const urls = prepareUrls(DEFAULT_PROTOCOL, DEFAULT_HOST, port);
    const compiler = createCompiler(webpack, config, appName, urls, useYarn);
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
    const serverConfig = createDevServerConfig(
        proxyConfig,
        urls.lanUrlForConfig,
    );
    const devServer = new WebpackDevServer(compiler, serverConfig);
    devServer.listen(port, DEFAULT_HOST, (errorMessage: string) => {
        if (errorMessage) {
            return console.log(errorMessage);
        }
        if (isInteractive) {
            clearConsole();
        }
        console.log(chalk.cyan("Starting the development server...\n"));
        openBrowser(urls.localUrlForBrowser);
    });
    signals.forEach(sig => {
        process.on(sig, () => {
            devServer.close();
            process.exit();
        });
    });
}).catch((error: Error) => {
    if (error && error.message) {
        console.log(error.message);
    }
    process.exit(1);
});
