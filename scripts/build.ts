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
import * as paths from "@config/paths";
import * as config from "@config/webpack.config.prod";
import chalk from "chalk";
import * as fs from "fs-extra";
import * as path from "path";
import * as checkRequiredFiles from "react-dev-utils/checkRequiredFiles";
import * as FileSizeReporter from "react-dev-utils/FileSizeReporter";
import * as formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import * as printBuildError from "react-dev-utils/printBuildError";
import * as printHostingInstructions from "react-dev-utils/printHostingInstructions";
import * as webpack from "webpack";
import {Stats} from "webpack";
import "../config/env";

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
 * Determine if we are using yarn or not
 */
const useYarn = fs.existsSync(paths.yarnLockFile);

/**
 * Warn and crash if required files are missing
 */
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
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
 * Read the current file sizes in build directory
 * @description This lets us display how much they changed later.
 */
measureFileSizesBeforeBuild(paths.appBuild)
    .then((previousFileSizes: OpaqueFileSizes) => {
        // Remove all content but keep the directory so that
        // if you"re in it, you don"t end up in Trash
        fs.emptyDirSync(paths.appBuild);
        // Merge with the public folder
        copyPublicFolder();
        // Start the webpack build
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
            paths.appBuild,
            WARN_AFTER_BUNDLE_GZIP_SIZE,
            WARN_AFTER_CHUNK_GZIP_SIZE,
        );
        console.log();

        const appPackage = require(paths.appPackageJson);
        const publicUrl = paths.publicUrl;
        const publicPath = config[0].output.publicPath;
        const buildFolder = path.relative(process.cwd(), paths.appBuild);
        // TODO how do we get server stuff here too
        printHostingInstructions(
            appPackage,
            publicUrl,
            publicPath,
            buildFolder,
            useYarn,
        );
    },
    (error: Error) => {
        console.log(chalk.red("Failed to compile.\n"));
        printBuildError(error);
        process.exit(1);
    },
);

/**
 * Create the production build and print the deployment instructions.
 * @param previousFileSizes
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

function copyPublicFolder() {
    fs.copySync(paths.appPublic, paths.appBuild, {
        dereference: true,
        filter: file => file !== paths.appHtml,
    });
}
