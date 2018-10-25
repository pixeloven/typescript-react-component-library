import express from "express";
import expressWinston from "express-winston";
import winston from "winston";
import {config} from "./config";
import {health} from "./controllers";
import {renderer} from "./middleware";

// TODO use env for hosting
// TODO need to create a function to generate the renderer with specific files.[css,js]
/**
 * Create express application
 * @type {Function}
 */
const app = express();

/**
 * Setup express logger
 * TODO {json: true,colorize: true} for config
 */
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console(),
    ],
}));

/**
 * Define middleware
 */
app.use(renderer);

/**
 * Defines static build files
 */
app.use(express.static("build/public"));

/**
 * Register endpoints
 */
app.use(health);

/**
 * Start express server on specific host and port
 */
app.listen(config.CLIENT.PORT, config.CLIENT.HOST, () => {
    console.log(`Running on http://${config.CLIENT.HOST}:${config.CLIENT.PORT}`);
});
