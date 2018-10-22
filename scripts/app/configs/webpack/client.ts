import {getIfUtils, removeEmpty} from "webpack-config-utils";
import Application from "../../Application";
import Env from "../env";
import node from "./common/node";
import resolve from "./common/resolve";
import devModule from "./development/client/module";
import devOutput from "./development/client/output";
import devPlugins from "./development/client/plugins";
import prodModule from "./production/client/module";
import prodOutput from "./production/client/output";
import prodPlugins from "./production/client/plugins";

const {ifProduction, ifNotProduction} = getIfUtils(Env.current);

// TODO unify server and client configs for entry
export default {
    bail: ifProduction(),
    devtool: ifProduction("source-map", "cheap-module-source-map"),
    entry: removeEmpty([
        ifNotProduction(require.resolve("react-dev-utils/webpackHotDevClient")),
        Application.clientEntryPoint,
    ]),
    module: ifProduction(prodModule, devModule),
    node,
    output: ifProduction(prodOutput, devOutput),
    performance: {
        hints: false,
    },
    plugins: ifProduction(prodPlugins, devPlugins),
    resolve,
    target: "web",
};
