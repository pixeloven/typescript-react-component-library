import Application from "../../../../Application";
import files from "../../../files";

const output = {
    filename: files.outputPattern.jsServer,
    path: Application.buildPath,
    publicPath: Application.servedPath,
};

export default output;
