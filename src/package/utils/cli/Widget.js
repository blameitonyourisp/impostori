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
 * @file Cli widget class.
 * @author James Reid
 */

// @ts-check

// @@imports-module
import { CLIManager } from "./Manager.js"

// @@body
class CLIWidget {
    /** @type {Object.<string,string>}*/ #lines
    /** @type {string[]} */ #order
    /** @type {number} */ #nonce
    /** @type {boolean} */ #registered

    constructor({
        manager = new CLIManager(),
        tabSize = 4
    } = {}) {
        /** @protected */
        this.manager = manager
        /** @protected */
        this.tabSize = tabSize

        this.id = ""
        this.previousLineCount = 0

        this.#lines = {}
        this.#order = []
        this.#nonce = 0
        this.#registered = false
    }

    /**
     *
     * @param {number} [index]
     * @returns {boolean}
     */
    register(index) {
        this.#registered = this.manager.createWidget(this, index)
        return this.#registered
    }

    unregister() {
        const unregistered = this.manager.deleteWidget(this)
        if (!unregistered) { return false }
        this.#registered = false
        this.previousLineCount = 0
        return true
    }

    createLine({
        id = `string-${this.#nonce++}`,
        string = "",
        tabs = 0,
        deferRender = false,
        index = this.lineCount
    } = {}) {
        if (this.#lines[id]) { return false }
        string = this.#formatLineString(string, tabs)
        this.#lines[id] = string
        this.#order.splice(index, 0, id)
        return deferRender ? true : this.render()
    }

    /**
     *
     * @param {string|number} id
     * @returns {string}
     */
    readLine(id) {
        id = typeof id === "string" ? id : this.#order[id]
        return this.#lines[id] || ""
    }

    /**
     *
     * @param {object} obj
     * @param {string} obj.id
     * @param {string} [obj.string]
     * @param {number} [obj.tabs]
     * @param {boolean} [obj.deferRender]
     * @returns {boolean}
     */
    updateLine({
        id,
        string = "",
        tabs = 0,
        deferRender = false
    }) {
        id = typeof id === "string" ? id : this.#order[id]
        if (!this.#lines[id]) { return false }
        string = this.#formatLineString(string, tabs)
        this.#lines[id] = string
        return deferRender ? true : this.render()
    }

    /**
     *
     * @param {string} id
     * @param {boolean} deferRender
     * @returns {boolean}
     */
    deleteLine(id, deferRender = false) {
        id = typeof id === "string" ? id : this.#order[id]
        if (!this.#lines[id]) { return false }
        const index = this.#order.indexOf(id)
        delete this.#lines[id]
        this.#order.splice(index, 1)
        return deferRender ? true : this.render()
    }

    render() {
        if (!this.#registered) { this.previousLineCount = this.lineCount }
        const rendered = this.manager.updateWidget(this)
        if (!rendered) { return false }
        this.previousLineCount = this.lineCount
        return true
    }

    /**
     *
     * @param {string} string
     * @param {number} tabs
     * @returns {string}
     */
    #formatLineString(string, tabs = 0) {
        return `${this.tab.repeat(tabs)}${string}`
    }

    get lineCount() {
        return this.#order.length
    }

    get lines() {
        return (/** @this {CLIWidget} */ function* () {
            for (const id of this.#order) {
                yield this.#lines[id]
            }
        }).call(this)
    }

    get tab() {
        return `${" ".repeat(this.tabSize)}`
    }

    get registered() {
        return this.#registered
    }

    /**
     *
     * @param {string} string
     * @param  {string[]} modifiers
     * @returns {{raw:string, string:string}}
     */
    static decorate(string, ...modifiers) {
        let compoundModifier = ""
        for (const modifier of modifiers) {
            compoundModifier = `${compoundModifier}${modifier}`
        }
        const reset = "\x1b[0m"
        return {
            raw: string,
            string: `${compoundModifier}${string}${reset}`
        }
    }

    static get modifiers() {
        return modifiers
    }
}

/**
 * @const {object} modifiers
 * @property {Object.<string,string>}
 */
const modifiers = {
    fgColors: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        gray: "\x1b[90m"
    },

    bgColors: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        gray: "\x1b[100m"
    },

    decorations: {
        reset: "\x1b[0m",
        bright: "\x1b[1m",
        dim: "\x1b[2m",
        underline: "\x1b[4m",
        blink: "\x1b[5m",
        reverse: "\x1b[7m",
        hidden: "\x1b[8m"
    }
}

// @@exports
export { CLIWidget }
