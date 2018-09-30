
/**
 * Initialize env vars
 * This should be done before anything else.
 */
process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";
process.env.PUBLIC_URL = "";

import "jest";

/**
 * Ensure environment variables are read.
 */
import "../config/env";

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on("unhandledRejection", err => {
    throw err;
});

/**
 * Watch unless on CI, in coverage mode, or explicitly running all tests
 */
const argv = process.argv.slice(2);
if (
    !process.env.CI &&
    argv.indexOf("--coverage") === -1 &&
    argv.indexOf("--watchAll") === -1
) {
    argv.push("--watch");
}
jest.run(argv);
