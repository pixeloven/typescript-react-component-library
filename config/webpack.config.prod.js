'use strict';

const browserConfig = require('./webpack.config.browser.prod');
const serverConfig = require('./webpack.config.server.prod');

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = [browserConfig, serverConfig];
