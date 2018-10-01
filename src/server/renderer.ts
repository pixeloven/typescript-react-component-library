import {renderReact} from "hypernova-react";
import hypernova from "hypernova/server";

const bundle = {}; // TODO Need to create bundle in webpack... index.ts as entry point

const PORT = 8001;
const HOST = "0.0.0.0";

hypernova({
    devMode: true,
    endpoint: "/batch",
    getComponent(name: string) {
        for (const componentName in bundle) {
            if (componentName === name && bundle.hasOwnProperty(componentName)) {
                return renderReact(componentName, bundle[componentName]);
            }
        }
        return undefined;
    },
    host: HOST,
    port: PORT,
});
