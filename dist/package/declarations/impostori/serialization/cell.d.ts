/**
 *
 * @param {GridCell} cell
 */
export function serializeCell(cell: GridCell): BitBuffer;
/**
 *
 * @param {number} index
 * @param {BitBuffer} buffer
 * @returns {GridCell}
 */
export function deserializeCell(index: number, buffer: BitBuffer): GridCell;
import { GridCell } from "../../types/index.js";
import { BitBuffer } from "../../utils/index.js";
