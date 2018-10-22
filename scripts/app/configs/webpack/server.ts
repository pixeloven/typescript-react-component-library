import webpackNodeExternals from "webpack-node-externals";
import Application from "../../Application";
import resolve from "./common/resolve";
import module from "./production/server/module";
import output from "./production/server/output";
import plugins from "./production/server/plugins";

// TODO need config for development... right now it is rendering 100% on client... can also maybe get rid of index.html
const serverConfig = {
    bail: true,
    devtool: Application.sourceMapType,
    entry: [Application.serverEntryPoint],
    externals: [webpackNodeExternals()], // https://www.npmjs.com/package/webpack-node-externals TODO for all configs????
    module,
    output,
    plugins,
    resolve,
    target: "node",
};

export default serverConfig;
