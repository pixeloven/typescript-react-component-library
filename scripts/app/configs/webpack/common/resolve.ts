import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import {Resolve} from "webpack";
import Application from "../../../Application";

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
        // Prevents users from importing files from outside of src/ (or node_modules/).
        // This often causes confusion because we only process files within src/ with babel.
        // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
        // please link the files into your node_modules/ and let module-resolution kick in.
        // Make sure your source files are compiled, as they will not be processed in any way.
        new ModuleScopePlugin(Application.srcPath, [Application.packagePath]),
        new TsconfigPathsPlugin({ configFile: Application.tsConfig }),
    ],
};

export default resolve;
