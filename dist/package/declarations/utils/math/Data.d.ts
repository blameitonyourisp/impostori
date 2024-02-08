/**
 * univariate
 */
export class Data {
    /**
     *
     * @param {number[]} [data=[]]
     * @param {object} options
     * @param {number} [options.viewLength=data.length]
     * @param {TypedArrayConstructor} [options.viewConstructor=Float32Array]
     * @param {number} [options.model=0]
     */
    constructor(data?: number[] | undefined, { viewLength, viewConstructor, model }?: {
        viewLength?: number | undefined;
        viewConstructor?: TypedArrayConstructor | undefined;
        model?: number | undefined;
    });
    model: number;
    viewLength: any;
    viewConstructor: any;
    buffer: ArrayBuffer | undefined;
    view: any;
    resize({ viewLength, viewConstructor }?: {
        viewLength?: any;
        viewConstructor?: any;
    }): void;
    extend(additionalElements: any): void;
    get singleByteLength(): number;
    get byteLength(): number;
    get array(): any[];
    get size(): any;
    get sum(): number;
    get mean(): number;
    get SSE(): number;
    get modelSSE(): number;
    #private;
}
import { TypedArrayConstructor } from "../../types/index.js";
