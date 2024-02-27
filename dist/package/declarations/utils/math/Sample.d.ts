export class Sample {
    /**
     *
     * @param {number[]} data
     * @returns {SampleStatistics}
     */
    static getStatistics(data: number[]): SampleStatistics;
    /**
     * Sorts array of numbers using basic quicksort algorithm. See here for more
     * details (https://en.wikipedia.org/wiki/Quicksort). Please note that the
     * algorithm below is implemented using iteration rather than recursion in
     * order to avoid exceeding maximum stack size.
     *
     * @param {number[]} data
     * @returns {number[]}
     */
    static quicksort(data: number[]): number[];
    /**
     *
     * @param {number[]} [data=[]]
     */
    constructor(data?: number[] | undefined);
    /**
     *
     * @param {number[]} data
     */
    set data(data: number[]);
    /**
     *
     * @returns {number[]}
     */
    get data(): number[];
    /**
     *
     * @param {number[]} [data=[]]
     */
    extend(data?: number[] | undefined): void;
    /**
     *
     * @param {number} factor
     */
    removeOutliers(factor?: number): void;
    /**
     *
     * @returns {SampleStatistics}
     */
    get statistics(): SampleStatistics;
    #private;
}
import { SampleStatistics } from "../../types/index.js";
