/**
 *
 * @param {Random} random
 * @returns {Grid}
 */
export function generateEmptyGrid(random: Random): Grid;
/**
 *
 * @param {Random} random
 * @returns {{grid:Grid, rawEntropy:number}}
 */
export function generateGrid(random: Random): {
    grid: Grid;
    rawEntropy: number;
};
import { Random } from "../../utils/index.js";
import { Grid } from "../../types/index.js";
