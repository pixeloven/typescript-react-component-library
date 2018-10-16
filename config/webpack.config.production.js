'use strict';

const clientConfig = require('./webpack.config.client.production');
const serverConfig = require('./webpack.config.server.production');
module.exports = [clientConfig, serverConfig];
