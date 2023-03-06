import { stdin, stdout } from "process"
import { moveCursor, clearLine, createInterface, cursorTo } from "readline"

class CLIManager {
    #widgets; #order; #nonce; #cursor

    constructor({ lineLength = stdout.columns } = {}) {
        this.lines = []
        this.lineLength = lineLength

        this.#widgets = {}
        this.#order = []
        this.#nonce = 0
        this.#cursor = 0
    }

    createWidget(widget, index = this.widgetCount) {
        if (this.#widgets[widget.id]) { return false }
        widget.id = `widget-${this.#nonce ++}`
        this.#widgets[widget.id] = widget
        this.#order.splice(index, 0, widget.id)
        return this.#renderWidget(widget)
    }

    readWidget(identifier) {
        const id = typeof identifier === "string" ? identifier
            : this.#order[identifier]
        return this.#widgets[id]
    }

    updateWidget(widget) {
        if (!this.#widgets[widget.id]) { return false }
        return this.#renderWidget(widget)
    }

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
        for (let i = 0; i < count; i ++) {
            const line = this.lines[start + i]
            clearLine(stdout, 0)
            rl.write(`${line}`)
            const { rows, cols } = rl.getCursorPos()
            for (let i = 0; i < rows; i ++) {
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
            rl.write(`\n`)
        }
        moveCursor(stdout, 0, this.lines.length - start - count)
        this.#cursor = this.lines.length
        rl.close()
        return true
    }

    #renderWidget(widget) {
        const index = this.#getWidgetLineIndex(widget)
        this.lines.splice(index, widget.previousLineCount, ...widget.lines)
        const isNewLineCount = widget.previousLineCount === widget.lineCount
        const count = isNewLineCount ? widget.lineCount : undefined
        return this.render(index, count)
    }

    #unrenderWidget(widget) {
        const index = this.#getWidgetLineIndex(widget)
        this.lines.splice(index, widget.previousLineCount)
        return index
    }

    #getWidgetLineIndex(widget) {
        const index = this.#order.indexOf(widget.id)
        let widgetLineIndex = 0
        for (let i = 0; i < index; i ++) {
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

export { CLIManager }