export type Impostori = {
    grid: Grid;
    seed: number;
    version: string;
    rawEntropy: number;
    correctedEntropy: number;
    rating: number;
    grade: string;
    serializedString: string;
};
/**
 *
 * @typedef {object} Impostori
 * @property {Grid} grid
 * @property {number} seed
 * @property {string} version
 * @property {number} rawEntropy
 * @property {number} correctedEntropy
 * @property {number} rating
 * @property {string} grade
 * @property {string} serializedString
 */
/**
 * @ignore
 * @type {Impostori}
 */
export let Impostori: Impostori;
import { Grid } from "./Grid.js";
