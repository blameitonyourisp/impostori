export type Impostori = {
    grid: Grid;
    seed: number;
    version: {
        puzzle: string;
        repository: string;
    };
    rawEntropy: number;
    normalizedEntropy: number;
    uniformEntropy: number;
    rating: number;
    grade: ImpostoriGrade;
    serializedString: string;
};
/**
 *
 * @typedef {object} Impostori
 * @property {Grid} grid
 * @property {number} seed
 * @property {object} version
 * @property {string} version.puzzle
 * @property {string} version.repository
 * @property {number} rawEntropy
 * @property {number} normalizedEntropy
 * @property {number} uniformEntropy
 * @property {number} rating
 * @property {ImpostoriGrade} grade
 * @property {string} serializedString
 */
/**
 * @ignore
 * @type {Impostori}
 */
export let Impostori: Impostori;
import { Grid } from "./Grid.js";
import { ImpostoriGrade } from "./ImpostoriGrade.js";
