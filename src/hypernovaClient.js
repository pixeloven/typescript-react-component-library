const express = require('express'); // implicit from hypernova
const morgan = require('morgan'); // TODO replace with winston since that's what the server uses
const Renderer = require('hypernova-client');
const devModePlugin = require('hypernova-client/plugins/devModePlugin');

const app = express();

const renderer = new Renderer({
    url: 'http://api.local:8081/batch',
    plugins: [
        devModePlugin,
    ],
});

app.use(morgan('combined'))

app.get('/', (req, res) => {
    const jobs = {
        MyComponent: { name: req.query.name || 'Stranger' }
    };

    renderer.render(jobs).then(html => res.send(html));
});

app.listen(8080, () => console.log('Now listening')); // TODO need to log everything to console

// TODO https://github.com/airbnb/hypernova-node

// Need a client server to make requests to the service
// https://github.com/airbnb/hypernova-react
// Is super light weight. Might need to expand this
// https://medium.com/airbnb-engineering/rearchitecting-airbnbs-frontend-5e213efc24d2
// https://medium.com/airbnb-engineering/server-rendering-code-splitting-and-lazy-loading-with-react-router-v4-bfe596a6af70
// https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9
// TODO multiple package.jsons... one for server and one for not?

// TODO should def be it's own deal
