export class CLIWidget {
    /**
     *
     * @param {string} string
     * @param  {string[]} modifiers
     * @returns {{raw:string, string:string}}
     */
    static decorate(string: string, ...modifiers: string[]): {
        raw: string;
        string: string;
    };
    static get modifiers(): {
        fgColors: {
            black: string;
            red: string;
            green: string;
            yellow: string;
            blue: string;
            magenta: string;
            cyan: string;
            white: string;
            gray: string;
        };
        bgColors: {
            black: string;
            red: string;
            green: string;
            yellow: string;
            blue: string;
            magenta: string;
            cyan: string;
            white: string;
            gray: string;
        };
        decorations: {
            reset: string;
            bright: string;
            dim: string;
            underline: string;
            blink: string;
            reverse: string;
            hidden: string;
        };
    };
    constructor({ manager, tabSize }?: {
        manager?: CLIManager | undefined;
        tabSize?: number | undefined;
    });
    /** @protected */
    protected manager: CLIManager;
    /** @protected */
    protected tabSize: number;
    id: string;
    previousLineCount: number;
    /**
     *
     * @param {number} [index]
     * @returns {boolean}
     */
    register(index?: number | undefined): boolean;
    unregister(): boolean;
    createLine({ id, string, tabs, deferRender, index }?: {
        id?: string | undefined;
        string?: string | undefined;
        tabs?: number | undefined;
        deferRender?: boolean | undefined;
        index?: number | undefined;
    }): boolean;
    /**
     *
     * @param {string|number} id
     * @returns {string}
     */
    readLine(id: string | number): string;
    /**
     *
     * @param {object} obj
     * @param {string} obj.id
     * @param {string} [obj.string]
     * @param {number} [obj.tabs]
     * @param {boolean} [obj.deferRender]
     * @returns {boolean}
     */
    updateLine({ id, string, tabs, deferRender }: {
        id: string;
        string?: string | undefined;
        tabs?: number | undefined;
        deferRender?: boolean | undefined;
    }): boolean;
    /**
     *
     * @param {string} id
     * @param {boolean} deferRender
     * @returns {boolean}
     */
    deleteLine(id: string, deferRender?: boolean): boolean;
    render(): boolean;
    get lineCount(): number;
    get lines(): Generator<string, void, unknown>;
    get tab(): string;
    get registered(): boolean;
    #private;
}
import { CLIManager } from "./Manager.js";
