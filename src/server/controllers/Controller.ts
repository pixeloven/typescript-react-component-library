import {Config} from "../config";

/**
 * Base controller
 */
class Controller {

    protected config: Config;

    /**
     * Constructor
     * @param config
     */
    constructor(config: Config) {
        this.config = config;
    }
}

export default Controller;
