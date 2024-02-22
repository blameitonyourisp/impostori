/**
 * Adjacent indexes of a cell filtered by type of adjacent cell.
 */
export type AdjacentIndexTypeFilter = {
    /**
     * - Adjacent indexes of detective cells.
     */
    detective: number[];
    /**
     * - Adjacent indexes of imposter cells.
     */
    worker: number[];
    /**
     * - Adjacent indexes of worker cells.
     */
    imposter: number[];
    /**
     * - Adjacent indexes of cells without a type.
     */
    vacant: number[];
};
/**
 * @file AdjacentIndexTypeFilter type declaration.
 * @author James Reid
 */
/**
 * Adjacent indexes of a cell filtered by type of adjacent cell.
 *
 * @typedef {object} AdjacentIndexTypeFilter
 * @property {number[]} detective - Adjacent indexes of detective cells.
 * @property {number[]} worker - Adjacent indexes of imposter cells.
 * @property {number[]} imposter - Adjacent indexes of worker cells.
 * @property {number[]} vacant - Adjacent indexes of cells without a type.
 */
/**
 * @ignore
 * @type {AdjacentIndexTypeFilter}
 */
export let AdjacentIndexTypeFilter: AdjacentIndexTypeFilter;
