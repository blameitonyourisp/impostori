export type NORMAL_CDF_MODES = NormalCdfMode;
export namespace NORMAL_CDF_MODES {
    let above: NormalCdfMode;
    let below: NormalCdfMode;
    let between: NormalCdfMode;
    let outside: NormalCdfMode;
}
/**
 *
 * @param {object} obj
 * @param {number} [obj.upper=Infinity]
 * @param {number} [obj.lower=-Infinity]
 * @param {number} [obj.mean=0]
 * @param {number} [obj.stdDev=1]
 * @param {number} [obj.precision=5]
 * @param {string} [obj.mode="below"]
 * @returns {number}
 */
export function normalCdf({ upper, lower, mean, stdDev, precision, mode }?: {
    upper?: number | undefined;
    lower?: number | undefined;
    mean?: number | undefined;
    stdDev?: number | undefined;
    precision?: number | undefined;
    mode?: string | undefined;
}): number;
import { NormalCdfMode } from "../../types/index.js";
