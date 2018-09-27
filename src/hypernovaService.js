const path = require('path');
const hypernova = require('hypernova/server');

hypernova({
    devMode: true,
    endpoint: '/batch',
    host: 'api.local',
    getComponent: hypernova.createGetComponent({
        MyComponent: path.resolve(path.join('src', 'MyComponent.ssr.js')),
    }),

    port: 8081,
});

// TODO update to typescript? might need node-ts
// TODO mmaybe this belows somewhere else????
// Also the client router maybe needs to be somwehere else???
    /// Think maybe like sections for server vs client
// TODO standarize ports for all this
    // Should use a .env for all this... can manage with ansible???
// TODO definitely move this stuff somewhere else
