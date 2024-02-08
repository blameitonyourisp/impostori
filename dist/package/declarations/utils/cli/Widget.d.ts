export class CLIWidget {
    static decorate(string: any, ...modifiers: any[]): {
        raw: any;
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
    protected id: any;
    /** @protected */
    protected tabSize: number;
    previousLineCount: number;
    register(index: any): boolean;
    unregister(): boolean;
    createLine({ id, string, tabs, deferRender, index }?: {
        id?: string | undefined;
        string?: string | undefined;
        tabs?: number | undefined;
        deferRender?: boolean | undefined;
        index?: number | undefined;
    }): boolean;
    readLine(id: any): any;
    updateLine({ id, string, tabs, deferRender }?: {
        id: any;
        string?: string | undefined;
        tabs?: number | undefined;
        deferRender?: boolean | undefined;
    }): boolean;
    deleteLine(id: any, deferRender?: string): boolean;
    render(): boolean;
    get lineCount(): number;
    get lines(): Generator<any, void, unknown>;
    get tab(): string;
    get registered(): boolean;
    #private;
}
import { CLIManager } from "./Manager.js";
