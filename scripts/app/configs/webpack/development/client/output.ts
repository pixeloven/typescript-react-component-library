import path from "path";
import {DevtoolModuleFilenameTemplateInfo} from "webpack";

const output = {
    chunkFilename: "static/js/[name].chunk.js",
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: (info: DevtoolModuleFilenameTemplateInfo) =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
    filename: "static/js/bundle.js",
    pathinfo: true,
    publicPath: "/",
};

export default output;
