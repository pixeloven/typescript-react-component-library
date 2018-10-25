import * as WebpackDevServer from "webpack-dev-server";
import Env, {Environments} from "./env";

const DEFAULT_HOST = Env.config("HOST", "localhost");
const DEFAULT_PORT = parseInt(Env.config("PORT", "8080"), 10);
const DEFAULT_PROTOCOL = Env.config("PROTOCOL", "https");

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

const development: Server = {
    host: DEFAULT_HOST,
    port: DEFAULT_PORT,
    protocol: DEFAULT_PROTOCOL,
};

const production: Server = {
    host: DEFAULT_HOST,
    port: DEFAULT_PORT,
    protocol: DEFAULT_PROTOCOL,
};

const servers: Servers = {
    development,
    production,
};

export default servers;
