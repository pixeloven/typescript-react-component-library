import {renderReact} from "hypernova-react";
import hypernova from "hypernova/server";
import {config} from "./config";
import {Example} from "./templates";

/**
 * Render per component
 */
hypernova({
    devMode: true,
    endpoint: "/batch",
    getComponent(name: string) {
        return renderReact("Example", Example);
        // TODO figure out how to bundle components so they can be served like below...
        // for (const componentName in bundle) {
        //     if (componentName === name && bundle.hasOwnProperty(componentName)) {
        //         return renderReact(componentName, bundle[componentName]);
        //     }
        // }
        // return undefined;
    },
    host: config.RENDERER.HOST,
    port: config.RENDERER.PORT,
});
