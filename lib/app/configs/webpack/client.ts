import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OfflinePlugin from "offline-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import webpack from "webpack";
import {DevtoolModuleFilenameTemplateInfo, Node, Options, Output, Plugin} from "webpack";
import {getIfUtils, removeEmpty} from "webpack-config-utils";
import ManifestPlugin from "webpack-manifest-plugin";
import merge from "webpack-merge";
import Env from "../../libraries/Env";
import {resolvePath} from "../../macros";
import common from "./common";

// TODO need to run all copy files through webpack
// TODO Upgrade webpack for production see here
// TODO https://www.npmjs.com/package/tslint-loader
// TODO check updated webpack https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.prod.js
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
    filename: "static/js/[name].[hash:8].js",
    path: resolvePath("build/public", false),
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
    ifProduction(new MiniCssExtractPlugin({
        filename: "static/css/[name].[hash:8].css",
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
     * Generates html file for offline use
     *
     * @env production
     */
    ifProduction(new HtmlWebpackPlugin({
        filename: resolvePath("build/public/offline.html", false),
        inject: true,
        minify: {
            collapseWhitespace: true,
            keepClosingSlash: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
        },
        template: resolvePath("public/offline.html"),
    }), undefined),
    /**
     * Generate a service worker script that will precache, and keep up to date,
     * the HTML & assets that are part of the Webpack build.
     *
     * @env production
     */
    ifProduction(new OfflinePlugin({
        ServiceWorker: {
            events: true,
        },
        appShell: "/offline.html",
        caches: {
            additional: [
                "/offline.html",
                ":externals:",
            ],
            main: [
                ":rest:",
            ],
        },
        responseStrategy: "network-first", // 'cache-first' // TODO any way to do this and detect offline?
        safeToUseOptionalCaches: true,
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
