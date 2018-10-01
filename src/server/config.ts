/**
 * General configuration for both client and renderer services
 */
export interface Server {
    HOST: string;
    PORT: number;
}

export interface Config {
    CLIENT: Server;
    RENDERER: Server;
}

export const config: Config = {
    CLIENT: {
        HOST: "0.0.0.0",
        PORT: 8000,
    },
    RENDERER: {
        HOST: "0.0.0.0",
        PORT: 8001,
    },
};
