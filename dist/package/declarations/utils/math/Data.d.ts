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
    /** @type {number} */ viewLength: number;
    /** @type {TypedArrayConstructor} */ ViewConstructor: TypedArrayConstructor;
    view: Uint8Array | Int8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
    model: number;
    buffer: ArrayBuffer | undefined;
    resize({ viewLength, viewConstructor }?: {
        viewLength?: number | undefined;
        viewConstructor?: TypedArrayConstructor | undefined;
    }): void;
    /**
     *
     * @param {number} additionalElements
     */
    extend(additionalElements: number): void;
    get singleByteLength(): number;
    get byteLength(): number;
    get array(): number[];
    get size(): number;
    get sum(): number;
    get mean(): number;
    get SSE(): number;
    get modelSSE(): number;
    #private;
}
import { TypedArrayConstructor } from "../../types/index.js";
