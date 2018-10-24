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
const publicPath = Env.config("PUBLIC_URL", "/public/");

// TODO need config for development... right now it is rendering 100% on client... can also maybe get rid of index.html
// TODO also need to get ENV into server and client
export default merge(common, {
    devtool: ifProduction("source-map", "cheap-module-source-map"), // TODO if prod should we even do this??? And what should this be for nodeJS
    entry: [Application.serverEntryPoint],
    externals: [webpackNodeExternals()], // https://www.npmjs.com/package/webpack-node-externals TODO for all configs????
    name: "server",
    output: {
        filename: files.outputPattern.jsServer,
        path: Application.buildPath,
        publicPath,
    },
    target: "node",
});
