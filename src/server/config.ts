/**
 * General configuration for both client and renderer services
 */
export interface Server {
    HOST: string;
    PORT: number;
}

export interface Config {
    CLIENT: Server;
}

export const config: Config = {
    CLIENT: {
        HOST: "0.0.0.0",
        PORT: 8000,
    },
};
