import log from "webpack-log";
const logger = log({ name: "core" });

/**
 * Simple wrapper for webpack-log
 * @todo Add a success log state
 */
export const Logger = {
  error: (message: string) => logger.error(message),
  info: (message: string) => logger.info(message),
  warn: (message: string) => logger.warn(message),
};

export default Logger;
