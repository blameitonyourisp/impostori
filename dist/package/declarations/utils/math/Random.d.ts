/**
 * @file Seeded random number generator.
 * @author James Reid
 */
/**
 * Seeded prng implemented using BBS algorithm. For more information on this
 * algorithm, see here (https://en.wikipedia.org/wiki/Blum_Blum_Shub).
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
     * @param {number} count
     * @returns {number}
     */
    jump(count: number): number;
    /**
     *
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    jumpRandom(min?: number, max?: number): number;
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
