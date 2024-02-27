/**
 *
 * @param {GridCell} cell
 */
export function serializeCell(cell: GridCell): BitBuffer;
/**
 *
 * @param {BitBuffer} buffer
 * @param {number} index
 * @returns {GridCell}
 */
export function deserializeCell(buffer: BitBuffer, index: number): GridCell;
/**
 *
 * @param {GridCell} cell
 * @param {number} value
 * @returns {CellCandidate}
 */
export function getCandidate(cell: GridCell, value: number): CellCandidate;
import { GridCell } from "../../types/index.js";
import { BitBuffer } from "../../utils/index.js";
import { CellCandidate } from "../../types/index.js";
