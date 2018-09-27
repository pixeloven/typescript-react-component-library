'use strict';

const path = require('path');
const hypernova = require('hypernova/server');

const PORT = 8081;
const HOST = 'node.server';

hypernova({
    devMode: true,
    endpoint: '/batch',
    getComponent: hypernova.createGetComponent({
        MyComponent: path.resolve(path.join('./src/MyComponent.js')),
    }),
    host: HOST,
    port: PORT,
});
