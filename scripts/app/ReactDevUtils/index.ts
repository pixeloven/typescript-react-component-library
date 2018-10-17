/**
 * Register classes here
 */
export { default as WatchMissingNodeModulesPlugin } from "./WatchMissingNodeModulesPlugin";

// TODO rewrite these in typescript and/or find out if they are needed in webpack 4
import InterpolateHtmlPlugin from "react-dev-utils/InterpolateHtmlPlugin";
import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

export {
    InterpolateHtmlPlugin,
    ModuleScopePlugin,
    TsconfigPathsPlugin,
};
