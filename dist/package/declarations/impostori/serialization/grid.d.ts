/**
 *
 * @param {Grid} grid
 * @returns {BitBuffer}
 */
export function serializeGrid(grid: Grid): BitBuffer;
/**
 *
 * @param {BitBuffer} buffer
 * @param {number} seed
 * @returns {Grid}
 */
export function deserializeGrid(buffer: BitBuffer, seed: number): Grid;
import { Grid } from "../../types/index.js";
import { BitBuffer } from "../../utils/index.js";
