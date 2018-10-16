import * as WebpackDevServer from "webpack-dev-server";
import {Environments} from "./env";

// TODO Should get some of this from .env
// TODO process.env should be injected???
const DEFAULT_HOST = process.env.HOST || "0.0.0.0";
const DEFAULT_PORT = parseInt(process.env.PORT || "8080", 10);
const DEFAULT_PROTOCOL = process.env.PROTOCOL || "http";

export type Proxy = WebpackDevServer.ProxyConfigMap | WebpackDevServer.ProxyConfigArray | undefined;

export interface Server {
    host: string;
    port: number;
    protocol: string;
}

export interface Servers extends Environments {
    development: Server;
    production: Server;
}

const servers: Servers = {
    development: {
        host: DEFAULT_HOST,
        port: DEFAULT_PORT,
        protocol: DEFAULT_PROTOCOL,
    },
    production: {
        host: DEFAULT_HOST,
        port: DEFAULT_PORT,
        protocol: DEFAULT_PROTOCOL,
    },
};

export default servers;
