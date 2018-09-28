'use strict';

const express = require('express'); // implicit from hypernova
const expressWinston = require('express-winston');
const winston = require('winston');
const Renderer = require('hypernova-client'); // TODO doesn't support typescript
const devModePlugin = require('hypernova-client/plugins/devModePlugin');

const PORT = 8000;
const HOST = '0.0.0.0';
const SERVER_PORT = 8001;
const SERVER_HOST = '0.0.0.0';

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
    const jobs = {
        Example: { name: req.query.name || 'Stranger' }
    };
    renderer.render(jobs).then(html => res.send(html));
});
app.get('/health', (req, res) => {
    return res.status(200).send('OK');
});
app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));

