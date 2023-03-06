import path from "path"
import { fileURLToPath } from "url"

/**
 * @class
 * @summary x
 */
class Resource {

    /**
     * @constructor
     * @summary x
     * 
     * @param {string} url 
     */
    constructor(url) {
        this.url = url
    }

    /**
     * @method
     * @summary x
     * 
     * @param {string} relativePath 
     * @returns {object}
     */
    absolutePath(relativePath) {
        const absolutePath = path.join(this.__dirname, relativePath)
        return absolutePath
    }

    /**
     * @method
     * @summary x
     * 
     * @param {string} absolutePath 
     * @returns {string} Relative path from current directory to 
     */
    relativePath(absolutePath) {
        const relativePath = path.relative(this.__dirname, absolutePath)
        return relativePath
    }

    /**
     * @type {string}
     */
    get __pathname() { 
        const __pathname = fileURLToPath(this.url)
        return __pathname
    }

    /**
     * @type {string}
     */
    get __dirname() {
        const __dirname = path.dirname(this.__pathname)
        return __dirname
    }

    /**
     * @description Returns filename
     * @type {string}
     */
    get __filename() {
        const __filename = this.__pathname.replace(this.__dirname, "").slice(1)
        return __filename
    }
} 

export  { Resource }