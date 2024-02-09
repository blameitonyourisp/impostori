// Copyright (c) 2024 James Reid. All rights reserved.
//
// This source code file is licensed under the terms of the MIT license, a copy
// of which may be found in the LICENSE.md file in the root of this repository.
//
// For a template copy of the license see one of the following 3rd party sites:
//      - <https://opensource.org/licenses/MIT>
//      - <https://choosealicense.com/licenses/mit>
//      - <https://spdx.org/licenses/MIT>

/**
 * @file Implementation of dirname etc.
 * @author James Reid
 */

// @ts-check

// @@imports-node
import path from "path"
import { fileURLToPath } from "url"

// @@body
/**
 * @class
 * @summary x
 */
class Resource {
    /**
     *
     * @param {string} url
     */
    constructor(url) {
        this.url = url
    }

    /**
     *
     * @param {string} relativePath
     * @returns {string}
     */
    absolutePath(relativePath) {
        const absolutePath = path.join(this.__dirname, relativePath)
        return absolutePath
    }

    /**
     *
     * @param {string} absolutePath
     * @returns {string}
     */
    relativePath(absolutePath) {
        const relativePath = path.relative(this.__dirname, absolutePath)
        return relativePath
    }

    /**
     *
     * @type {string}
     */
    get __pathname() {
        return fileURLToPath(this.url)
    }

    /**
     *
     * @type {string}
     */
    get __dirname() {
        return path.dirname(this.__pathname)
    }

    /**
     *
     * @type {string}
     */
    get __filename() {
        return this.__pathname.replace(this.__dirname, "").slice(1)
    }
}

// @@exports
export { Resource }
