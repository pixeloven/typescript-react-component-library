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

/**
 * Import dependencies
 */
// TODO remove react-dev-utils if possible
// TODO import configs from another class
/* tslint:disable no-var-requires */
const config = require("../config/webpack.config.dev");
const createDevServerConfig = require("../config/webpackDevServer.config");
/* tslint:enable no-var-requires */
import * as assert from "assert";
import chalk from "chalk";
import * as clearConsole from "react-dev-utils/clearConsole";
import * as openBrowser from "react-dev-utils/openBrowser";
import * as WebpackDevServerUtils from "react-dev-utils/WebpackDevServerUtils";
import * as webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";
import "../config/env";
import Application from "./Application";

/**
 * Get WebpackDevServerUtils functions
 */
const {
    choosePort,
    createCompiler,
    prepareProxy,
    prepareUrls,
} = WebpackDevServerUtils;

/**
 * Define signals for server termination
 */
type Signals = "SIGINT" | "SIGTERM";
const signals: Signals[] = ["SIGINT", "SIGTERM"];

/**
 * Set default constants
 * TODO move to config
 */
const DEFAULT_PORT = parseInt(process.env.PORT, 10);
const DEFAULT_HOST = process.env.HOST;
const DEFAULT_PROTOCOL = process.env.HTTPS === "true" ? "https" : "http";
const isInteractive = process.stdout.isTTY;

/**
 * Warn and crash if required files are missing
 */
try {
    // TODO can remove once we use this in our webpack setup
    assert(Application.clientEntryPoint);
    assert(Application.publicEntryPoint);

    /**
     * Get application settings
     * @throws Error if defined
     */
    const appName = Application.appName;
    const proxySettings = Application.proxySettings;
    const publicPath = Application.publicPath;
    const usingYarn = Application.usingYarn;

    /**
     * We attempt to use the default port but if it is busy, we offer the user to
     * run on a different port. `choosePort()` Promise resolves to the next free port.
     */
    choosePort(DEFAULT_HOST, DEFAULT_PORT).then((port: number) => {
        /**
         * Notify user of host binding
         */
        console.log(chalk.cyan(`Attempting to bind to HOST environment variable: ${chalk.yellow(chalk.bold(DEFAULT_HOST))}`));
        console.log(`If this was unintentional, check that you haven"t mistakenly set it in your shell.`);
        console.log(`Learn more here: ${chalk.yellow("http://bit.ly/2mwWSwH")}`);
        console.log();

        const urls = prepareUrls(DEFAULT_PROTOCOL, DEFAULT_HOST, port);
        const compiler = createCompiler(webpack, config, appName, urls, usingYarn);
        const proxyConfig = prepareProxy(proxySettings, publicPath);
        const serverConfig = createDevServerConfig(
            proxyConfig,
            urls.lanUrlForConfig,
        );
        const devServer = new WebpackDevServer(compiler, serverConfig);
        devServer.listen(port, DEFAULT_HOST, (error?: Error) => {
            if (error && error.message) {
                console.log(error.message);
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
            console.log(chalk.red(error.message));
            console.log();
        }
        process.exit(1);
    });

} catch (error) {
    console.log(chalk.red(error.message));
    console.log();
    process.exit(1);
}
