import autoprefixer from "autoprefixer";
import {Rule} from "webpack";
import Application from "../../../Application";

const postCssPlugin = () => [
    require("postcss-flexbugs-fixes"),
    autoprefixer({
        browsers: [
            ">1%",
            "last 4 versions",
            "Firefox ESR",
            "not ie < 9", // React doesn't support IE8 anyway
        ],
        flexbox: "no-2009",
    }),
];

// "file" loader makes sure those assets get served by WebpackDevServer.
// When you `import` an asset, you get its (virtual) filename.
// In production, they would get copied to the `build` folder.
// This loader doesn"t use a "test" so it will catch all modules
// that fall through the other loaders.
export const catchAllRule = {
    // Exclude `js` files to keep "css" loader working as it injects
    // its runtime that would otherwise processed through "file" loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpacks internal loaders.
    exclude: [/\.(js|jsx|mjs)$/, /\.(ts|tsx)$/, /\.html$/, /\.json$/],
    loader: require.resolve("file-loader"),
    options: {
        name: "[name].[hash:8].[ext]",
        outputPath: "static/media/",
    },
};

// TODO these two likely aren't needed anymore but keeping here just in case
export const javaScriptRule: Rule = {
    include: Application.srcPath,
    loader: require.resolve("babel-loader"),
    options: {
        compact: true,
    },
    test: /\.(js|jsx|mjs)$/,
};

export const javaScriptSourceMapRule: Rule = {
    enforce: "pre",
    include: Application.srcPath,
    loader: require.resolve("source-map-loader"),
    test: /\.(js|jsx|mjs)$/,
};

// TODO cleanup
// "postcss" loader applies autoprefixer to our CSS.
// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader turns CSS into JS modules that inject <style> tags.
// In production, we use a plugin to extract that CSS to a file, but
// in development "style" loader enables hot editing of CSS.
// TODO how to add scss here???
// TODO move away from node-sass-chokidar since webpack will do this anyway
// TODO also might want to remove the run-p stuff
export const scssRule: Rule = {
    test: /\.(scss|sass|css)$/i,
    use: [
        {
            loader: require.resolve("style-loader"),
        },
        {
            loader: require.resolve("css-loader"),
            options: {
                importLoaders: 1,
            },
        },
        {
            loader: require.resolve("sass-loader"),
        },
        {
            loader: require.resolve("postcss-loader"), // TODO not sure if this is needed
            options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: "postcss",
                plugins: postCssPlugin,
            },
        },
    ],
};

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
