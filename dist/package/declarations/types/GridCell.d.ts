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
     * - Cell index in grid ranged 0 to 35.
     */
    index: number;
    /**
     * - Row index of cell ranged 0 to 5.
     */
    row: number;
    /**
     * - Column index of cell ranged 0 to 5.
     */
    column: number;
    /**
     * - Box index of cell ranged 0 to 5.
     */
    box: number;
    /**
     * - Shuffled array of all possible cell
     * values from 1 to 6, when generating grid, cell will be filled randomly
     * with values from this array.
     */
    candidates: CellCandidate[];
    /**
     * - Completed grid cell value ranged 1 to 6. Value
     * is initiated to 0 during grid creation and when brute force solving an
     * incomplete grid.
     */
    value: number;
    /**
     * - Value of cell chosen by client.
     */
    clientValue: number;
    /**
     * - Completed grid cell type.
     */
    type: CellType;
    /**
     * - Cell hints as will appear in the final puzzle.
     */
    hints: CellHints;
    /**
     * - Object describing the
     * existing adjacent indexes of a cell.
     */
    adjacentIndexes: CellAdjacentIndexes;
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
 * @property {number} index - Cell index in grid ranged 0 to 35.
 * @property {number} row - Row index of cell ranged 0 to 5.
 * @property {number} column - Column index of cell ranged 0 to 5.
 * @property {number} box - Box index of cell ranged 0 to 5.
 * @property {CellCandidate[]} candidates - Shuffled array of all possible cell
 *      values from 1 to 6, when generating grid, cell will be filled randomly
 *      with values from this array.
 * @property {number} value - Completed grid cell value ranged 1 to 6. Value
 *      is initiated to 0 during grid creation and when brute force solving an
 *      incomplete grid.
 * @property {number} clientValue - Value of cell chosen by client.
 * @property {CellType} type - Completed grid cell type.
 * @property {CellHints} hints - Cell hints as will appear in the final puzzle.
 * @property {CellAdjacentIndexes} adjacentIndexes - Object describing the
 *      existing adjacent indexes of a cell.
 */
/**
 * @ignore
 * @type {GridCell}
 */
export let GridCell: GridCell;
import { CellCandidate } from "./CellCandidate.js";
import { CellType } from "./CellType.js";
import { CellHints } from "./CellHints.js";
import { CellAdjacentIndexes } from "./CellAdjacentIndexes.js";
