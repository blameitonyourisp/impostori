export type NORMAL_CDF_MODES = NormalCdfMode;
export namespace NORMAL_CDF_MODES {
    let above: NormalCdfMode;
    let below: NormalCdfMode;
    let between: NormalCdfMode;
    let outside: NormalCdfMode;
}
/**
 * Implements normal cumulative distribution function approximation using taylor
 * series expansion. See the following links for information on the formula
 * used:
 *  - {@link https://en.wikipedia.org/wiki/Normal_distribution Normal distribution}
 *  - {@link https://en.wikipedia.org/wiki/Cumulative_distribution_function Normal cdf}
 *  - {@link https://math.stackexchange.com/questions/2223296/cdf-of-standard-normal/2223472#2223472 Taylor series expansion}
 *  - {@link https://onlinestatbook.com/2/calculators/normal_dist.html Online calculator}
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
