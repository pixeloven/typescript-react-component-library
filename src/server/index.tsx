import * as cors from "cors";
import * as express from "express";
import {DefaultController} from "./controllers";

const PORT = 8000;
const HOST = "0.0.0.0";

// TODO should rename this file to .ts (change in paths too)
const app = express();
app.use(cors()); // TODO not sure we need this

/**
 * Defines static build files
 * TODO need to remove client.js from here but that requires a rework of webpack.config
 */
app.use("/public", express.static("build")); // TODO read in from .env????

// TODO do we need the html file??? or can we use it instead of the templates?

/**
 * This defines a catch all route for serving all react pages
 */
// TODO can create an inheritable controller class
const defaultController = new DefaultController(); // TODO should inject template into the controllers
app.get("*", defaultController.all);

// TODO need to try and search for a port range???
app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
