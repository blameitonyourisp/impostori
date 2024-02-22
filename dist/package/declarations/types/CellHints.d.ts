/**
 * Cell hints as will appear in the final puzzle, each member array contains a
 * subset of values from 1 to 6.
 */
export type CellHints = {
    /**
     * - Array length 1 containing detective hints.
     */
    detective: number[];
    /**
     * - Array length 2 containing worker hints.
     */
    worker: number[];
    /**
     * - Array length 3 containing imposter hints.
     */
    imposter: number[];
};
/**
 * @file CellHints type declaration.
 * @author James Reid
 */
/**
 * Cell hints as will appear in the final puzzle, each member array contains a
 * subset of values from 1 to 6.
 *
 * @typedef {object} CellHints
 * @property {number[]} detective - Array length 1 containing detective hints.
 * @property {number[]} worker - Array length 2 containing worker hints.
 * @property {number[]} imposter - Array length 3 containing imposter hints.
 */
/**
 * @ignore
 * @type {CellHints}
 */
export let CellHints: CellHints;
