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
declare module "interpolate-html-plugin";
declare module "react-dev-utils/errorOverlayMiddleware";
declare module "react-dev-utils/clearConsole";
declare module "react-dev-utils/FileSizeReporter";
declare module "react-dev-utils/formatWebpackMessages";
declare module "react-dev-utils/ignoredFiles";
declare module "react-dev-utils/noopServiceWorkerMiddleware";
declare module "react-dev-utils/openBrowser";
declare module "react-dev-utils/printBuildError";
declare module "react-dev-utils/printHostingInstructions";
declare module "react-dev-utils/InterpolateHtmlPlugin";
declare module "react-dev-utils/ModuleScopePlugin";
declare module "react-dev-utils/WatchMissingNodeModulesPlugin";
declare module "react-dev-utils/WebpackDevServerUtils";
declare module "storybook-readme";
declare module "tsconfig-paths-webpack-plugin";

/**
 * Global types
 */
type Optional<T> = T | undefined;
