import { env, Environment } from "@pixeloven/core";

env.load();

/**
 * General configuration for server
 */
const HOST = env.config("HOST", "localhost");
const PORT = env.config("PORT", "8080");
const PROTOCOL = env.config("PROTOCOL", "https");
const ENVIRONMENT = env.config("NODE_ENV", "production") as Environment;

export interface Server {
    host: string;
    port: number;
    protocol: string;
}

export interface Config {
    environment: Environment;
    server: Server;
}

const server: Server = {
    host: HOST,
    port: parseInt(PORT, 10),
    protocol: PROTOCOL,
};

/**
 * Define general config
 */
export const config: Config = {
    environment: ENVIRONMENT,
    server,
};
