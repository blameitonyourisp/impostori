/**
 * @file Seeded random number generator.
 * @author James Reid
 */
export class Random {
    /**
     *
     * @returns {number}
     */
    static seed(): number;
    /**
     *
     * @param {*} float
     * @param {*} min
     * @param {*} max
     * @returns {number}
     */
    static floatToRangedInteger(float: any, min: any, max: any): number;
    /**
     *
     * @param {*} seed
     * @param {*} primeP
     * @param {*} primeQ
     */
    constructor(seed?: any, primeP?: any, primeQ?: any);
    config: {
        seed: any;
        primeP: any;
        primeQ: any;
        divisor: number;
    };
    state: {
        iteration: number;
        iteratedSeed: any;
    };
    /**
     *
     * @returns {number}
     */
    iterate(): number;
    /**
     *
     * @param {*} min
     * @param {*} max
     * @returns {number}
     */
    prng(min?: any, max?: any): number;
    /**
     *
     * @template T
     * @param {T[]} array
     * @returns {T[]}
     */
    shuffleArray<T>([...array]: T[]): T[];
    /**
     *
     * @param {*} length
     * @param {*} startOne
     * @returns {number[]}
     */
    shuffledIndexArray(length: any, startOne?: any): number[];
}
