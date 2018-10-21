import deepmerge from "deepmerge";
import path from "path";
import {Configuration, Module, Rule} from "webpack";

export default (baseConfig: Configuration, env: object, defaultConfig: Configuration) => {
    const newTsRule: Rule = {
        include: path.resolve(__dirname, "../src/shared/components"),
        loader: require.resolve("ts-loader"),
        options: {
            configFile: path.resolve(__dirname, "../tsconfig.json"),
        },
        test: /\.(ts|tsx)$/,
    };
    const newScssRule: Rule = {
        loaders: ["style-loader", "css-loader", "sass-loader"],
        test: /\.(scss|sass|css)$/i,
    };
    const newModule: Module = {
        rules: [newTsRule, newScssRule],
    };
    if (defaultConfig.module) {
        defaultConfig.module = deepmerge(defaultConfig.module, newModule);
    }
    if (defaultConfig.resolve && defaultConfig.resolve.extensions) {
        defaultConfig.resolve.extensions.push(".ts", ".tsx");
    }
    return defaultConfig;
};
