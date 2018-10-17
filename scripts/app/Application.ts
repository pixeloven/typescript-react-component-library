import * as fs from "fs";
import * as path from "path";
import {Environment} from "./configs/env";
import files from "./configs/files";
import paths from "./configs/paths";
import servers, {
    Proxy,
    Server,
} from "./configs/servers";
import FileNotFoundException from "./exceptions/FileNotFoundException";

export interface Package {
    name: string;
    homepage: string;
    proxy?: Proxy;
}

// TODO consolidate this under either source or lib or something else.
class Application {

    /**
     * Return server configuration for specific environment
     * @param env
     */
    public static server(env: Environment): Server {
        return servers[env];
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
        return Application.resolvePath(paths.build);
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
        return Application.resolvePath(files.entryPoint.public);
    }

    /**
     * Return public path
     * @returns {string}
     */
    public static get publicPath(): string {
        return Application.resolvePath(paths.public);
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
        return Application.resolvePath(files.entryPoint.client);
    }

    /**
     * Return Application name
     * @returns {string}
     */
    public static get serverEntryPoint(): string {
        return Application.resolvePath(files.entryPoint.server);
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
        const absolutePath = Application.resolvePath(files.package);
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
     * Return src path
     * @returns {string}
     */
    public static get srcPath(): string {
        return Application.resolvePath(paths.src);
    }

    /**
     * Check if we are using yarn or another package manager.
     * @return {boolean}
     */
    public static get usingYarn(): boolean {
        return files.lock.includes("yarn");
    }
}

export default Application;