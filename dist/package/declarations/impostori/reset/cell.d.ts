/**
 *
 * @param {GridCell} cell
 * @returns {GridCell}
 */
export function resetCell(cell: GridCell, hard?: boolean): GridCell;
export function softResetCell(cell: GridCell): GridCell;
export function hardResetCell(cell: GridCell): GridCell;
import { GridCell } from "../../types/index.js";
