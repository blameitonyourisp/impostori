/**
 *
 * @param {Impostori} impostori
 */
export function serializeImpostori(impostori: Impostori): string;
/**
 *
 * @param {string} serializedString
 */
export function deserializeImpostori(serializedString: string): {
    rating: number;
    grade: import("../../types/ImpostoriGrade.js").ImpostoriGrade;
    serializedString: string;
    grid: import("../../types/Grid.js").Grid;
    seed: number;
    version: {
        puzzle: string;
        repository: string;
    };
    rawEntropy: number;
    normalizedEntropy: number;
    uniformEntropy: number;
};
import { Impostori } from "../../types/Impostori.js";
