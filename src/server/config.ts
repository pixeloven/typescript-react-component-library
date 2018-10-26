import dotenv from "dotenv";

dotenv.config();

export interface Server {
    host: string;
    port: number;
    protocol: string;
}

export interface Config {
    server: Server;
}

/**
 * General configuration for server
 */
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "8080";
const PROTOCOL = process.env.PROTOCOL || "https";
const server: Server = {
    host: HOST,
    port: parseInt(PORT, 10),
    protocol: PROTOCOL,
};

export const config: Config = {
    server,
};
