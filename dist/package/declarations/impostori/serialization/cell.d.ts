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
import { GridCell } from "../../types/index.js";
import { BitBuffer } from "../../utils/index.js";
