import * as assert from "assert";

/**
 * Initialize env vars
 */
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";
process.env.HOST = process.env.HOST || "0.0.0.0";
process.env.PORT = process.env.PORT || "3000";

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on("unhandledRejection", err => {
    throw err;
});

/**
 * Import dependencies
 */
// import * as paths from "@config/paths";
// import * as config from "@config/webpack.config.dev";

/* tslint:disable no-var-requires */
const config = require("../config/webpack.config.prod");
/* tslint:enable no-var-requires */

import chalk from "chalk";
import * as fs from "fs-extra";
import * as path from "path";
import * as FileSizeReporter from "react-dev-utils/FileSizeReporter";
import * as formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import * as printBuildError from "react-dev-utils/printBuildError";
import * as printHostingInstructions from "react-dev-utils/printHostingInstructions";
import * as webpack from "webpack";
import {Stats} from "webpack";
import "../config/env";
import Application from "./Application";

/**
 * Get FileSizeReporter functions
 */
const {
    measureFileSizesBeforeBuild,
    printFileSizesAfterBuild,
} = FileSizeReporter;

/**
 * Setup constants for budle size
 * @description These sizes are pretty large. We"ll warn for bundles exceeding them.
 */
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

/**
 * Warn and crash if required files are missing
 */

try {
    // TODO can remove once we use this in our webpack setup
    assert(Application.clientEntryPoint);
    assert(Application.serverEntryPoint);
    assert(Application.publicEntryPoint);

    const buildPath = Application.buildPath;
    const appPackage = Application.package; // TODO need to cleanup package.json since we don't use everything there.
    const usingYarn = Application.usingYarn;
    const publicUrl = Application.publicUrl; // TODO doesn't seem to get what's in process.env... need to read this in better

    /**
     * Read the current file sizes in build directory
     * @description This lets us display how much they changed later.
     */
    measureFileSizesBeforeBuild(buildPath)
        .then((previousFileSizes: OpaqueFileSizes) => {
            copyPublicDirIntoFreshBuildDir();
            return build(previousFileSizes);
        }).then(({ stats, previousFileSizes, warnings }: BuildInformation) => {
            if (warnings.length) {
                console.log(chalk.yellow("Compiled with warnings.\n"));
                console.log(warnings.join("\n\n"));
                console.log("\nSearch for the " + chalk.underline(chalk.yellow("keywords")) + " to learn more about each warning.");
                console.log("To ignore, add " + chalk.cyan("// eslint-disable-next-line") + " to the line before.\n");
            } else {
                console.log(chalk.green("Compiled successfully.\n"));
            }
            console.log("File sizes after gzip:\n");
            printFileSizesAfterBuild(
                stats,
                previousFileSizes,
                buildPath,
                WARN_AFTER_BUNDLE_GZIP_SIZE,
                WARN_AFTER_CHUNK_GZIP_SIZE,
            );
            console.log();

            // TODO how do we get server stuff here too
            const publicPath = config[0].output.publicPath;
            const buildRelativePath = path.relative(process.cwd(), buildPath);

            // TODO we should copy and write this custom for a real deploy process
            printHostingInstructions(
                appPackage,
                publicUrl,
                publicPath,
                buildRelativePath,
                usingYarn,
            );
        },
        (error: Error) => {
            console.log(chalk.red("Failed to compile.\n"));
            printBuildError(error);
            process.exit(1);
        },
    );
} catch (error) {
    console.log(chalk.red(error.message));
    console.log();
    process.exit(1);
}

/**
 * Build Information
 */
type OpaqueFileSizes = [];

interface BuildInformation {
    stats: Stats;
    previousFileSizes: OpaqueFileSizes;
    warnings: string[];
}

/**
 * Create the production build and print the deployment instructions.
 * @param previousFileSizes
 * TODO move to class
 */
function build(previousFileSizes: OpaqueFileSizes) {
    console.log("Creating an optimized production build...");
    const compiler = webpack(config);
    return new Promise((resolve, reject) => {
        compiler.run((err: Error, stats: Stats) => {
            if (err) {
                return reject(err);
            }
            const messages = formatWebpackMessages(stats.toJson("verbose"));
            if (messages.errors.length) {
                // Only keep the first error. Others are often indicative
                // of the same problem, but confuse the reader with noise.
                if (messages.errors.length > 1) {
                    messages.errors.length = 1;
                }
                return reject(new Error(messages.errors.join("\n\n")));
            }
            if (
                process.env.CI &&
                (typeof process.env.CI !== "string" ||
                    process.env.CI.toLowerCase() !== "false") &&
                messages.warnings.length
            ) {
                console.log(chalk.yellow("\nTreating warnings as errors because process.env.CI = true.\n" + "Most CI servers set it automatically.\n"));
                return reject(new Error(messages.warnings.join("\n\n")));
            }
            return resolve({
                previousFileSizes,
                stats,
                warnings: messages.warnings,
            });
        });
    });
}

/**
 * Copy public folder to fresh build
 * TODO move to class
 */
function copyPublicDirIntoFreshBuildDir() {
    const buildPath = Application.buildPath;
    const publicPath = Application.publicPath;
    const publicEntryPoint = Application.publicEntryPoint;
    fs.emptyDirSync(buildPath);
    fs.copySync(publicPath, buildPath, {
        dereference: true,
        filter: file => file !== publicEntryPoint,
    });
}
