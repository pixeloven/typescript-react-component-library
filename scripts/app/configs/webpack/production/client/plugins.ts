import ExtractTextPlugin from "extract-text-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InterpolateHtmlPlugin from "react-dev-utils/InterpolateHtmlPlugin";
import SWPrecacheWebpackPlugin from "sw-precache-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import webpack from "webpack";
import ManifestPlugin from "webpack-manifest-plugin";
import Application from "../../../../Application";
import Env from "../../../env";
import files from "../../../files";

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
const publicUrl = publicPath.slice(0, -1);

const plugins = [
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin(Env.config()),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
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
        template: Application.publicEntryPoint,
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(Application.definePluginSettings),
    // Minify the code.
    new UglifyJsPlugin({
        // Enable file caching
        cache: true,
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        sourceMap: Env.config("GENERATE_SOURCE_MAP") !== "false",
        uglifyOptions: {
            compress: {
                // Disabled because of an issue with Uglify breaking seemingly valid code:
                // https://github.com/facebook/create-react-app/issues/2376
                // Pending further investigation:
                // https://github.com/mishoo/UglifyJS2/issues/2011
                comparisons: false,
                ecma: 5,
                warnings: false,
            },
            mangle: {
                safari10: true,
            },
            output: {
                // Turned on because emoji and regex is not minified properly using default
                // https://github.com/facebook/create-react-app/issues/2488
                ascii_only: true,
                comments: false,
                ecma: 5,
            },
            parse: {
                // we want uglify-js to parse ecma 8 code. However we want it to output
                // ecma 5 compliant code, to avoid issues with older browsers, this is
                // whey we put `ecma: 5` to the compress and output section
                // https://github.com/facebook/create-react-app/pull/4234
                ecma: 8,
            },
        },
    }), // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
        filename: files.outputPattern.css,
    }),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
        fileName: "asset-manifest.json",
    }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
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
        navigateFallback: publicUrl + "/index.html",
        // Ignores URLs starting from /__ (useful for Firebase):
        // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
        navigateFallbackWhitelist: [/^(?!\/__).*/],
        // Don't precache sourcemaps (they're large) and build asset manifest:
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
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
