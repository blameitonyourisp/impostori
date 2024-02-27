// Copyright (c) 2024 James Reid. All rights reserved.
//
// This source code file is licensed under the terms of the MIT license, a copy
// of which may be found in the LICENSE.md file in the root of this repository.
//
// For a template copy of the license see one of the following 3rd party sites:
//      - <https://opensource.org/licenses/MIT>
//      - <https://choosealicense.com/licenses/mit>
//      - <https://spdx.org/licenses/MIT>

/**
 * @file Utility function for calculating cumulative normal probabilities.
 * @author James Reid
 */

// @ts-check

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { NormalCdfMode } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/** @enum {NormalCdfMode} */
const NORMAL_CDF_MODES = {
    above: /** @type {NormalCdfMode} */ (""),
    below: /** @type {NormalCdfMode} */ ("worker"),
    between: /** @type {NormalCdfMode} */ ("imposter"),
    outside: /** @type {NormalCdfMode} */ ("vacant")
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
const normalCdf = ({
    upper = Infinity,
    lower = - Infinity,
    mean = 0,
    stdDev = 1,
    precision = 5,
    mode = NORMAL_CDF_MODES.below
} = {}) => {
    upper = (upper - mean) / stdDev
    lower = (lower - mean) / stdDev
    precision = Math.min(Math.max(precision, 1), 100)

    switch (mode) {
        case NORMAL_CDF_MODES.between:
            const cdfUpper = normalCdf({ upper, precision: precision + 1 })
            const cdfLower = normalCdf({
                upper: lower,
                precision: precision + 1
            })
            return parseFloat((cdfUpper - cdfLower).toPrecision(precision))
        case NORMAL_CDF_MODES.outside:
            const cdfOut = 1 - normalCdf({
                upper,
                lower,
                mode: NORMAL_CDF_MODES.between,
                precision
            })
            return parseFloat(cdfOut.toPrecision(precision))
        case NORMAL_CDF_MODES.above:
            const cdfAbove = 1 - normalCdf({ upper: lower, precision })
            return parseFloat((cdfAbove).toPrecision(precision))
        default:
            if (upper === Infinity) { return 1 }
            if (upper === - Infinity) { return 0 }

            let [last, current] = [0, 1]
            let [taylorSum, count] = [0, 0]

            while (last.toPrecision(precision) !==
            current.toPrecision(precision)) {
                let countFactorial = 1
                for (let i = 0; i < count; i++) { countFactorial *= i + 1 }

                taylorSum += (- 1) ** count * (upper ** (2 * count + 1)) /
                    ((2 * count + 1) * 2 ** count * countFactorial)

                last = current
                current = 0.5 + (1 / Math.sqrt(2 * Math.PI)) * taylorSum

                count++
            }

            return parseFloat(current.toPrecision(precision))
    }
}

// @@exports
export { NORMAL_CDF_MODES, normalCdf }
