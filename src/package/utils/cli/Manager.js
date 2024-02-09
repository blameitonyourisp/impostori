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
 * @file Cli widget manager.
 * @author James Reid
 */

// @ts-check

// @@imports-node
import { stdin, stdout } from "process"
import { moveCursor, clearLine, createInterface, cursorTo } from "readline"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { CLIWidget } from "./Widget.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
class CLIManager {
    /** @type {Object.<string, CLIWidget>} */ #widgets
    /** @type {string[]} */ #order
    /** @type {number} */ #nonce
    /** @type {number} */ #cursor

    constructor({ lineLength = stdout.columns } = {}) {
        this.lines = /** @type {string[]} */ ([])
        this.lineLength = lineLength

        this.#widgets = {}
        this.#order = []
        this.#nonce = 0
        this.#cursor = 0
    }

    /**
     *
     * @param {CLIWidget} widget
     * @param {number} index
     * @returns {boolean}
     */
    createWidget(widget, index = this.widgetCount) {
        if (this.#widgets[widget.id]) { return false }
        widget.id ||= `widget-${this.#nonce++}`
        this.#widgets[widget.id] = widget
        this.#order.splice(index, 0, widget.id)
        return this.#renderWidget(widget)
    }

    /**
     *
     * @param {string|number} id
     * @returns {CLIWidget}
     */
    readWidget(id) {
        id = typeof id === "string" ? id
            : this.#order[id]
        return this.#widgets[id]
    }

    /**
     *
     * @param {CLIWidget} widget
     * @returns {boolean}
     */
    updateWidget(widget) {
        if (!this.#widgets[widget.id]) { return false }
        return this.#renderWidget(widget)
    }

    /**
     *
     * @param {CLIWidget} widget
     * @returns {boolean}
     */
    deleteWidget(widget) {
        if (!this.#widgets[widget.id]) { return false }
        const start = this.#unrenderWidget(widget)
        const index = this.#order.indexOf(widget.id)
        this.#order.splice(index, 1)
        delete this.#widgets[widget.id]
        return this.render(start)
    }

    render(start = 0, count = this.lines.length - start) {
        const rl = createInterface({
            input: stdin,
            output: stdout,
            prompt: ""
        })
        moveCursor(stdout, 0, start - this.#cursor)
        for (let i = 0; i < count; i++) {
            const line = this.lines[start + i]
            clearLine(stdout, 0)
            rl.write(`${line}`)
            const { rows, cols } = rl.getCursorPos()
            for (let i = 0; i < rows; i++) {
                clearLine(stdout, 0)
                moveCursor(stdout, this.lineLength - 3 - cols, - 1)
                if (cols) {
                    rl.write("...")
                    clearLine(stdout, 1)
                }
            }
            if (cols > this.lineLength) {
                cursorTo(stdout, this.lineLength - 3)
                clearLine(stdout, 1)
                rl.write("...")
            }
            rl.write("\n")
        }
        moveCursor(stdout, 0, this.lines.length - start - count)
        this.#cursor = this.lines.length
        rl.close()
        return true
    }

    /**
     *
     * @param {CLIWidget} widget
     * @returns {boolean}
     */
    #renderWidget(widget) {
        const index = this.#getWidgetLineIndex(widget)
        this.lines.splice(index, widget.previousLineCount, ...widget.lines)
        const isNewLineCount = widget.previousLineCount === widget.lineCount
        const count = isNewLineCount ? widget.lineCount : undefined
        return this.render(index, count)
    }

    /**
     *
     * @param {CLIWidget} widget
     * @returns {number}
     */
    #unrenderWidget(widget) {
        const index = this.#getWidgetLineIndex(widget)
        this.lines.splice(index, widget.previousLineCount)
        return index
    }

    /**
     *
     * @param {CLIWidget} widget
     * @returns {number}
     */
    #getWidgetLineIndex(widget) {
        const index = this.#order.indexOf(widget.id)
        let widgetLineIndex = 0
        for (let i = 0; i < index; i++) {
            const id = this.#order[i]
            const widget = this.#widgets[id]
            widgetLineIndex += widget.lineCount
        }
        return widgetLineIndex
    }

    get widgetCount() {
        return this.#order.length
    }
}

// @@exports
export { CLIManager }
