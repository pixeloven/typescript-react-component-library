import {Rule} from "webpack";
import Application from "../../../Application";

/**
 * Define rule for static assets
 * @description "url" loader works like "file" loader except that it embeds assets
 * smaller than specified limit in bytes as data URLs to avoid requests.
 */
export const staticFileRule: Rule = {
    loader: require.resolve("url-loader"),
    options: {
        limit: 10000,
        name: "static/media/[name].[hash:8].[ext]",
    },
    test: /\.(bmp|png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
};

/**
 * Define rule for transpiling TypeScript
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
