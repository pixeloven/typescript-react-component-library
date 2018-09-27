'use strict';

const express = require('express'); // implicit from hypernova
const expressWinston = require('express-winston');
const winston = require('winston');
const Renderer = require('hypernova-client');
const devModePlugin = require('hypernova-client/plugins/devModePlugin');

const PORT = 8080;
const HOST = 'node.client';
const SERVER_PORT = 8081;
const SERVER_HOST = 'node.server';

/**
 * Setup render for react
 * @type {Renderer}
 */
const renderer = new Renderer({
    url: `http://${SERVER_HOST}:${SERVER_PORT}/batch`,
    plugins: [
        devModePlugin,
    ],
});

/**
 * Create express application
 * @type {Function}
 */
const app = express();

/**
 * Setup express logger
 */
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
}));

/**
 * Create express server
 */

app.get('/', (req, res) => {
    console.log(req.query) // TODO req.query is empty -- Which means the comp might not render???
    const jobs = {
        MyComponent: { name: req.query.name || 'Stranger' }
    };
    renderer.render(jobs).then(html => res.send(html));
});
app.get('/health', (req, res) => {
    return res.status(200).send('OK');
});
app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));

