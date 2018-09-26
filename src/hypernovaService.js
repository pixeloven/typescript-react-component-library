const hypernova = require('hypernova/server');

hypernova({
    devMode: true,

    getComponent(name) {
        if (name === 'MyComponent.js') {
            return require('./app/assets/javascripts/MyComponent.js');
        }
        return null;
    },

    port: 3030,
});

// TODO update to typescript? might need node-ts
// TODO mmaybe this belows somewhere else????
// Also the client router maybe needs to be somwehere else???
    /// Think maybe like sections for server vs client
