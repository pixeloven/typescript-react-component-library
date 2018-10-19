import deepmerge from "deepmerge";
import path from "path";
import {Configuration, Module, Rule} from "webpack";

export default (baseConfig: Configuration, env: object, defaultConfig: Configuration) => {
    const newRule: Rule = {
        include: path.resolve(__dirname, "../src/shared/components"),
        loader: require.resolve("ts-loader"),
        options: {
            configFile: path.resolve(__dirname, "../tsconfig.json"),
        },
        test: /\.(ts|tsx)$/,
    };
    const newModule: Module = {
        rules: [newRule],
    };
    if (defaultConfig.module) {
        defaultConfig.module = deepmerge(defaultConfig.module, newModule);
    }
    if (defaultConfig.resolve && defaultConfig.resolve.extensions) {
        defaultConfig.resolve.extensions.push(".ts", ".tsx");
    }
    return defaultConfig;
};
