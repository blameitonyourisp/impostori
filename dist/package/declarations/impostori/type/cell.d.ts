export type CELL_TYPES = CellType;
export namespace CELL_TYPES {
    let detective: CellType;
    let worker: CellType;
    let imposter: CellType;
    let vacant: CellType;
}
/**
 *
 * @param {GridCell} cell
 * @param {CellType} type
 * @returns {GridCell}
 */
export function fillCellType(cell: GridCell, type: CellType): GridCell;
import { CellType } from "../../types/index.js";
import { GridCell } from "../../types/index.js";
