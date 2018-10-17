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
        config: "config/webpack.config.development.ts",
    },
    production: {
        config: "config/webpack.config.production.ts",
    },
};

export default webpack;
