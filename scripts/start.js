"use strict";
exports.__esModule = true;
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
process.on("unhandledRejection", function (err) {
    throw err;
});
/**
 * Import dependencies
 */
var paths = require("config/paths");
var config = require("config/webpack.config.dev");
var createDevServerConfig = require("@config/webpackDevServer.config");
var chalk_1 = require("chalk");
var fs = require("fs-extra");
var checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
var clearConsole = require("react-dev-utils/clearConsole");
var openBrowser = require("react-dev-utils/openBrowser");
var WebpackDevServerUtils = require("react-dev-utils/WebpackDevServerUtils");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
require("../config/env");
/**
 * Get WebpackDevServerUtils functions
 */
var choosePort = WebpackDevServerUtils.choosePort, createCompiler = WebpackDevServerUtils.createCompiler, prepareProxy = WebpackDevServerUtils.prepareProxy, prepareUrls = WebpackDevServerUtils.prepareUrls;
/**
 * Get application settings
 */
var appName = paths.getAppName();
var proxySetting = paths.getProxySettings();
/**
 * Warn and crash if required files are missing
 */
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
}
var signals = ["SIGINT", "SIGTERM"];
/**
 * Set default constants
 */
var DEFAULT_PORT = parseInt(process.env.PORT, 10);
var DEFAULT_HOST = process.env.HOST;
var DEFAULT_PROTOCOL = process.env.HTTPS === "true" ? "https" : "http";
var useYarn = fs.existsSync(paths.yarnLockFile);
var isInteractive = process.stdout.isTTY;
/**
 * Notify user of host binding
 */
console.log(chalk_1["default"].cyan("Attempting to bind to HOST environment variable: " + chalk_1["default"].yellow(chalk_1["default"].bold(DEFAULT_HOST))));
console.log("If this was unintentional, check that you haven\"t mistakenly set it in your shell.");
console.log("Learn more here: " + chalk_1["default"].yellow("http://bit.ly/2mwWSwH"));
console.log();
/**
 * We attempt to use the default port but if it is busy, we offer the user to
 * run on a different port. `choosePort()` Promise resolves to the next free port.
 */
choosePort(DEFAULT_HOST, DEFAULT_PORT).then(function (port) {
    var urls = prepareUrls(DEFAULT_PROTOCOL, DEFAULT_HOST, port);
    var compiler = createCompiler(webpack, config, appName, urls, useYarn);
    var proxyConfig = prepareProxy(proxySetting, paths.appPublic);
    var serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig);
    var devServer = new WebpackDevServer(compiler, serverConfig);
    devServer.listen(port, DEFAULT_HOST, function (error) {
        if (error && error.message) {
            console.log(error.message);
        }
        if (isInteractive) {
            clearConsole();
        }
        console.log(chalk_1["default"].cyan("Starting the development server...\n"));
        openBrowser(urls.localUrlForBrowser);
    });
    signals.forEach(function (sig) {
        process.on(sig, function () {
            devServer.close();
            process.exit();
        });
    });
})["catch"](function (error) {
    if (error && error.message) {
        console.log(error.message);
    }
    process.exit(1);
});
