import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InterpolateHtmlPlugin from "react-dev-utils/InterpolateHtmlPlugin";
import webpack from "webpack";
import Application from "../../../../Application";
import {WatchMissingNodeModulesPlugin} from "../../../../libraries/ReactDevUtils";
import Env from "../../../env";

const plugins = [
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin(Env.config()),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
        inject: true,
        template: Application.publicEntryPoint,
    }),
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === "development") { ... }. See `./env.js`.
    new webpack.DefinePlugin(Application.definePluginSettings),
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
        tsconfig: Application.tsConfig,
        tslint: Application.tsLint,
        watch: Application.srcPath,
    }),
];

export default plugins;
