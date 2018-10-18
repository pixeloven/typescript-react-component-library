// TODO remove these eventually
/* tslint:disable object-literal-sort-keys */
/* tslint:disable no-var-requires */
/* tslint:disable ordered-imports */
import webpack from "webpack";
import webpackNodeExternals from "webpack-node-externals";
import InterpolateHtmlPlugin from "react-dev-utils/InterpolateHtmlPlugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import Application from "../Application";
import env from "./env";
import files from "./files";

/**
 * Stringify all values so we can feed into Webpack DefinePlugin
 * @type Object
 */
const definePluginSettings = {
    "process.env": Object.keys(env).reduce((values, key) => {
            values[key] = JSON.stringify(env[key]);
            return values;
        }, {},
    ),
};

/**
 * Webpack uses `publicPath` to determine where the app is being served from.
 * It requires a trailing slash, or the file assets will get an incorrect path.
 */
const publicPath = Application.servedPath;

/**
 * publicUrl is just like `publicPath`, but we will provide it to our app
 * as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript
 * Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
 */
// const publicUrl = publicPath.slice(0, -1);

/**
 * Source maps are resource heavy and can cause out of memory issue for large source files.
 * We generate sourcemaps in production. This is slow but gives good results.
 * You can exclude the *.map files from the build during deployment.
 * @type {boolean}
 */
const shouldUseSourceMap = env.GENERATE_SOURCEMAP !== "false";

/**
 * Assert this just to be safe.
 */
if (env.NODE_ENV !== "production") {
    throw new Error("Production builds must have NODE_ENV=production.");
}

const serverConfig = {
    entry: [Application.serverEntryPoint],
    target: "node",
    externals: [webpackNodeExternals()],
    output: {
        path: Application.buildPath,
        filename: files.outputPattern.jsServer,
        publicPath,
    },
    // Don't attempt to continue if there are any errors.
    bail: true,
    devtool: shouldUseSourceMap ? "source-map" : false,
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: Application.srcPath,
                use: [
                    {
                        loader: require.resolve("ts-loader"),
                        options: {
                            // disable type checker - we will use it in fork plugin
                            transpileOnly: true,
                            configFile: Application.tsConfigProd,
                        },
                    },
                ],
            },
        ],
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
            tsconfig: Application.tsConfigProd,
            tslint: Application.tsLint,
        }),
    ],
    resolve: {
        alias: {

            // Support React Native Web
            // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
            "react-native": "react-native-web",
        },
        // These are the reasonable defaults supported by the Node ecosystem.
        // We also include JSX as a common component filename extension to support
        // some tools, although we do not recommend using it, see:
        // https://github.com/facebookincubator/create-react-app/issues/290
        // `web` extension prefixes have been added for better support
        // for React Native Web.
        extensions: [
            ".mjs",
            ".web.ts",
            ".ts",
            ".web.tsx",
            ".tsx",
            ".web.js",
            ".js",
            ".json",
            ".web.jsx",
            ".jsx",
        ],
        // This allows you to set a fallback for where Webpack should look for modules.
        // We placed these paths second because we want `node_modules` to "win"
        // if there are any conflicts. This matches Node resolution mechanism.
        // https://github.com/facebookincubator/create-react-app/issues/253
        modules: ["node_modules", Application.nodeModulesPath].concat(
            // It is guaranteed to exist because we tweak it in `env.js`
            env.NODE_PATH.split(path.delimiter).filter(Boolean),
        ),
        plugins: [
            // Prevents users from importing files from outside of src/ (or node_modules/).
            // This often causes confusion because we only process files within src/ with babel.
            // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
            // please link the files into your node_modules/ and let module-resolution kick in.
            // Make sure your source files are compiled, as they will not be processed in any way.
            new ModuleScopePlugin(Application.srcPath, [Application.packagePath]),
            new TsconfigPathsPlugin({ configFile: Application.tsConfigProd }),
        ],
    },
};

export default serverConfig;
