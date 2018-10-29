import {Module, Node, Output, RuleSetRule} from "webpack";
import {getIfUtils, removeEmpty} from "webpack-config-utils";
import merge from "webpack-merge";
import webpackNodeExternals from "webpack-node-externals";
import Env from "../../libraries/Env";
import {resolvePath} from "../../macros";
import common from "./common";

/**
 * Utility functions to help segment configuration based on environment
 */
const {ifProduction} = getIfUtils(Env.current);

/**
 * Webpack uses `publicPath` to determine where the app is being served from.
 * It requires a trailing slash, or the file assets will get an incorrect path.
 */
const publicPath = Env.config("PUBLIC_URL", "/");

/**
 * Define entrypoint(s) for sever
 */
const entry = removeEmpty([
    ifProduction(resolvePath("src/server/index.ts"), resolvePath("src/server/webpack.ts")),
]);

/**
 * @description Make sure all assets not caught by other loaders are ignored
 */
const catchAllRule = {
    exclude: [/\.(js|jsx|mjs)$/, /\.(ts|tsx)$/, /\.html$/, /\.json$/],
    loader: "file-loader",
    options: {
        emitFile: false,
    },
};

/**
 * @description Ensures css is ignored by server build
 */
const scssRule: RuleSetRule = {
    loader: "css-loader/locals",
    test: /\.(scss|sass|css)$/i,
};

/**
 * @description Ensures all static files are ignored by server build
 */
const staticFileRule: RuleSetRule = {
    loader: "url-loader",
    options: {
        emitFile: false,
    },
    test: /\.(bmp|png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
};

/**
 * Define rule for transpiling TypeScript
 * @description Uncomment transpileOnly to Disable type checker - will use it in ForkTsCheckerWebpackPlugin at the cost of overlay.
 * Babel loader is present to support react-hot-loader.
 *
 * @todo Make configurable for CI and performance. Babel can also provide caching and polyfill
 * @todo Babel probably doesn't need to be run for server config
 */
const typeScriptRule: RuleSetRule = {
    include: resolvePath("src"),
    test: /\.(ts|tsx)$/,
    use: [
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
 * @description Prevents these common globals from being overwritten
 */
const node: Node = {
    __dirname: false,
    __filename: false,
};

/**
 * @description Output instructions for server build
 */
const output: Output = {
    filename: "server.js",
    libraryTarget: "commonjs2",
    path: resolvePath("build", false),
    publicPath,
};

/**
 * Server side configuration
 */
export default merge(common, {
    devtool: ifProduction("source-map", "eval-source-map"), // TODO remove in prod
    entry,
    externals: [webpackNodeExternals()],
    module,
    name: "server",
    node,
    output,
    target: "node",
});
