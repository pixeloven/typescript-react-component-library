import {getIfUtils} from "webpack-config-utils";
import merge from "webpack-merge";
import webpackNodeExternals from "webpack-node-externals";
import Application from "../../Application";
import Env from "../env";
import files from "../files";
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
        ifProduction("src/server/index.ts", "src/server/webpack.ts"),
    ],
    externals: [webpackNodeExternals()],
    name: "server",
    output: {
        filename: files.outputPattern.jsServer,
        libraryTarget: "commonjs2",
        path: Application.resolvePath("build/", false), // TODO maybe be strict for prod build as this should be created before hand
        publicPath,
    },
    target: "node",
});
