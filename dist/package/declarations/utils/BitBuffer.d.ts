export class BitBuffer {
    /**
     *
     * @param {string} string
     */
    static from(string: string, secret?: string): Promise<BitBuffer>;
    static "__#5@#b64ToUint24"(string: any): number;
    static "__#5@#uint24ToB64"(uint24: any): string;
    static get "__#5@#MAX_INT"(): number;
    static get "__#5@#dict"(): string;
    static get "__#5@#SizeError"(): {
        new (size: any, operation: any): {
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        };
        captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
        prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
        stackTraceLimit: number;
    };
    static get "__#5@#RangeError"(): {
        new (size: any, offset: any): {
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        };
        captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
        prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
        stackTraceLimit: number;
    };
    static get "__#5@#StringError"(): {
        new (): {
            name: string;
            message: string;
            stack?: string | undefined;
            cause?: unknown;
        };
        captureStackTrace(targetObject: object, constructorOpt?: Function | undefined): void;
        prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
        stackTraceLimit: number;
    };
    constructor({ size, buffer }?: {
        size?: number | undefined;
        buffer?: ArrayBuffer | undefined;
    });
    buffer: ArrayBuffer;
    readPointer: number;
    writePointer: number;
    write(int: any, size: any, offset?: number, strict?: boolean): any;
    writeSequential(int: any, size: any, strict?: boolean): any;
    writeString(string: any, offset?: number, strict?: boolean): any;
    read(size: any, offset?: number, strict?: boolean): number;
    readSequential(size: any, strict?: boolean): number;
    readString(size: any, offset?: number, strict?: boolean): string;
    copy({ target, targetStart, sourceStart, sourceEnd, strict, sync }?: {
        target: any;
        targetStart?: any;
        sourceStart?: number | undefined;
        sourceEnd?: number | undefined;
        strict?: boolean | undefined;
        sync?: boolean | undefined;
    }): any;
    toString(secret?: string): Promise<string>;
    hash(secret?: string): Promise<string>;
    get bitLength(): number;
    get byteLength(): number;
    #private;
}
