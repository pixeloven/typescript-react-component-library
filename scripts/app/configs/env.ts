import dotenv from "dotenv";
export type Environment = "development" | "production";

export interface Environments {
    development: object;
    production: object;
}

dotenv.config(); // TODO This doesn't seem to read in the .env

/**
 * Define default values here
 */
interface Env extends NodeJS.ProcessEnv {
    GENERATE_SOURCEMAP: string;
    HOST: string;
    PORT: string;
    PROTOCOL: string;
    PUBLIC_URL: string;
    NODE_ENV: string;
    NODE_PATH: string;
}

const envDefaults: Env = {
    GENERATE_SOURCEMAP: "true",
    HOST: "0.0.0.0",
    NODE_ENV: "development",
    NODE_PATH: "",
    PORT: "8080",
    PROTOCOL: "http",
    PUBLIC_URL: "",
};

const env: Env = Object.assign(envDefaults, process.env);

export default env;
