import dotenv from "dotenv";
export type Environment = "development" | "production";

export interface Environments {
    development: object;
    production: object;
}

dotenv.config();

/**
 * Define default values here
 */
interface Env extends NodeJS.ProcessEnv {
    HOST: string;
    PORT: string;
    PROTOCOL: string;
    PUBLIC_URL: string;
    NODE_ENV: string;
    NODE_PATH: string;
}

const envDefaults: Env = {
    HOST: "0.0.0.0",
    NODE_ENV: "development",
    NODE_PATH: "",
    PORT: "8080",
    PROTOCOL: "http",
    PUBLIC_URL: "",
};

const env: Env = Object.assign(envDefaults, process.env);

export default env;
