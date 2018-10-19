import path from "path";

/**
 * This is a custom Jest transformer turning style imports into empty objects.
 * @url http://facebook.github.io/jest/docs/en/webpack.html
 */
export default {
    process(src: string, filename: string): string {
        return `module.exports = ${JSON.stringify(path.basename(filename))};`;
    },
};
