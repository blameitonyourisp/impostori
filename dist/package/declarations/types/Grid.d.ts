export type Grid = {
    cells: GridCell[];
    typeIndexes: GridTypeIndexes;
    adjacencyIDs: GridAdjacencyIds;
    random: Random;
    isGenerating: boolean;
};
/**
 *
 * @typedef {object} Grid
 * @property {GridCell[]} cells
 * @property {GridTypeIndexes} typeIndexes
 * @property {GridAdjacencyIds} adjacencyIDs
 * @property {Random} random
 * @property {boolean} isGenerating
 */
/**
 *
 * @ignore
 * @type {Grid}
 */
export let Grid: Grid;
import { GridCell } from "./GridCell.js";
import { GridTypeIndexes } from "./GridTypeIndexes.js";
import { GridAdjacencyIds } from "./GridAdjacencyIds.js";
import { Random } from "../utils/index.js";
