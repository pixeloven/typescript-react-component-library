import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";
import SWPrecacheWebpackPlugin from "sw-precache-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import webpack from "webpack";
import {DevtoolModuleFilenameTemplateInfo, Node, Options, Output, Plugin} from "webpack";
import {getIfUtils, removeEmpty} from "webpack-config-utils";
import ManifestPlugin from "webpack-manifest-plugin";
import merge from "webpack-merge";
import Env from "../../libraries/Env";
import {resolvePath} from "../../macros";
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
            .relative(resolvePath("src"), info.absoluteResourcePath)
            .replace(/\\/g, "/");
    }
    return path.resolve(info.absoluteResourcePath).replace(/\\/g, "/");
};

/**
 * Define entrypoint(s) for client
 */
const entry = removeEmpty([
    ifDevelopment("webpack-hot-middleware/client?reload=true", undefined),
    resolvePath("src/client/index.tsx"),
]);

/**
 * @description Some libraries import Node modules but don"t use them in the browser.
 * Tell Webpack to provide empty mocks for them so importing them works.
 */
const node: Node = {
    child_process: "empty",
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
};

/**
 * Define build optimization options
 */
const optimization: Options.Optimization = {
    minimize: ifProduction(),
    minimizer: ifProduction([
        /**
         * Minify the code JavaScript
         *
         * @env production
         */
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // TODO should we do this in prod??
            uglifyOptions: {
                compress: {
                    comparisons: false,
                    warnings: false,
                },
                output: {
                    ascii_only: true,
                    comments: false,
                },
            },
        }),
        new OptimizeCSSAssetsPlugin(),
    ], []),
};

/**
 * @description Output instructions for client build
 */
const output: Output = {
    devtoolModuleFilenameTemplate,
    filename: "static/js/[name].js",
    path: resolvePath("build/public"),
    publicPath,
};

/**
 * @description Plugins for client specific builds
 */
const plugins: Plugin[] = removeEmpty([
    /**
     * Define environmental variables for application
     *
     * @env all
     */
    new webpack.EnvironmentPlugin({
        NODE_ENV: ifProduction("production", "development"),
    }),
    /**
     * Extract css to file
     * @env production
     */
    // TODO minify for prod
    ifProduction(new MiniCssExtractPlugin({
        filename: "static/css/[name].css",
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
        navigateFallback: `${publicPath}index.html`, // TODO what should this be???
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
    devtool: ifProduction("source-map", "eval-source-map"), // TODO if prod should we even do this???
    entry,
    name: "client",
    node,
    optimization,
    output,
    plugins,
    target: "web",
});
