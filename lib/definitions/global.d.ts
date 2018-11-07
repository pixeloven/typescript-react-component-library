/**
 * Global types
 */
declare type Environment = "development" | "production" | "test";
declare type Optional<T> = T | undefined;

declare interface Window {
    devToolsExtension: () => () => void;
}
