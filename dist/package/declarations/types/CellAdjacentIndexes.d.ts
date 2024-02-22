/**
 * Object describing the existing adjacent indexes of a cell. All possible
 * adjacent cell indexes are included on a cell object in its initial state.
 * During grid creation, when {@link Adjacency Adjacencies} are removed, these
 * changes are reflected on this object by removing the relevant raw adjacent
 * indexes. Note that these are only cell indexes which directly point to other
 * cells in the grid, and should not be confused with {@link Adjacency }.
 */
export type CellAdjacentIndexes = {
    /**
     * - All adjacent cell indexes.
     */
    all: number[];
    /**
     * - Adjacent cell indexes flagged as required for
     * example between an imposter and a detective cell.
     */
    required: number[];
    /**
     * - Adjacent cell indexes flagged as optional.
     * These may be randomly pruned during grid creation in order to produce a
     * unique grid with fewer adjacencies. Initially all adjacent indexes are
     * considered to be optional.
     */
    optional: number[];
    /**
     * - Adjacent indexes filtered by type.
     */
    type: AdjacentIndexTypeFilter;
};
/**
 * Object describing the existing adjacent indexes of a cell. All possible
 * adjacent cell indexes are included on a cell object in its initial state.
 * During grid creation, when {@link Adjacency Adjacencies} are removed, these
 * changes are reflected on this object by removing the relevant raw adjacent
 * indexes. Note that these are only cell indexes which directly point to other
 * cells in the grid, and should not be confused with {@link Adjacency}.
 *
 * @typedef {object} CellAdjacentIndexes
 * @property {number[]} all - All adjacent cell indexes.
 * @property {number[]} required - Adjacent cell indexes flagged as required for
 *      example between an imposter and a detective cell.
 * @property {number[]} optional - Adjacent cell indexes flagged as optional.
 *      These may be randomly pruned during grid creation in order to produce a
 *      unique grid with fewer adjacencies. Initially all adjacent indexes are
 *      considered to be optional.
 * @property {AdjacentIndexTypeFilter} type - Adjacent indexes filtered by type.
 */
/**
 * @ignore
 * @type {CellAdjacentIndexes}
 */
export let CellAdjacentIndexes: CellAdjacentIndexes;
import { AdjacentIndexTypeFilter } from "./AdjacentIndexTypeFilter.js";
