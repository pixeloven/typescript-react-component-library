import {Rule} from "webpack";
import Application from "../../../Application";

/**
 * Define rules for transpiling TypeScript
 * @description Disable type checker - we will use it in ForkTsCheckerWebpackPlugin
 */
export const typeScriptRule: Rule = {
    include: Application.srcPath,
    test: /\.(ts|tsx)$/,
    use: [
        {
            loader: require.resolve("ts-loader"),
            options: {
                configFile: Application.tsConfig,
                transpileOnly: true,

            },
        },
    ],
};
