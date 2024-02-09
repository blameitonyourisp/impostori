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
 * @file Progress bar cli widget.
 * @author James Reid
 */

// @ts-check

// @@imports-module
import { CLIManager } from "./Manager.js"
import { CLIWidget } from "./Widget.js"

// @@body
class ProgressWidget extends CLIWidget {
    // /** @type {number} */ #startTime
    /** @type {number} */ #lastUpdate
    // /** @type {number} */ #progress

    constructor({
        manager = new CLIManager(),
        startOps = 0,
        endOps = 100,
        description = "",
        startTime = Date.now(),
        updateInterval = 15
    } = {}) {
        super({ manager })

        // turn current ops into a proxy which updates progress etc when updated
        // maintain startOps for better time calcs
        // add pause and resume functionality
        // add ability to start an op and end an op in order to calculate ops
        // better ie nextOp options
        this.currentOps = startOps
        this.endOps = endOps
        this.nextOp = startOps

        this.description = description
        this.startTime = startTime
        this.updateInterval = updateInterval

        this.#lastUpdate = Date.now() - updateInterval

        // this.#update(this.createLine)
        this.createLine(this.#statusLine())
        this.createLine(this.#percentageLine())
        this.createLine(this.#barLine())
    }

    /**
     *
     * @param {number} ops
     * @returns {boolean}
     */
    increment(ops = 1) {
        if (this.complete) { return false }
        this.currentOps += ops
        const now = Date.now()
        if (now - this.#lastUpdate >= this.updateInterval || this.complete) {
            this.#lastUpdate = now
            return this.#update()
        }
        return true
    }

    /**
     *
     * @returns {number}
     */
    next() {
        if (this.completeQueue) { return - 1 }
        return this.nextOp++
    }

    #update() {
        this.updateLine(this.#statusLine())
        this.updateLine(this.#percentageLine())
        this.updateLine(this.#barLine())
        return true
    }

    #statusLine() {
        const counter = this.#counterString()

        const length = this.manager.lineLength -
            1 - this.tabSize - counter.length
        const isShort = this.description.length <= length
        const description = isShort ? `${this.description}:`.padEnd(length + 1)
            : `${this.description.slice(length - 3)}...:`

        const string = `${description}${this.tab}${counter}`
        return { id: "status", string, deferRender: true }
    }

    #percentageLine() {
        const startTime = this.#timeStringStart().string
        const endTime = this.#timeStringEnd().string
        const percentage = this.#percentageString().string

        const averageTime = this.#timeStringAverage()
        // cannot use whitespace escape since color escapes
        const regex = new RegExp(
            `${" ".repeat(averageTime.raw.length)}(?= [^ ])`
        )

        const length = this.manager.lineLength - this.tabSize * 2 - 22
        const progress = Math.floor(length * this.progress)
        const bar = (this.progress < 0.1 ? "%%" : "%%%")
            .padStart(progress)
            .padEnd(length)
            .replace(/(?:%+)|(?: %+$)/, percentage)
            .replace(regex, averageTime.string)

        const string = `${this.tab}${startTime} ${bar} ${endTime}${this.tab}`
        return { id: "percentage", string, deferRender: true }
    }

    #barLine() {
        const elapsedTime = this.#timeStringElapsed().string
        const remainingTime = this.#timeStringRemaining().string

        const length = this.manager.lineLength - this.tabSize * 2 - 22
        const progress = Math.floor(length * this.progress)
        const barCompleted = CLIWidget.decorate(
            "█".repeat(progress),
            CLIWidget.modifiers.fgColors.green
        ).string
        const barRemaining = CLIWidget.decorate(
            "░".repeat(length - progress),
            CLIWidget.modifiers.fgColors.gray
        ).string
        const bar = `${barCompleted}${barRemaining}`

        const string =
            `${this.tab}${elapsedTime} ${bar} ${remainingTime}${this.tab}`
        return { id: "bar", string, deferRender: false }
    }

    #counterString() {
        return `(${this.currentOps}/${this.endOps})`
    }

    #percentageString() {
        const string = `${Math.floor(this.progress * 100)}%`
        const modifiers = [CLIWidget.modifiers.fgColors.green]
        return CLIWidget.decorate(string, ...modifiers)
    }

