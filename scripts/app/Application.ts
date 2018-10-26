import fs from "fs";
import path from "path";
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
// TODO once paths.js is removed we should remove the help getters and rely on just resolving from a config
class Application {

    /**
     * Return public url
     * @returns {string}
     */
    public static get publicUrl(): string {
        return process.env.PUBLIC_URL || "/"; // TODO need to enforce these env vars
    }

    /**
     * Return Application name
     * @returns {string}
     */
    public static get clientEntryPoint(): string {
        return Application.resolvePath(files.entryPoint.client);
    }

    /**
     * Node modules path
     * @return {string}
     */
    public static get nodeModulesPath(): string {
        return Application.resolvePath(paths.modules);
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
        return require(Application.packagePath);
    }

    /**
     * Return Application name
     * @returns {string}
     */
    public static get packagePath(): string {
        return Application.resolvePath(files.package);
    }

    /**
     * Return src path
     * @returns {string}
     */
    public static get srcPath(): string {
        return Application.resolvePath(paths.src);
    }

    /**
     * Return ts config
     * @returns {string}
     */
    public static get tsConfig(): string {
        return Application.resolvePath(files.tsConfig);
    }

    /**
     * Return server configuration for specific environment
     * @param env
     */
    public static server(env: Environment): Server {
        return servers[env] as Server;
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
}

export default Application;
