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
// TODO need to figure out how to truly define these
    // Also need to re-write the hypernova client
declare module "hypernova-client";
declare module "hypernova-client/plugins/devModePlugin";
declare module "hypernova-react";
declare module "hypernova/server";
declare module "storybook-readme";

/**
 * Global types
 */
type Optional<T> = T | undefined;
