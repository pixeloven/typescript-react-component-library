/**
 * Bootstrap development env
 */
import "./boostrap/production";

/**
 * Import dependencies
 */
import assert from "assert";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import Promise from "promise";
import FileSizeReporter from "react-dev-utils/FileSizeReporter";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import printBuildError from "react-dev-utils/printBuildError";
import printHostingInstructions from "react-dev-utils/printHostingInstructions";
import webpack, {Stats} from "webpack";
import Application from "./app/Application";
import WebpackClientConfig from "./app/configs/webpack/client";
import WebpackServerConfig from "./app/configs/webpack/server";

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
 * Build Information
 */
type OpaqueFileSizes = [];

interface BuildInformation {
    stats: Stats;
    previousFileSizes: OpaqueFileSizes;
    warnings: string[];
}

/**
 * Setup Build Directory
 */
function setupBuildDirectory() {
    const buildPath = Application.buildPath;
    if (!fs.existsSync(buildPath)) {
        fs.mkdirSync(buildPath);
    }
    fs.emptyDirSync(buildPath);
}

/**
 * Copy public folder to fresh build
 */
function copyPublicDirToBuild() {
    const buildPath = Application.buildPath;
    const publicPath = Application.publicPath;
    const publicEntryPoint = Application.publicEntryPoint;
    fs.copySync(publicPath, `${buildPath}/public`, {
        dereference: true,
        filter: file => file !== publicEntryPoint,
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
 * Print instructions about deployment
 * @param deploymentPath
 * @param buildRelativePath
 */
function printDeploymentInstructions(deploymentPath: string, buildRelativePath: string) {
    const appPackage = Application.package;
    const publicUrl = Application.publicUrl; // TODO check this is being read in by .env
    const usingYarn = Application.usingYarn;
    printHostingInstructions(
        appPackage,
        publicUrl,
        deploymentPath,
        buildRelativePath,
        usingYarn,
    );
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
    // TODO can remove once we use this in our webpack setup
    assert(Application.clientEntryPoint);
    assert(Application.serverEntryPoint);
    assert(Application.publicEntryPoint);

    const buildPath = Application.buildPath;
    const publicPath = Application.servedPath;
    setupBuildDirectory();

    /**
     * Handle build for server side JavaScript
     * @description This lets us display how files changed
     */
    // TODO should re-write measureFileSizesBeforeBuild to be more specific for the different paths
    measureFileSizesBeforeBuild(buildPath)
        .then((previousFileSizes: OpaqueFileSizes) => {
            return build(WebpackServerConfig, previousFileSizes);
        }).then(({ previousFileSizes, stats, warnings }: BuildInformation) => {
            printBuildStatus(warnings);
            printBuildFileSizesAfterGzip(buildPath, stats, previousFileSizes);
            const buildRelativePath = path.relative(process.cwd(), buildPath);
            printDeploymentInstructions(publicPath, buildRelativePath);
        },
        (error: Error) => {
            console.log(chalk.red("Failed to compile.\n"));
            printBuildError(error);
            process.exit(1);
        },
    );
    /**
     * Handle build for client side JavaScript
     * @description This lets us display how files changed
     */
    const clientBuildPath = `${buildPath}/public`;
    measureFileSizesBeforeBuild(clientBuildPath)
        .then((previousFileSizes: OpaqueFileSizes) => {
            copyPublicDirToBuild();
            return build(WebpackClientConfig, previousFileSizes);
        }).then(({ previousFileSizes, stats, warnings }: BuildInformation) => {
            printBuildStatus(warnings);
            printBuildFileSizesAfterGzip(clientBuildPath, stats, previousFileSizes);
            const buildRelativePath = path.relative(process.cwd(), buildPath);
            printDeploymentInstructions(publicPath, buildRelativePath);
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
