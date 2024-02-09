export class CLIManager {
    constructor({ lineLength }?: {
        lineLength?: number | undefined;
    });
    lines: string[];
    lineLength: number;
    /**
     *
     * @param {CLIWidget} widget
     * @param {number} index
     * @returns {boolean}
     */
    createWidget(widget: CLIWidget, index?: number): boolean;
    /**
     *
     * @param {string|number} id
     * @returns {CLIWidget}
     */
    readWidget(id: string | number): CLIWidget;
    /**
     *
     * @param {CLIWidget} widget
     * @returns {boolean}
     */
    updateWidget(widget: CLIWidget): boolean;
    /**
     *
     * @param {CLIWidget} widget
     * @returns {boolean}
     */
    deleteWidget(widget: CLIWidget): boolean;
    render(start?: number, count?: number): boolean;
    get widgetCount(): number;
    #private;
}
import { CLIWidget } from "./Widget.js";
