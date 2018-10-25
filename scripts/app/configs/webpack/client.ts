import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import SWPrecacheWebpackPlugin from "sw-precache-webpack-plugin";
import {DevtoolModuleFilenameTemplateInfo, Output, Plugin} from "webpack";
import webpack from "webpack";
import {getIfUtils, removeEmpty} from "webpack-config-utils";
import ManifestPlugin from "webpack-manifest-plugin";
import merge from "webpack-merge";
import Application from "../../Application";
import Env from "../env";
import files from "../files";
import common from "./common";

/**
 * Utility functions to help segment configuration based on environment
 */
const {ifProduction, ifDevelopment} = getIfUtils(Env.current);

/**
 * Webpack uses `publicPath` to determine where the app is being served from.
 * It requires a trailing slash, or the file assets will get an incorrect path.
 */
const publicPath = Env.config("PUBLIC_URL", "/");

/**
 * Describe source pathing in dev tools
 * @param info
 */
const devtoolModuleFilenameTemplate = (info: DevtoolModuleFilenameTemplateInfo) => {
    if (ifProduction()) {
        return path
            .relative(Application.srcPath, info.absoluteResourcePath)
            .replace(/\\/g, "/");
    }
    return path.resolve(info.absoluteResourcePath).replace(/\\/g, "/");
};

/**
 * Define entrypoint(s) for client
 */
const entry = removeEmpty([
    ifDevelopment("webpack-hot-middleware/client?reload=true", undefined),
    Application.clientEntryPoint,
]);

/**
 * @description Output instructions for client build
 */
const output: Output = {
    devtoolModuleFilenameTemplate,
    filename: files.outputPattern.js,
    path: `${Application.buildPath}/public/`,
    publicPath,
};

/**
 * @description Plugins for client specific builds
 */
const plugins: Plugin[] = removeEmpty([
    /**
     * Extract css to file
     * @env production
     */
    // TODO how can we keep the hash but also still server it form the server side???
    ifProduction(new MiniCssExtractPlugin({
        filename: files.outputPattern.css,
    }), undefined),
    /**
     * Generate a manifest file which contains a mapping of all asset filenames
     * to their corresponding output file so that tools can pick it up without
     * having to parse `index.html`.
     *
     * @env production
     */
    ifProduction(new ManifestPlugin({
        fileName: "asset-manifest.json",
    }), undefined),
    /**
     * Generate a service worker script that will precache, and keep up to date,
     * the HTML & assets that are part of the Webpack build.
     *
     * @env production
     */
    ifProduction(new SWPrecacheWebpackPlugin({
        // By default, a cache-busting query parameter is appended to requests
        // used to populate the caches, to ensure the responses are fresh.
        // If a URL is already hashed by Webpack, then there is no concern
        // about it being stale, and the cache-busting can be skipped.
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: "service-worker.js",
        logger: (message: string): void => {
            const totalPrecacheMsg = message.indexOf("Total precache size is") === 0;
            const skippingStaticResourceMsg = message.indexOf("Skipping static resource") === 0;
            if (!totalPrecacheMsg && !skippingStaticResourceMsg) {
                console.log(message);
            }
        },
        minify: true,
        // For unknown URLs, fallback to the index page
        navigateFallback: `${publicPath}index.html`,
        // Ignores URLs starting from /__ (useful for Firebase):
        // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
        navigateFallbackWhitelist: [/^(?!\/__).*/],
        // Don't precache sourcemaps (they're large) and build asset manifest:
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }), undefined),
    /**
     * This is necessary to emit hot updates (currently CSS only):
     *
     * @env development
     */
    ifDevelopment(new webpack.HotModuleReplacementPlugin(), undefined),
]);

/**
 * Client side configuration
 */
export default merge(common, {
    devtool: ifProduction("source-map", "cheap-module-source-map"), // TODO if prod should we even do this???
    entry,
    name: "client",
    output,
    plugins,
    target: "web",
});
