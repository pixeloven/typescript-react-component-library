import * as cors from "cors";
import * as express from "express";
import * as expressWinston from "express-winston";
import * as winston from "winston";
import {config} from "./config";
import {DefaultController} from "./controllers";

// TODO re-write hypernova client
// TODO should explore mvc frameworks for express
/**
 * Create express application
 * @type {Function}
 */
const app = express();
app.use(cors());

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
 * Defines static build files
 * TODO read this from env
 * TODO ignore html file for build
 */
app.use("/public", express.static("build"));

/**
 * This defines a catch all route for serving all react pages
 * TODO can create an inheritable controller class
 * TODO should inject template into the controllers
 */
const defaultController = new DefaultController(config);

/**
 * Register endpoints
 * TODO need to handle 404s
 */
app.get("/health", defaultController.health);
app.get("*", defaultController.render);

/**
 * Start express server on specific host and port
 */
app.listen(config.CLIENT.PORT, config.CLIENT.HOST, () => {
    console.log(`Running on http://${config.CLIENT.HOST}:${config.CLIENT.PORT}`);
});
