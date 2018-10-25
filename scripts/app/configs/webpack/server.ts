import merge from "webpack-merge";
import webpackNodeExternals from "webpack-node-externals";
import Application from "../../Application";
import Env from "../env";
import files from "../files";
import common from "./common";

/**
 * Webpack uses `publicPath` to determine where the app is being served from.
 * It requires a trailing slash, or the file assets will get an incorrect path.
 */
const publicPath = Env.config("PUBLIC_URL", "/");

// TODO lean out this config... common was a bad idea

// TODO need config for development... right now it is rendering 100% on client... can also maybe get rid of index.html
// TODO also need to get ENV into server and client
export default merge(common, {
    devtool: false, // TODO find a way to debug server
    entry: [Application.serverEntryPoint],
    externals: [webpackNodeExternals()], // https://www.npmjs.com/package/webpack-node-externals TODO for all configs????
    name: "server",
    output: {
        filename: files.outputPattern.jsServer,
        libraryTarget: "commonjs2",
        path: Application.buildPath,
        publicPath,
    },
    target: "node",
});
