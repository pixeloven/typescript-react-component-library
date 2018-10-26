import autoprefixer from "autoprefixer";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";
import TimeFixPlugin from "time-fix-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import webpack, {Configuration, Module, Node, Options, Plugin, Resolve, RuleSetRule} from "webpack";
import {getIfUtils, removeEmpty} from "webpack-config-utils";
import Env from "../../Env";
import {resolvePath} from "../../macros";

/**
 * Utility functions to help segment configuration based on environment
 */
const {ifProduction, ifDevelopment} = getIfUtils(Env.current);

/**
 * Post CSS fixes
 */
const postCssPlugin = () => [
    require("postcss-flexbugs-fixes"),
    autoprefixer({
        browsers: [
            ">1%",
            "last 4 versions",
            "Firefox ESR",
            "not ie < 9", // React doesn"t support IE8 anyway
        ],
        flexbox: "no-2009",
    }),
];

/**
 * All other files that aren't caught by the other loaders will go through this one.
 * @description "file" loader makes sure those assets get served by WebpackDevServer.
 * When you `import` an asset, you get its (virtual) filename.
 * In production, they would get copied to the `build` folder.
 * This loader doesn"t use a "test" so it will catch all modules
 * that fall through the other loaders.
 */
const catchAllRule = {
    exclude: [/\.(js|jsx|mjs)$/, /\.(ts|tsx)$/, /\.html$/, /\.json$/],
    loader: require.resolve("file-loader"),
    options: {
        name: "[name].[hash:8].[ext]",
        outputPath: "static/media/", // TODO config
    },
};

/**
 * Handle css/scss
 */
// TODO do we need source maps here?
const scssRule: RuleSetRule = {
    test: /\.(scss|sass|css)$/i,
    use: removeEmpty([
        ifProduction(MiniCssExtractPlugin.loader),
        ifDevelopment({loader: "style-loader"}),
        {loader: "css-loader"},
        {
            loader: "postcss-loader",
            options: {
                ident: "postcss",
                plugins: postCssPlugin,
            },
        },
        {loader: "sass-loader"},
    ]),
};

/**
 * Define rule for static assets
 * @description "url" loader works like "file" loader except that it embeds assets
 * smaller than specified limit in bytes as data URLs to avoid requests.
 */
const staticFileRule: RuleSetRule = {
    loader: require.resolve("url-loader"),
    options: {
        limit: 10000,
        name: "static/media/[name].[hash:8].[ext]", // TODO is this needed I don't think so
    },
    test: /\.(bmp|png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
};

/**
 * Define rule for transpiling TypeScript
 * @description Uncomment transpileOnly to Disable type checker - will use it in ForkTsCheckerWebpackPlugin at the cost of overlay.
 * Babel loader is present to support react-hot-loader.
 *
 * @todo Make configurable for CI and performance. Babel can also provide caching and polyfill
 */
const typeScriptRule: RuleSetRule = {
    include: resolvePath("src"),
    test: /\.(ts|tsx)$/,
    use: [
        // {
        //      // TODO should not do for server code... another reason to segment the configs back out
        //      // https://iamturns.com/typescript-babel/
        //      // TODO https://medium.com/@francesco.agnoletto/how-to-set-up-typescript-with-babel-and-webpack-6fba1b6e72d5
        //     // TODO https://blog.wax-o.com/2018/05/webpack-loaders-babel-sourcemaps-react-hot-module-reload-typescript-modules-code-splitting-and-lazy-loading-full-tutorial-to-transpile-and-bundle-your-code/
        //     loader: require.resolve("babel-loader"),
        //     options: {
        //         plugins: [
        //             "react-hot-loader/babel",
        //         ],
        //     },
        // },
        {
            loader: "babel-loader",
            options: {
                babelrc: false,
                cacheDirectory: true,
                plugins: ["react-hot-loader/babel"],
            },
        },
        {
            loader: "ts-loader",
            options: {
                configFile: resolvePath("tsconfig.json"),
                // transpileOnly: true,
            },
        },
    ],
};

/**
 * Define how source files are handled
 */
const module: Module = {
    rules: [{
        oneOf: [staticFileRule, typeScriptRule, scssRule, catchAllRule],
    }],
    strictExportPresence: true,
};

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
         * Minify the code.
         * Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
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
    ], []),
};

/**
 * Define build performance options
 */
const performance: Options.Performance = {
    hints: ifDevelopment("warning", false),
};

/**
 * @description Plugins need to webpack to perform build
 */
const plugins: Plugin[] = removeEmpty([
    /**
     * Fixes a known issue with cross-platform differences in file watchers,
     * so that webpack doesn't loose file changes when watched files change rapidly
     * https://github.com/webpack/webpack-dev-middleware#known-issues
     *
     * @env development
     */
    ifDevelopment(new TimeFixPlugin(), undefined),
    /**
     * Watcher doesn"t work well if you mistype casing in a path so we use
     * a plugin that prints an error when you attempt to do this.
     * See https://github.com/facebookincubator/create-react-app/issues/240
     *
     * @env development
     */
    ifDevelopment(new CaseSensitivePathsPlugin(), undefined),
    /**
     * Moment.js is an extremely popular library that bundles large locale files
     * by default due to how Webpack interprets its code. This is a practical
     * solution that requires the user to opt into importing specific locales.
     * @url https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
     * @env all
     */
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    /**
     * Perform type checking and linting in a separate process to speed up compilation
     * TODO might prevent showing errors in browser if async is off... but then again it breaks hmr overlay
     * @env all
     */
    // import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
    // ifProduction(new ForkTsCheckerWebpackPlugin({
    //     tsconfig: resolvePath("tsconfig.json"),
    //     tslint: resolvePath("tslint.json"),
    // }), new ForkTsCheckerWebpackPlugin({
    //     tsconfig: resolvePath("tsconfig.json"),
    //     tslint: resolvePath("tslint.json"),
    //     watch: resolvePath("src"),
    // })),
]);

/**
 * @description Tell webpack how to resolve files and modules
 * Prevents users from importing files from outside of src/ (or node_modules/).
 * This often causes confusion because we only process files within src/ with babel.
 * To fix this, we prevent you from importing files out of src/ -- if you'd like to,
 * please link the files into your node_modules/ and let module-resolution kick in.
 * Make sure your source files are compiled, as they will not be processed in any way.
 */
const resolve: Resolve = {
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
    modules: [resolvePath("src"), "node_modules"],
    plugins: [
        new ModuleScopePlugin(resolvePath("src"), [resolvePath("package.json")]),
        new TsconfigPathsPlugin({ configFile: resolvePath("tsconfig.json") }),
    ],
};

/**
 * Common configuration
 */
const config: Configuration = {
    bail: ifProduction(),
    mode: ifProduction("production", "development"),
    module,
    node,
    optimization,
    performance,
    plugins,
    resolve,
};

export default config;
