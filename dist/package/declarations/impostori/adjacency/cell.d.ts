/**
 *
 * @param {GridCell} cell
 * @param {GridCell} targetCell
 * @returns {GridCell}
 */
export function removeCellAdjacency(cell: GridCell, targetCell: GridCell): GridCell;
/**
 *
 * @param {GridCell} cell
 * @param {GridCell} targetCell
 * @returns {GridCell}
 */
export function addCellAdjacency(cell: GridCell, targetCell: GridCell): GridCell;
/**
 *
 * @param {GridCell} cell
 * @param {GridCell} targetCell
 * @returns {GridCell}
 */
export function requireCellAdjacency(cell: GridCell, targetCell: GridCell): GridCell;
/**
 * Calculates indexes of all possible orthogonally adjacent hex cells given the
 * index of a center hex cell. Each cell may have up to 6 orthogonally adjacent
 * cells - all indexes out of range (0 to 35) for the grid are omitted, and
 * wrap around indexes are obviously also omitted, as these cells are not
 * adjacent to each other on the grid.
 *
 * Wrap around indexes indexes on the opposite side of the grid when the
 * provided central index is in the leftmost or rightmost column.
 *
 * @param {number} index
 * @returns {number[]}
 */
export function getAdjacentIndexes(index: number): number[];
/**
 *
 * @param {*} index
 * @returns {number}
 */
export function getRow(index: any): number;
/**
 *
 * @param {*} index
 * @returns {number}
 */
export function getColumn(index: any): number;
/**
 *
 * @param {*} index
 * @returns {number}
 */
export function getBox(index: any): number;
import { GridCell } from "../../types/index.js";
