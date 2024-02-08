/**
 *
 * @param {Grid} grid
 * @param {CellType} type
 * @param {?number} index
 */
export function continuosTypeIndexes(grid: Grid, type: CellType, index?: number | null, any?: boolean): number[];
/**
 *
 * @param {Grid} grid
 * @param {CellType} type
 */
export function allContinuosTypeIndexes(grid: Grid, type: CellType): number[][];
import { Grid } from "../../types/index.js";
import { CellType } from "../../types/index.js";
