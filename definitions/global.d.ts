/**
 * Declare file formats not covered by typescript automatically
 */
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.md";

/**
 * Declare packages not explicitly defined
 * @description Consult DefinitelyTyped before declaring below
 * http://definitelytyped.org/
 */
declare module "chalk";
declare module "react-dev-utils/checkRequiredFiles";
declare module "react-dev-utils/clearConsole";
declare module "react-dev-utils/FileSizeReporter";
declare module "react-dev-utils/formatWebpackMessages";
declare module "react-dev-utils/openBrowser";
declare module "react-dev-utils/printBuildError";
declare module "react-dev-utils/printHostingInstructions";
declare module "react-dev-utils/WebpackDevServerUtils";
declare module "@config/paths";
declare module "@config/webpack.config.dev";
declare module "@config/webpack.config.prod";
declare module "@config/webpackDevServer.config";
declare module "storybook-readme";

/**
 * Global types
 */
type Optional<T> = T | undefined;
