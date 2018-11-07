import log from "webpack-log";
const logger = log({ name: "core" });

/**
 * @todo Create a class similar to Env and then create helpers for both in macros
 */
const Logger = {
  error: (message: string) => logger.error(message),
  info: (message: string) => logger.info(message),
  warn: (message: string) => logger.warn(message),
};

export default Logger;
