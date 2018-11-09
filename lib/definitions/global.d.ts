/**
 * Global types
 */
declare type Environment = "development" | "production" | "test";
declare type Message = string | string[];
declare type Optional<T> = T | undefined;

declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => string;
}