    #timeStringStart() {
        const date = new Date(this.startTime)
        return this.#dateTimeString(date)
    }

    #timeStringEnd() {
        const date = new Date(Date.now() + this.remainingMs)
        return this.#dateTimeString(date)
    }

    #timeStringElapsed() {
        return this.#msTimeString(this.elapsedMs, "-")
    }

    #timeStringRemaining() {
        return this.#msTimeString(this.remainingMs, "+")
    }

    #timeStringAverage() {
        const ms = this.averageMs
        const string = ms < 10 ? `(${ms.toFixed(3)}ms/op)`
            : ms < 100 ? `(${ms.toFixed(2)}ms/op)`
            : ms < 1000 ? `(${ms.toFixed(1)}ms/op)`
            : ms < 10000 ? `(${(ms / 1000).toFixed(3)}s/op)`
            : ms < 100000 ? `(${(ms / 1000).toFixed(2)}s/op)`
            : ms < 1000000 ? `(${(ms / 1000).toFixed(1)}s/op)`
            : `(${(ms / 1000).toFixed(0)}s/op)`
        const modifiers = [CLIWidget.modifiers.fgColors.gray]
        return CLIWidget.decorate(string, ...modifiers)
    }

    /**
     *
     * @param {Date} date
     * @returns
     */
    #dateTimeString(date) {
        const string = `[${ProgressWidget.formatDate(date)}]`
        const modifiers = [CLIWidget.modifiers.fgColors.gray]
        return CLIWidget.decorate(string, ...modifiers)
    }

    /**
     *
     * @param {number} ms
     * @param {string} leadChar
     * @returns
     */
    #msTimeString(ms, leadChar) {
        const string = `${leadChar} ${ProgressWidget.formatMs(ms)}`
        const modifiers = [
            CLIWidget.modifiers.fgColors.magenta,
            CLIWidget.modifiers.decorations.dim
        ]
        return CLIWidget.decorate(string, ...modifiers)
    }

    // #msStart() {

    // }

    // #msEnd() {

    // }

    get elapsedMs() {
        return Date.now() - this.startTime
    }

    get remainingMs() {
        const ms = Math.round(this.elapsedMs / this.progress - this.elapsedMs)
        if (Number.isFinite(ms)) { return ms }
        return 0
    }

    get averageMs() {
        return this.elapsedMs / this.currentOps
    }

    get ms() {
        // add start ms and end ms
        // const elapsed = () => this.elapsedMs
        return {
            // get elapsed() {},
            // get remaining() {
            //     // return
            // }
        }
    }

    get progress() {
        // this.#progress ||= 1
        return this.currentOps / this.endOps

        // return {
        //     completed: this.currentOps,
        //     remaining: this.endOps - this.currentOps,
        //     total: this.endOps,
        //     decimal: this.currentOps / this.endOps
        // }
    }

    get complete() {
        return this.currentOps === this.endOps
    }

    get completeQueue() {
        return this.nextOp === this.endOps
    }

    // set currentOps(value) {

    // }

    /**
     *
     * @param {number} ms
     * @returns {string}
     */
    static formatMs(ms) {
        const [MS_HOUR, MS_MIN, MS_SEC] = [1000 * 60 * 60, 1000 * 60, 1000]
        const hours = `${Math.floor(ms / MS_HOUR) % 60}`.padStart(2, "0")
        const minutes = `${Math.floor(ms / MS_MIN) % 60}`.padStart(2, "0")
        const seconds = `${Math.floor(ms / MS_SEC) % 60}`.padStart(2, "0")
        return `${hours}:${minutes}:${seconds}`
    }

    /**
     *
     * @param {Date} date
     * @returns {string}
     */
    static formatDate(date) {
        const locale = /** @type {Intl.LocalesArgument} */ ("en-GB")
        const format = /** @type {Intl.DateTimeFormatOptions} */ ({
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })
        return date.toLocaleTimeString(locale, format)
    }
}

// @@exports
export { ProgressWidget }
