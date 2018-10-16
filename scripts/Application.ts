import * as fs from "fs";
import * as path from "path";
import * as WebpackDevServer from "webpack-dev-server";
import FileNotFoundException from "./exceptions/FileNotFoundException";

export type Enviroment = "development" | "production";
export type Proxy = WebpackDevServer.ProxyConfigMap | WebpackDevServer.ProxyConfigArray | undefined;

export interface Package {
    name: string;
    homepage: string;
    proxy?: Proxy;
}

// TODO move to another file and create one for dev and one for prod
export interface Config {
    file: {
        entryPoint: {
            client: string;
            public: string;
            server: string;
        };
        lock: string;
        package: string;
    };
    path: {
        app: string;
        build: string;
        config: string;
        modules: string;
        public: string;
    };
}

export const config: Config = {
    file: {
        entryPoint: {
            client: "src/client/index.tsx",
            public: "public/index.html",
            server: "src/server/index.ts",
        },
        lock: "yarn.lock",
        package: "package.json",
    },
    path: {
        app: "src",
        build: "build",
        config: "config",
        modules: "node_modules",
        public: "public",
    },
};

// TODO process.env should be injected???
class Application {

    /**
     * Return configuration for specific environment
     * @param env
     */
    public static config(env: Enviroment): string {
        return "";
    }

    /**
     * Return Application name
     * @returns {string}
     */
    public static get appName(): string {
        return Application.package.name;
    }

    /**
     * Return build path
     * @returns {string}
     */
    public static get buildPath(): string {
        return Application.resolvePath(config.path.build);
    }

    /**
     * Return proxy settings
     * @description This is specifically for our development server
     * @returns {Proxy}
     */
    public static get proxySettings(): Proxy {
        return Application.package.proxy;
    }

    /**
     * Return public entry point
     * @returns {string}
     */
    public static get publicEntryPoint(): string {
        return Application.resolvePath(config.file.entryPoint.public);
    }

    /**
     * Return public path
     * @returns {string}
     */
    public static get publicPath(): string {
        return Application.resolvePath(config.path.public);
    }

    /**
     * Return public url
     * @returns {string}
     */
    public static get publicUrl(): string {
        return process.env.PUBLIC_URL || Application.package.homepage;
    }

    /**
     * Return Application name
     * @returns {string}
     */
    public static get clientEntryPoint(): string {
        return Application.resolvePath(config.file.entryPoint.client);
    }

    /**
     * Return Application name
     * @returns {string}
     */
    public static get serverEntryPoint(): string {
        return Application.resolvePath(config.file.entryPoint.server);
    }

    /**
     * Application process path
     * @return {string}
     */
    public static get processPath(): string {
        return fs.realpathSync(process.cwd());
    }

    /**
     * Return Application name
     * @returns {string}
     */
    public static get package(): Package {
        const absolutePath = Application.resolvePath(config.file.package);
        return require(absolutePath);
    }

    /**
     * Resolve relative path
     * @param relativePath
     * @param strict if true returns
     */
    public static resolvePath(relativePath: string, strict: boolean = true): string {
        const absolutePath = path.resolve(Application.processPath, relativePath);
        if (strict && !fs.existsSync(absolutePath)) {
            throw new FileNotFoundException(`No such file or directory ${absolutePath}.`);
        }
        return absolutePath;
    }

    /**
     * Check if we are using yarn or another package manager.
     * @return {boolean}
     */
    public static get usingYarn(): boolean {
        return config.file.lock.includes("yarn");
    }
}

export default Application;
