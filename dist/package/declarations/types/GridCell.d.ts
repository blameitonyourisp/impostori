/**
 * Object containing all data for a cell required to generate a grid,
 * solve a puzzle and to display a puzzle. This includes mainly data identifying
 * the position of the cell in the grid, data identifying the contents of the
 * cell, and data identifying adjacency relationships with neighboring cells.
 *
 * Position data is initialized at the start of grid generation, and does
 * not change during the course of generation. All other data is initialized
 * in a default state, and is subject to change during generation.
 */
export type GridCell = {
    /**
     * - Cell index in grid ranged 0 to 35
     */
    index: number;
    /**
     * - Row index of cell ranged 0 to 5
     */
    row: number;
    /**
     * - Column index of cell ranged 0 to 5
     */
    column: number;
    /**
     * - Box index of cell ranged 0 to 5
     */
    box: number;
    /**
     * - Shuffled array of all possible cell
     * values from 1 to 6, when generating grid, cell will be filled randomly
     * with values from this array
     */
    candidates: CellCandidate[];
    /**
     * - Completed grid cell value ranged 1 to 6 - value
     * is initiated to 0 during grid creation and when brute force solving an
     * incomplete grid
     */
    value: number;
    /**
     * - Completed grid
     * cell type - initiated to "VACANT" during grid creation and when brute
     * force solving an incomplete grid
     */
    type: CellType;
    /**
     * - Cell hints as will appear in the final puzzle;
     * each member array contains a subset of values from 1 to 6
     */
    hints: {
        detective: number[];
        worker: number[];
        imposter: number[];
    };
    /**
     * - Object describing the existing adjacent
     * indexes of a cell. All possible adjacent cell indexes are included on a
     * cell object in its initial state. During grid creation, when
     * {@link Adjacency Adjacencies} are removed, these changes are reflected
     * on this object by removing the relevant raw adjacent indexes. Note that
     * these are only cell indexes which directly point to other cells in the
     * grid, and should not be confused with {@link Adjacency }
     */
    adjacentIndexes: {
        all: number[];
        required: number[];
        optional: number[];
        type: {
            detective: number[];
            worker: number[];
            imposter: number[];
            vacant: number[];
        };
    };
};
/**
 * Object containing all data for a cell required to generate a grid,
 * solve a puzzle and to display a puzzle. This includes mainly data identifying
 * the position of the cell in the grid, data identifying the contents of the
 * cell, and data identifying adjacency relationships with neighboring cells.
 *
 * Position data is initialized at the start of grid generation, and does
 * not change during the course of generation. All other data is initialized
 * in a default state, and is subject to change during generation.
 *
 * @summary Object containing all required data for a each grid cell
 *
 * @typedef {object} GridCell
 * @property {number} index - Cell index in grid ranged 0 to 35
 * @property {number} row - Row index of cell ranged 0 to 5
 * @property {number} column - Column index of cell ranged 0 to 5
 * @property {number} box - Box index of cell ranged 0 to 5
 * @property {CellCandidate[]} candidates - Shuffled array of all possible cell
 *      values from 1 to 6, when generating grid, cell will be filled randomly
 *      with values from this array
 * @property {number} value - Completed grid cell value ranged 1 to 6 - value
 *      is initiated to 0 during grid creation and when brute force solving an
 *      incomplete grid
 * @property {CellType} type - Completed grid
 *      cell type - initiated to "VACANT" during grid creation and when brute
 *      force solving an incomplete grid
 *
 * @property {object} hints - Cell hints as will appear in the final puzzle;
 *      each member array contains a subset of values from 1 to 6
 * @property {number[]} hints.detective - Hint array length 1
 * @property {number[]} hints.worker - Hint array length 2
 * @property {number[]} hints.imposter - Hint array length 3
 *
 * @property {object} adjacentIndexes - Object describing the existing adjacent
 *      indexes of a cell. All possible adjacent cell indexes are included on a
 *      cell object in its initial state. During grid creation, when
 *      {@link Adjacency Adjacencies} are removed, these changes are reflected
 *      on this object by removing the relevant raw adjacent indexes. Note that
 *      these are only cell indexes which directly point to other cells in the
 *      grid, and should not be confused with {@link Adjacency}
 * @property {number[]} adjacentIndexes.all - All adjacent cell indexes
 * @property {number[]} adjacentIndexes.required - Adjacent cell indexes flagged
 *      as required for example between an imposter and a detective cell
 * @property {number[]} adjacentIndexes.optional - Adjacent cell indexes flagged
 *      as optional - these may be randomly pruned during grid creation in
 *      order to produce a unique grid with fewer adjacencies. Initially all
 *      adjacent indexes are considered to be optional
 *
 * @property {object} adjacentIndexes.type - Adjacent indexes filtered by type
 *      of adjacent cell
 * @property {number[]} adjacentIndexes.type.detective - Adjacent indexes of
 *      detective cells
 * @property {number[]} adjacentIndexes.type.worker - Adjacent indexes of
 *      imposter cells
 * @property {number[]} adjacentIndexes.type.imposter - Adjacent indexes of
 *      worker cells
 * @property {number[]} adjacentIndexes.type.vacant - Adjacent indexes of cells
 *      without a type
 */
/**
 * @ignore
 * @type {GridCell}
 */
export let GridCell: GridCell;
import { CellCandidate } from "./CellCandidate.js";
import { CellType } from "./CellType.js";
