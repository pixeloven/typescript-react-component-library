import * as fs from "fs";
import * as path from "path";

class Application {

    public rootDirectory: string;

    /**
     * Application Constructor
     */
    constructor() {
        this.rootDirectory = fs.realpathSync(process.cwd());
    }

    /**
     * Resolve relative path
     * @param relativePath
     */
    public resolve(relativePath: string): string {
        return path.resolve(this.rootDirectory, relativePath);
    }

    /**
     * Return Application name
     * @returns {string}
     */
    get name(): string {
        return require(this.resolve("package.json")).name || "";
    }

    /**
     * Return proxy settings
     * @returns {WebpackDevServer.ProxyConfigMap | WebpackDevServer.ProxyConfigArray}
     */
    get proxySettings(): object {
        return require(this.resolve("package.json")).proxy;
    }
}

export default Application;
