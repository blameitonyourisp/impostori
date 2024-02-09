/**
 * @class
 * @summary x
 */
export class Resource {
    /**
     *
     * @param {string} url
     */
    constructor(url: string);
    url: string;
    /**
     *
     * @param {string} relativePath
     * @returns {string}
     */
    absolutePath(relativePath: string): string;
    /**
     *
     * @param {string} absolutePath
     * @returns {string}
     */
    relativePath(absolutePath: string): string;
    /**
     *
     * @type {string}
     */
    get __pathname(): string;
    /**
     *
     * @type {string}
     */
    get __dirname(): string;
    /**
     *
     * @type {string}
     */
    get __filename(): string;
}
