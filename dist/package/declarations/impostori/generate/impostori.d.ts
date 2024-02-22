export const PUZZLE_VERSION: "1.0.0";
export type IMPOSTORI_GRADES = ImpostoriGrade;
export namespace IMPOSTORI_GRADES {
    let beginner: ImpostoriGrade;
    let easy: ImpostoriGrade;
    let medium: ImpostoriGrade;
    let hard: ImpostoriGrade;
    let expert: ImpostoriGrade;
}
/**
 *
 * @param {number} [seed]
 * @returns {Impostori}
 */
export function generateImpostori(seed?: number | undefined): Impostori;
/**
 *
 * @param {number} uniformEntropy
 * @returns {number}
 */
export function getRating(uniformEntropy: number): number;
/**
 *
 * @param {number} rating
 * @returns {ImpostoriGrade}
 */
export function getGradeString(rating: number): ImpostoriGrade;
import { ImpostoriGrade } from "../../types/index.js";
import { Impostori } from "../../types/index.js";
