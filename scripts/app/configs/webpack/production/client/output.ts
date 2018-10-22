import path from "path";
import {DevtoolModuleFilenameTemplateInfo} from "webpack";
import Application from "../../../../Application";
import files from "../../../files";

const output = {
    chunkFilename: files.outputPattern.jsChunk,
    devtoolModuleFilenameTemplate: (info: DevtoolModuleFilenameTemplateInfo) =>
        path
            .relative(Application.srcPath, info.absoluteResourcePath)
            .replace(/\\/g, "/"),
    filename: files.outputPattern.js,
    path: `${Application.buildPath}/public`,
    publicPath: Application.servedPath,

};

export default output;
