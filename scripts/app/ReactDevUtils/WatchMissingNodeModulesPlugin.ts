/**
 * @class WatchMissingNodeModulesPlugin
 * @description This was copied from react-dev-utils/WatchMissingNodeModulesPlugin.js created by FaceBook.
 * To facilitate TypeScript it was re-written to be maintained here.
 *
 * This Webpack plugin ensures `npm install <library>` forces a project rebuild.
 * We’re not sure why this isn't Webpack's default behavior.
 * See https://github.com/facebookincubator/create-react-app/issues/186.
 *
 */
import {Compiler} from "webpack";

class WatchMissingNodeModulesPlugin {

    /**
     * @var Path to node modules
     */
    protected nodeModulesPath: string;

    /**
     * Constructor
     * @param nodeModulesPath
     */
    constructor(nodeModulesPath: string) {
        this.nodeModulesPath = nodeModulesPath;
    }

    /**
     * Apply plugin to compiler
     * @param compiler
     */
    public apply(compiler: Compiler): void {
        compiler.plugin("emit", (compilation, callback) => {
            const missingDeps = compilation.missingDependencies;
            const nodeModulesPath = this.nodeModulesPath;
            // If any missing files are expected to appear in node_modules...
            if (missingDeps.some((file: string) => file.indexOf(nodeModulesPath) !== -1)) {
                // ...tell webpack to watch node_modules recursively until they appear.
                compilation.contextDependencies.push(nodeModulesPath);
            }
            callback();
        });
    }
}

export default WatchMissingNodeModulesPlugin;
