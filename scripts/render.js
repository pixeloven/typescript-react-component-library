'use strict';

const hypernova = require('hypernova/server');
const renderReact = require('hypernova-react').renderReact;
const bundle = require('../build/static/js/main.2b130a80');

const PORT = 8001;
const HOST = '0.0.0.0';

hypernova({
    devMode: true,
    endpoint: '/batch',
    getComponent(name) {
        for (let componentName in bundle) {
            if (componentName === name && bundle.hasOwnProperty(componentName)) {
                return renderReact(componentName, bundle[componentName]);
            }
        }
        return null;
    },
    host: HOST,
    port: PORT,
});

/*

  getComponent(name) {
    for (let componentName in bundle) {
      if (name === componentName) {
        return renderReact(componentName, bundle[componentName]);
      }
    }
 */
