import * as WebpackDevServer from "webpack-dev-server";
import env, {Environments} from "./env";

// TODO Should get some of this from .env
// TODO process.env should be injected???
const DEFAULT_HOST = env.HOST;
const DEFAULT_PORT = parseInt(env.PORT, 10);
const DEFAULT_PROTOCOL = env.PROTOCOL;

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
