import {getIfUtils} from "webpack-config-utils";
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

// TODO lean out this config... common was a bad idea
// TODO also need to get ENV into server and client
export default merge(common, {
    devtool: false, // TODO find a way to debug server
    entry: [
        ifProduction(resolvePath("src/server/index.ts"), resolvePath("src/server/webpack.ts")),
    ],
    externals: [webpackNodeExternals()],
    name: "server",
    output: {
        filename: "server.js",
        libraryTarget: "commonjs2",
        path: resolvePath("build"),
        publicPath,
    },
    target: "node",
});
