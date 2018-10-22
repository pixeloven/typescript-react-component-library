import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import InterpolateHtmlPlugin from "react-dev-utils/InterpolateHtmlPlugin";
import webpack from "webpack";
import Application from "../../../../Application";
import Env from "../../../env";

// TODO might not need most of these since this is server side... however still need to figure out how to unify the env
const plugins = [
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin(Env.config()),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(Application.definePluginSettings),
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
];

export default plugins;
