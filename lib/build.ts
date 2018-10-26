/**
 * Bootstrap development env
 */
import "./boostrap/production";

/**
 * Import dependencies
 */
import chalk from "chalk";
import fs from "fs-extra";
import Promise from "promise";
import FileSizeReporter from "react-dev-utils/FileSizeReporter";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import webpack, {Stats} from "webpack";
import webpackClientConfig from "./app/configs/webpack/client";
import webpackServerConfig from "./app/configs/webpack/server";
import Env from "./app/libraries/Env";
import {handleError, resolvePath} from "./app/macros";

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
 * Get FileSizeReporter functions
 */
const {
    measureFileSizesBeforeBuild,
    printFileSizesAfterBuild,
} = FileSizeReporter;

/**
 * Setup constants for bundle size
 * @description These sizes are pretty large. We"ll warn for bundles exceeding them.
 */
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

/**
 * Setup build pathing
 */
const PRIVATE_BUILD_PATH = resolvePath(Env.config("BUILD_PATH", "build"), false);
const PUBLIC_BUILD_PATH = `${PRIVATE_BUILD_PATH}/public`;

/**
 * Setup Build Directory
 * @param fullPath
 */
function setupBuildDirectory(fullPath: string) {
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
    }
    fs.emptyDirSync(fullPath);
}

/**
 * Copy public folder to fresh build
 * @param fullPath
 */
function copyPublicDirectory(fullPath: string) {
    const publicDir = resolvePath("public");
    fs.copySync(publicDir, fullPath, {
        dereference: true,
    });
}

/**
 * Print msg on status of build
 * @param warnings
 */
function printBuildStatus(warnings: string[]) {
    if (warnings.length) {
        console.log(chalk.yellow("Compiled with warnings.\n"));
        console.log(warnings.join("\n\n"));
        console.log("\nSearch for the " + chalk.underline(chalk.yellow("keywords")) + " to learn more about each warning.");
        console.log("To ignore, add " + chalk.cyan("// eslint-disable-next-line") + " to the line before.\n");
    } else {
        console.log(chalk.green("Compiled successfully.\n"));
    }
}

/**
 * Print build file sizes
 * @param buildPath
 * @param stats
 * @param previousFileSizes
 */
function printBuildFileSizesAfterGzip(buildPath: string, stats: Stats, previousFileSizes: OpaqueFileSizes) {
    console.log("File sizes after gzip:\n");
    printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        buildPath,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE,
    );
    console.log();
}

/**
 * Create the production build and print the deployment instructions.
 * @param config
 * @param previousFileSizes
 */
function build(config: object, previousFileSizes: OpaqueFileSizes) {
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
            if (process.env.CI && process.env.CI.toLowerCase() !== "false" && messages.warnings.length) {
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
 * Build script
 */
try {

    setupBuildDirectory(PRIVATE_BUILD_PATH); // TODO be mindful of /docs.. this deletes them :( - Also make storybook configurable ON/OFF
    copyPublicDirectory(PUBLIC_BUILD_PATH);

    /**
     * Handle build for server side JavaScript
     * @description This lets us display how files changed
     */
    measureFileSizesBeforeBuild(PRIVATE_BUILD_PATH)
        .then((previousFileSizes: OpaqueFileSizes) => {
            return build(webpackServerConfig, previousFileSizes);
        }).then(({previousFileSizes, stats, warnings}: BuildInformation) => {
            printBuildStatus(warnings);
            printBuildFileSizesAfterGzip(PRIVATE_BUILD_PATH, stats, previousFileSizes);
        },
        handleError,
    );

    /**
     * Handle build for client side JavaScript
     * @description This lets us display how files changed
     */
    measureFileSizesBeforeBuild(PUBLIC_BUILD_PATH)
        .then((previousFileSizes: OpaqueFileSizes) => {
            return build(webpackClientConfig, previousFileSizes);
        }).then(({previousFileSizes, stats, warnings}: BuildInformation) => {
            printBuildStatus(warnings);
            printBuildFileSizesAfterGzip(PUBLIC_BUILD_PATH, stats, previousFileSizes);
        },
        handleError,
    );
} catch (error) {
    handleError(error);
}
