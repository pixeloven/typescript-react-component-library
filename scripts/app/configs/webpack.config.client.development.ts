/* tslint:disable object-literal-sort-keys */
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack, {DevtoolModuleFilenameTemplateInfo} from "webpack";
import Application from "../Application";
import {
    InterpolateHtmlPlugin,
    WatchMissingNodeModulesPlugin,
} from "../libraries/ReactDevUtils";
import Env from "./env";
import resolve from "./webpack/common/resolve";
import {
    catchAllRule,
    scssRule,
    staticFileRule,
    typeScriptRule,

} from "./webpack/common/rules";

/**
 * Stringify all values so we can feed into Webpack DefinePlugin
 * @type Object
 */
const env = Env.config();
const definePluginSettings = {
    "process.env": Object.keys(env).reduce((values, key) => {
            values[key] = JSON.stringify(env[key]);
            return values;
        }, {},
    ),
};

const clientConfig = {
    devtool: Application.sourceMapType,
    entry: [
        // Include an alternative client for WebpackDevServer. A client"s job is to
        // connect to WebpackDevServer by a socket and get notified about changes.
        // When you save a file, the client will either apply hot updates (in case
        // of CSS changes), or refresh the page (in case of JS changes). When you
        // make a syntax error, this client will display a syntax error overlay.
        // Note: instead of the default WebpackDevServer client, we use a custom one
        // to bring better experience for Create React App users. You can replace
        // the line below with these two lines if you prefer the stock client:
        // require.resolve("webpack-dev-server/client") + "?/",
        // require.resolve("webpack/hot/dev-server"),
        require.resolve("react-dev-utils/webpackHotDevClient"),
        // Finally, this is your app"s code:
        Application.clientEntryPoint,
        // We include the app code last so that if there is a runtime error during
        // initialization, it doesn"t blow up the WebpackDevServer client, and
        // changing JS code would still trigger a refresh.
    ],
    output: {
        pathinfo: true,
        filename: "static/js/bundle.js",
        chunkFilename: "static/js/[name].chunk.js",
        publicPath: "/",
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: (info: DevtoolModuleFilenameTemplateInfo) =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
    },
    resolve,
    module: {
        strictExportPresence: true,
        rules: [
            // javaScriptSourceMapRule,
            {
                oneOf: [
                    staticFileRule,
                    // javaScriptRule,
                    typeScriptRule,
                    scssRule,
                    catchAllRule,
                ],
            },
        ],
    },
    plugins: [
        // Makes some environment variables available in index.html.
        // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        // In development, this will be an empty string.
        new InterpolateHtmlPlugin(env),
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: Application.publicEntryPoint,
        }),
        // Add module names to factory functions so they appear in browser profiler.
        new webpack.NamedModulesPlugin(),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === "development") { ... }. See `./env.js`.
        new webpack.DefinePlugin(definePluginSettings),
        // This is necessary to emit hot updates (currently CSS only):
        new webpack.HotModuleReplacementPlugin(),
        // Watcher doesn"t work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        // See https://github.com/facebookincubator/create-react-app/issues/240
        new CaseSensitivePathsPlugin(),
        // If you require a missing module and then `npm install` it, you still have
        // to restart the development server for Webpack to discover it. This plugin
        // makes the discovery automatic so you don"t have to restart.
        // See https://github.com/facebookincubator/create-react-app/issues/186
        new WatchMissingNodeModulesPlugin(Application.nodeModulesPath),
        // Moment.js is an extremely popular library that bundles large locale files
        // by default due to how Webpack interprets its code. This is a practical
        // solution that requires the user to opt into importing specific locales.
        // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        // You can remove this if you don"t use Moment.js:
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // Perform type checking and linting in a separate process to speed up compilation
        new ForkTsCheckerWebpackPlugin({
            async: false,
            watch: Application.srcPath,
            tsconfig: Application.tsConfig,
            tslint: Application.tsLint,
        }),
    ],
    // Some libraries import Node modules but don"t use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        child_process: "empty",
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty",
    },
    // Turn off performance hints during development because we don"t do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
        hints: false,
    },
};

export default clientConfig;
