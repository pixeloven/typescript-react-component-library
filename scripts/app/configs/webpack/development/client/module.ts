import {catchAllRule, scssRule, staticFileRule, typeScriptRule} from "../../common/rules";

const module = {
    rules: [
        // javaScriptSourceMapRule,
        {
            oneOf: [
                staticFileRule,
                // javaScriptRule,
                typeScriptRule,
                scssRule,
                catchAllRule,
            ],
        },
    ],
    strictExportPresence: true,
};

export default module;
