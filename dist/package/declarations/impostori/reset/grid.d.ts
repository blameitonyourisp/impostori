/**
 *
 * @memberof module:reset
 * @param {Grid} grid
 * @returns {Grid}
 */
export function resetGrid(grid: Grid, hard?: boolean): Grid;
export function hardResetGrid(grid: Grid): Grid;
export function softResetGrid(grid: Grid): Grid;
import { Grid } from "../../types/index.js";
