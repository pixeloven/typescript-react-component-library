import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import webpack, {Resolve, RuleSetRule} from "webpack";
import webpackNodeExternals from "webpack-node-externals";
import Application from "../../Application";
import files from "../files";

/**
 * Define rule for transpiling TypeScript
 * @description Disable type checker - we will use it in ForkTsCheckerWebpackPlugin
 */
const typeScriptRule: RuleSetRule = {
    include: Application.srcPath,
    test: /\.(ts|tsx)$/,
    use: [
        {
            loader: require.resolve("ts-loader"),
            options: {
                configFile: Application.tsConfig,
                transpileOnly: true,

            },
        },
    ],
};

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
    modules: ["node_modules", Application.nodeModulesPath],
    plugins: [
        new ModuleScopePlugin(Application.srcPath, [Application.packagePath]),
        new TsconfigPathsPlugin({ configFile: Application.tsConfig }),
    ],
};

// TODO need config for development... right now it is rendering 100% on client... can also maybe get rid of index.html
// TODO also need to get ENV into server and client
const serverConfig = {
    bail: true,
    devtool: Application.sourceMapType,
    entry: [Application.serverEntryPoint],
    externals: [webpackNodeExternals()], // https://www.npmjs.com/package/webpack-node-externals TODO for all configs????
    module: {
        rules: [typeScriptRule],
        strictExportPresence: true,
    },
    output: {
        filename: files.outputPattern.jsServer,
        path: Application.buildPath,
        publicPath: Application.servedPath,
    },
    plugins: [
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
