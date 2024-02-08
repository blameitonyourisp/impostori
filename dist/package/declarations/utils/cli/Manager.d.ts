export class CLIManager {
    constructor({ lineLength }?: {
        lineLength?: number | undefined;
    });
    lines: any[];
    lineLength: number;
    createWidget(widget: any, index?: number): boolean;
    readWidget(identifier: any): any;
    updateWidget(widget: any): boolean;
    deleteWidget(widget: any): boolean;
    render(start?: number, count?: number): boolean;
    get widgetCount(): number;
    #private;
}
