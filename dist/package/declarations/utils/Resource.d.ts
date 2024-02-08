/**
 * @class
 * @summary x
 */
export class Resource {
    /**
     * @constructor
     * @summary x
     *
     * @param {string} url
     */
    constructor(url: string);
    url: string;
    /**
     * @method
     * @summary x
     *
     * @param {string} relativePath
     * @returns {object}
     */
    absolutePath(relativePath: string): object;
    /**
     * @method
     * @summary x
     *
     * @param {string} absolutePath
     * @returns {string} Relative path from current directory to
     */
    relativePath(absolutePath: string): string;
    /**
     * @type {string}
     */
    get __pathname(): string;
    /**
     * @type {string}
     */
    get __dirname(): string;
    /**
     * @description Returns filename
     * @type {string}
     */
    get __filename(): string;
}
