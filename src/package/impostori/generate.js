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
 * @file Redundant generate impostori file - FOR REMOVAL
 * @author James Reid
 */

// @ts-check

// @@imports-package
import { removeTwins, generateEmptyGrid } from "./generate/index.js"
import { fillGridHints } from "./hint/index.js"
import { fillGridTypes, validateGridTypes } from "./type/index.js"
import { resetGrid } from "./reset/index.js"
import { solveGrid } from "./solve/index.js"
import { fillGridValues } from "./value/index.js"

// @@imports-utils
import { Random } from "../utils/math/Random.js"

// @imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Impostori } from "../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body

// REDUNDANT FILE!

/**
 *
 * @param {number} [seed]
 * @returns {Impostori}
 */
const generateImpostori = seed => {
    const random = new Random(seed)
    let grid
    let typeGrid

    grid = generateEmptyGrid(random)
    grid = fillGridValues(grid)
    grid = removeTwins(grid)

    while (
        typeGrid?.typeIndexes.detective.length !== 6 ||
        typeGrid?.typeIndexes.worker.length !== 12 ||
        typeGrid?.typeIndexes.imposter.length !== 18
    ) {
        typeGrid = grid
        typeGrid = fillGridTypes(typeGrid)
    }

    grid = fillGridHints(typeGrid)

    if (validateGridTypes(grid)) {
        const solvedGrid = solveGrid(resetGrid(grid))
        if (solvedGrid.grids.length !== 1) { console.log("f") }
    }

    return {
        grid,
        seed: random.config.seed,
        version: "1.0.0",
        rawEntropy: 0,
        correctedEntropy: 0,
        rating: 0,
        grade: "",
        serializedString: ""
    }
}

// @@exports
export { generateImpostori }
