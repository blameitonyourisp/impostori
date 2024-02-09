export type Grid = {
    cells: GridCell[];
    typeIndexes: {
        detective: number[];
        worker: number[];
        imposter: number[];
        vacant: number[];
    };
    adjacencyIDs: {
        required: Set<number>;
        optional: Set<number>;
        deleted: Set<number>;
    };
    random: Random;
    isGenerating: boolean;
};
/**
 *
 * @typedef {object} Grid
 * @property {GridCell[]} cells
 *
 * @property {object} typeIndexes
 * @property {number[]} typeIndexes.detective
 * @property {number[]} typeIndexes.worker
 * @property {number[]} typeIndexes.imposter
 * @property {number[]} typeIndexes.vacant
 *
 * @property {object} adjacencyIDs
 * @property {Set.<number>} adjacencyIDs.required
 * @property {Set.<number>} adjacencyIDs.optional
 * @property {Set.<number>} adjacencyIDs.deleted
 *
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
import { Random } from "../utils/index.js";
