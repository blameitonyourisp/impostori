/** @license MIT */
// Copyright (c) 2022 James Reid. All rights reserved.
//
// This source code file is licensed under the terms of the MIT license, a copy
// of which may be found in the LICENSE.md file in the root of this repository.  
// 
// For a template copy of the license see one of the following 3rd party sites:
//      * <https://opensource.org/licenses/MIT>
//      * <https://choosealicense.com/licenses/mit>
//      * <https://spdx.org/licenses/MIT>

// @ts-check

// @imports-local
import { Random } from "../utils/math/Random.js"
import { removeTwins } from "./adjacency/index.js"
import { generateEmptyGrid } from "./generate/index.js"
import { fillGridHints } from "./hint/index.js"
import { fillGridTypes, validateGridTypes } from "./type/index.js"
import { resetGrid } from "./reset/index.js"
import { solveGrid } from "./solve/index.js"
import { fillGridValues } from "./value/index.js"
// @imports-types
import { Impostori } from "../types/_index.js"

// @body
/**
 * 
 * @function
 * @static
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
        typeGrid?.typeIndexes.detective.length != 6 ||
        typeGrid?.typeIndexes.worker.length != 12 ||
        typeGrid?.typeIndexes.imposter.length != 18
    ) {
        typeGrid = grid
        typeGrid = fillGridTypes(typeGrid)
    }

    grid = fillGridHints(typeGrid) //

    if (validateGridTypes(grid)) { 
        const solvedGrid = solveGrid(resetGrid(grid))
        if (solvedGrid.grids.length != 1) { console.log("f") }
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

/**
 * This is a longer description
 * @function
 * @inner
 * @summary test
 * @param {*} random 
 */
const generateSolution = random => {

}

// @exports
export { generateImpostori }