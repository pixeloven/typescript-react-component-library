'use strict';

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

/**
 * Webpack uses `publicPath` to determine where the app is being served from.
 * It requires a trailing slash, or the file assets will get an incorrect path.
 */
const publicPath = paths.servedPath;
/**
 * publicUrl is just like `publicPath`, but we will provide it to our app
 * as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript
 * Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
 */
const publicUrl = publicPath.slice(0, -1);

/**
 * Source maps are resource heavy and can cause out of memory issue for large source files.
 * We generate sourcemaps in production. This is slow but gives good results.
 * You can exclude the *.map files from the build during deployment.
 * @type {boolean}
 */
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

/**
 * Get environment variables to inject into our app.
 * @type Object
 */
const env = getClientEnvironment(publicUrl);

/**
 * Assert this just to be safe.
 */
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = merge(commonConfig, {
    entry: [paths.clientEntryPointFile],
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: paths.appBuild,
        filename: paths.clientOutputFile,
        publicPath: publicPath,
    },
    // Don't attempt to continue if there are any errors.
    bail: true,
    devtool: shouldUseSourceMap ? 'source-map' : false,
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
        new webpack.DefinePlugin(env.stringified),
        new webpack.DefinePlugin({
            __isBrowser__: "false"
        }),
        // TODO we should remove this???
        new ExtractTextPlugin({
            filename: paths.cssFilename,
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
            tsconfig: paths.appTsProdConfig,
            tslint: paths.appTsLint,
        }),
    ],
});
