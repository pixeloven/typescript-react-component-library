'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

/**
 * Make sure that including paths.js after env.js will read .env variables.
 */
delete require.cache[require.resolve('./paths')];

/**
 * Ensure node env is set
 * @type {string}
 */
const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
    throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

/**
 * Import env files
 * @description Don't include `.env.local` for `test` environment since normally you expect tests to produce the same results for everyone
 * https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
 *
 * @type Array
 */
const dotenvFiles = [
    `${paths.dotenv}.${NODE_ENV}.local`,
    `${paths.dotenv}.${NODE_ENV}`,
    NODE_ENV !== 'test' && `${paths.dotenv}.local`,
    paths.dotenv,
].filter(Boolean);

/**
 * @description Load environment variables from .env* files. Suppress warnings using silent if this file is missing.
 * dotenv will never modify any environment variables that have already been set.
 * Variable expansion is supported in .env files.
 *
 * https://github.com/motdotla/dotenv
 * https://github.com/motdotla/dotenv-expand
 */
dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
        require('dotenv-expand')(
            require('dotenv').config({
                path: dotenvFile,
            })
        );
    }
});

/**
 * This lets you use absolute paths in imports inside.
 * We also resolve them to make sure all tools using them work consistently.
 * @type {string}
 */
process.env.NODE_PATH = (process.env.NODE_PATH || '')
    .split(path.delimiter)
    .filter(folder => folder && !path.isAbsolute(folder))
    .map(folder => path.resolve(paths.appDirectory, folder))
    .join(path.delimiter);


/**
 * Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
 * Injected into the application via DefinePlugin in Webpack configuration.
 * @type {RegExp}
 */
const REACT_APP = /^REACT_APP_/i;

/**
 * Get Client Environment
 * @param publicUrl
 * @returns Object
 */
function getClientEnvironment(publicUrl) {
    const raw = Object.keys(process.env)
        .filter(key => REACT_APP.test(key))
        .reduce((env, key) => {
            env[key] = process.env[key];
            return env;
        }, {
            NODE_ENV: process.env.NODE_ENV || 'development',
            PUBLIC_URL: publicUrl,
        });

    /**
     * Stringify all values so we can feed into Webpack DefinePlugin
     * @type Object
     */
    const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
                env[key] = JSON.stringify(raw[key]);
                return env;
            }, {}
        ),
    };
    return { raw, stringified };
}

module.exports = getClientEnvironment;
