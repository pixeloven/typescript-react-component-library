import autoprefixer from "autoprefixer";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import Application from "../../../../Application";
import Env from "../../../env";
import files from "../../../files";
import {catchAllRule, staticFileRule, typeScriptRule} from "../../common/rules";

/**
 * Webpack uses `publicPath` to determine where the app is being served from.
 * It requires a trailing slash, or the file assets will get an incorrect path.
 */
const publicPath = Application.servedPath;

/**
 * Some apps do not use client-side routing with pushState.
 * For these, "homepage" can be set to "." to enable relative asset paths.
 * @type {boolean}
 */
const shouldUseRelativeAssetPaths = publicPath === "./";

/**
 * Create extract text plugin options
 */
const extractTextPluginOptions = shouldUseRelativeAssetPaths
    ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(files.outputPattern.css.split("/").length).join("../") }
    : {};

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

// The notation here is somewhat confusing.
// "postcss" loader applies autoprefixer to our CSS.
// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader normally turns CSS into JS modules injecting <style>,
// but unlike in development configuration, we do something different.
// `ExtractTextPlugin` first applies the "postcss" and "css" loaders
// (second argument), then grabs the result CSS and puts it into a
// separate file in our build process. This way we actually ship
// a single CSS file in production instead of JS code injecting <style>
// tags. If you use code splitting, however, any async bundles will still
// use the "style" loader inside the async code so CSS from them won't be
// in the main CSS file.
const scssProdRule = {
    loader: ExtractTextPlugin.extract(
        Object.assign(
            {
                fallback: {
                    loader: require.resolve("style-loader"),
                    options: {
                        hmr: false,
                    },
                },
                use: [
                    {
                        loader: require.resolve("css-loader"),
                        options: {
                            importLoaders: 1,
                            minimize: true,
                            sourceMap: Env.config("GENERATE_SOURCE_MAP") !== "false",
                        },
                    },
                    {
                        loader: require.resolve("sass-loader"),
                    },
                    {
                        loader: require.resolve("postcss-loader"),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: "postcss",
                            plugins: postCssPlugin,
                        },
                    },
                ],
            },
            extractTextPluginOptions,
        ),
    ),
    test: /\.(scss|sass|css)$/i,
};

const module = {
    rules: [
        // javaScriptSourceMapRule,
        {
            oneOf: [
                staticFileRule,
                // javaScriptRule,
                typeScriptRule,
                scssProdRule,
                catchAllRule,
            ],
        },
    ],
    strictExportPresence: true,
};

export default module;
