import {Environments} from "./env";

interface WebpackConfigs extends Environments {
    development: {
        config: string;
    };
    production: {
        config: string;
    };
}

const webpack: WebpackConfigs = {
    development: {
        config: "config/webpack.config.development.js",
    },
    production: {
        config: "config/webpack.config.production.js",
    },
};

export default webpack;
