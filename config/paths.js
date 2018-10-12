'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

/**
 * Environment variable for public url
 * @type {string}
 */
const envPublicUrl = process.env.PUBLIC_URL;

/**
 * Ensures slashes are in path
 * @param path
 * @param needsSlash
 * @returns {*}
 */
function ensureSlash(path, needsSlash) {
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
}

/**
 * Returns the absolute app directory
 * @type {string}
 */
const appDirectory = fs.realpathSync(process.cwd());

/**
 * Resolves appDirectory from a relative path
 * @param relativePath
 * @returns {string}
 */
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

/**
 * Return public url
 * @param appPackageJson
 * @returns {string|*}
 */
const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;

/**
 * Get Served path
 * @description Webpack needs to know it to put the right <script> hrefs into HTML even in single-page apps that may serve index.html for nested URLs like /todos/42.
 *  We can't use a relative path in HTML because we don't want to load something like /todos/42/static/js/bundle.7289d.js. We have to know the root.
 * @param appPackageJson
 * @returns {*}
 */
function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl = envPublicUrl ||
        (publicUrl ? url.parse(publicUrl).pathname : '/');
    return ensureSlash(servedUrl, true);
}

/**
 * Configuration
 * TODO move configuration somewhere else
 * @type Object
 */
module.exports = {
    appDirectory,
    dotenv: resolveApp('.env'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json')),
    yarnLockFile: resolveApp('yarn.lock'),
    testsSetup: resolveApp('src/setupTests.ts'),

    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/client/index.tsx'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    appTsConfig: resolveApp('tsconfig.json'),
    appTsProdConfig: resolveApp('tsconfig.prod.json'),
    appTsLint: resolveApp('tslint.json'),

    // TODO implement hashing and chunking again
    // appOutputFilePattern: 'static/js/[name].[chunkhash:8].js',
    appOutputFilePattern: 'static/js/[name].js',
    // appChunkOutputFilePattern: 'static/js/[name].[chunkhash:8].chunk.js',
    appChunkOutputFilePattern: 'static/js/[name].chunk.js',

    // TODO how can we keep the hash but also still server it form the server side???
    // TODO need to only extract once... right now we do it for both server and browser builds
    // const cssFilename = 'static/css/[name].[contenthash:8].css';
    cssFilename: 'static/css/[name].css',

    serverOutputFile: 'server.js',
    serverEntryPointFile: resolveApp('src/server/bootstrap.ts'),
};
