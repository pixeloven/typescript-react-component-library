/**
 * Bootstrap development env
 */
import "./boostrap/development";

/**
 * Import dependencies
 */
import assert from "assert";
import chalk from "chalk";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import Application from "./app/Application";
import WebpackDevelopmentConfig from "./app/configs/webpack.config.development";
import {
    clearConsole,
    openBrowser,
    WebpackDevServerUtils,
} from "./app/libraries/ReactDevUtils";
import WebpackDevServerConfig from "./app/libraries/WebpackDevServerConfig";

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
 */
const isInteractive = process.stdout.isTTY;

/**
 * Sleep application for a given time
 * @param milliseconds
 */
function sleep(milliseconds: number) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

/**
 * Warn and crash if required files are missing
 */
// TODO seems to re compile a few times right after server starts
try {
    // TODO can remove once we use this in our webpack setup
    assert(Application.clientEntryPoint);
    assert(Application.publicEntryPoint);

    /**
     * Get application settings
     * @throws Error if not defined
     */
    const appName = Application.appName;
    const proxySettings = Application.proxySettings;
    const publicPath = Application.publicPath;
    const srcPath = Application.srcPath;
    const usingYarn = Application.usingYarn;
    const server = Application.server("development");

    /**
     * We attempt to use the default port but if it is busy, we offer the user to
     * run on a different port. `choosePort()` Promise resolves to the next free port.
     */
    choosePort(server.host, server.port).then((port: number) => {
        /**
         * Notify user of host binding
         */
        console.log(chalk.cyan(`Attempting to bind to HOST environment variable: ${chalk.yellow(chalk.bold(server.host))}`));
        console.log();
        sleep(1000);

        // TODO rewrite all of this instead of importing react-utils
        const urls = prepareUrls(server.protocol, server.host, port);
        const compiler = createCompiler(webpack, WebpackDevelopmentConfig, appName, urls, usingYarn);
        const proxyConfig = prepareProxy(proxySettings, publicPath);
        const webpackDevServerConfg = new WebpackDevServerConfig(server, publicPath, srcPath);
        const serverConfig = webpackDevServerConfg.create(
            proxyConfig,
            urls.lanUrlForConfig,
        );
        const devServer = new WebpackDevServer(compiler, serverConfig);
        devServer.listen(port, server.host, (error?: Error) => {
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
