/**
 * Bootstrap development env
 */
import "./boostrap/development";

import cors from "cors";
import express from "express";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import Env from "./app/configs/env";
import webpackClientConfig from "./app/configs/webpack/client";
import webpackServerConfig from "./app/configs/webpack/server";

Env.load();
const HOST = Env.config("HOST", "0.0.0.0");
const PORT = parseInt(Env.config("PORT", "8080"), 10);

// TODO need to differnetiate between build public path and public URL which should just be "/"
const publicPath = Env.config("PUBLIC_URL", "/public/");
// TODO need to make it so that if server side change is made then hard refresh.
// TODO why does it hang... perhaps we need to handle images better???

// https://github.com/gaearon/react-hot-loader
// https://github.com/webpack-contrib/webpack-hot-middleware
// https://github.com/60frames/webpack-hot-server-middleware
// https://github.com/webpack/webpack-dev-middleware/
// https://github.com/luangjokaj/react-ssr-boilerplate
// TODO rename templates views and use the above repo as an example... can just use .ejs and have just one
// TODO make it so you can build just the server and not client too

/**
 * Create express application
 * @type {Function}
 */
const app = express();
app.use(cors());

app.use(express.static(path.resolve(process.cwd(), "public"))); // TODO get this working and unify prod and dev to use PUBLIC_URL

/**
 * Setup webpack hot module replacement for development
 */
const combinedCompiler = webpack([webpackClientConfig, webpackServerConfig]);
const clientCompiler = combinedCompiler.compilers.find(compiler => compiler.name === "client");
app.use(webpackDevMiddleware(combinedCompiler, {
    publicPath,
    serverSideRender: true,
}));
if (clientCompiler) {
    app.use(webpackHotMiddleware(clientCompiler));
}
app.use(webpackHotServerMiddleware(combinedCompiler));

/**
 * Start express server on specific host and port
 * TODO in dev should migrate ports if already in use
 */
app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
