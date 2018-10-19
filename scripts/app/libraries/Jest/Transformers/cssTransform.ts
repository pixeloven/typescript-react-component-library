/**
 * This is a custom Jest transformer turning style imports into empty objects.
 * @url http://facebook.github.io/jest/docs/en/webpack.html
 */
export default {
    process(): string {
        return "module.exports = {};";
    },
    getCacheKey(): string {
        // The output is always the same.
        return "cssTransform";
    },
};
