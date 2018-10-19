/**
 * Register classes here
 */
export { default as WatchMissingNodeModulesPlugin } from "./WatchMissingNodeModulesPlugin";

// TODO rewrite these in typescript and/or find out if they are needed in webpack 4
import clearConsole from "react-dev-utils/clearConsole";
import errorOverlayMiddleware from "react-dev-utils/errorOverlayMiddleware";
import ignoredFiles from "react-dev-utils/ignoredFiles";
import InterpolateHtmlPlugin from "react-dev-utils/InterpolateHtmlPlugin";
import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";
import noopServiceWorkerMiddleware from "react-dev-utils/noopServiceWorkerMiddleware";
import openBrowser from "react-dev-utils/openBrowser";
import WebpackDevServerUtils from "react-dev-utils/WebpackDevServerUtils";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

export {
    errorOverlayMiddleware,
    ignoredFiles,
    noopServiceWorkerMiddleware,
    clearConsole,
    openBrowser,
    WebpackDevServerUtils,
    InterpolateHtmlPlugin,
    ModuleScopePlugin,
    TsconfigPathsPlugin,
};
