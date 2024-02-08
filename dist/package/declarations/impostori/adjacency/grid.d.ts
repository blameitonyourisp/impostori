/**
 *
 * @param {Adjacency} adjacency
 * @param {Grid} grid
 * @returns {Grid}
 */
export function removeGridAdjacency(adjacency: Adjacency, grid: Grid): Grid;
/**
 *
 * @param {Adjacency} adjacency
 * @param {Grid} grid
 * @returns {Grid}
 */
export function addGridAdjacency(adjacency: Adjacency, grid: Grid): Grid;
/**
 *
 * @param {Adjacency} adjacency
 * @param {Grid} grid
 * @returns {Grid}
 */
export function requireGridAdjacency(adjacency: Adjacency, grid: Grid): Grid;
/**
 * Returns an adjacency object given either 2 (assumed adjacent) cell indexes,
 * or one adjacency id value. This allows the missing information to be inferred
 * in order to reconstruct the adjacency object with upper and lower cell
 * indexes, and adjacency id.
 *
 * @see Adjacency
 * @param {...number} args - Takes either 2 adjacency cell indexes (ranged from
 *      0 to 35), or 1 adjacency id value (range 0001 to 3435)
 * @returns {Adjacency}
 */
export function getAdjacencyData(...args: number[]): Adjacency;
import { Adjacency } from "../../types/index.js";
import { Grid } from "../../types/index.js";
