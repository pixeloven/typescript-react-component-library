import Env from "../app/libraries/Env";

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on("unhandledRejection", err => {
    throw err;
});

/**
 * Initialize env vars
 */
Env.load();

/**
 * Set test environment
 */
const environment: Environment = "test";
Env.define("BABEL_ENV", environment);
Env.define("NODE_ENV", environment);
