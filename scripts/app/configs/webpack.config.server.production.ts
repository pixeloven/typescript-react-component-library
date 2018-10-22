import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import InterpolateHtmlPlugin from "react-dev-utils/InterpolateHtmlPlugin";
import webpack, {Configuration, Module} from "webpack";
import webpackNodeExternals from "webpack-node-externals";
import Application from "../Application";
import Env from "./env";
import files from "./files";
import resolve from "./webpack/common/resolve";
import {
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

/**
 * Source maps are resource heavy and can cause out of memory issue for large source files.
 * We generate sourcemaps in production. This is slow but gives good results.
 * You can exclude the *.map files from the build during deployment.
 * @type {boolean}
 */
const shouldUseSourceMap = Env.config("GENERATE_SOURCE_MAP") !== "false";

/**
 * Assert this just to be safe.
 */
if (Env.current !== "production") {
    throw new Error("Production builds must have NODE_ENV=production.");
}

const module: Module = {
    rules: [typeScriptRule],
    strictExportPresence: true,
};

const serverConfig: Configuration = {
    bail: true,
    devtool: shouldUseSourceMap ? "source-map" : false,
    entry: [Application.serverEntryPoint],
    externals: [webpackNodeExternals()],
    module,
    output: {
        filename: files.outputPattern.jsServer,
        path: Application.buildPath,
        publicPath: Application.servedPath,
    },
    plugins: [
        // Makes some environment variables available in index.html.
        // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        // In production, it will be an empty string unless you specify "homepage"
        // in `package.json`, in which case it will be the pathname of that URL.
        new InterpolateHtmlPlugin(env.raw),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
        // It is absolutely essential that NODE_ENV was set to production here.
        // Otherwise React will be compiled in the very slow development mode.
        new webpack.DefinePlugin(definePluginSettings),
        new webpack.DefinePlugin({
            __isBrowser__: "false",
        }),
        // Moment.js is an extremely popular library that bundles large locale files
        // by default due to how Webpack interprets its code. This is a practical
        // solution that requires the user to opt into importing specific locales.
        // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        // You can remove this if you don't use Moment.js:
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // Perform type checking and linting in a separate process to speed up compilation
        new ForkTsCheckerWebpackPlugin({
            async: false,
            tsconfig: Application.tsConfig,
            tslint: Application.tsLint,
        }),
    ],
    resolve,
    target: "node",
};

export default serverConfig;
