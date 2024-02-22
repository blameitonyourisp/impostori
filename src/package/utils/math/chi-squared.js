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
 * @file Utility function for calculating chi squared statistic of a sample.
 * @author James Reid
 */

// @ts-check

// @@imports-utils
import { DecoratedError } from "../cli/index.js"

// @@body
/**
 *
 * @param {number[]} observed
 * @param {number[]} expected
 * @returns {number}
 */
const chiSquared = (observed, expected) => {
    if (observed.length !== expected.length) {
        throw new DecoratedError({
            name: "StatisticsError",
            message: "Observed and expected frequency arrays not same length",
            "observed-length": observed.length,
            "expected-length": expected.length
        })
    }

    let sum = 0
    for (const [index, frequency] of observed.entries()) {
        sum += (frequency - expected[index]) ** 2 / expected[index]
    }

    return sum
}

// @@exports
export { chiSquared }
