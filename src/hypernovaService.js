'use strict';

const path = require('path');
const hypernova = require('hypernova/server');

const PORT = 8001;
const HOST = '0.0.0.0';

hypernova({
    devMode: true,
    endpoint: '/batch',
    getComponent: hypernova.createGetComponent({
        MyComponent: path.resolve(path.join('./src/MyComponent.js')),
    }),
    host: HOST,
    port: PORT,
});

/*
const renderReact = require('hypernova-react').renderReact;
  getComponent(name) {
    for (let componentName in bundle) {
      if (name === componentName) {
        return renderReact(componentName, bundle[componentName]);
      }
    }
 */
