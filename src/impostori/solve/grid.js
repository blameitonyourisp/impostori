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

// @imports-module
import { solveCell } from "./cell.js"
// @imports-types
import { Grid } from "../../types/index.js"

// @body
/**
 * 
 * @param {Grid} grid
 * @returns {object}
 */
const solveGrid = grid => {
    let rawEntropy = 0

    let grids = [grid]

    // cause solve to fail if grids length gets too big

    for (let i = 0; i < 36; i ++) {
        rawEntropy += grids.length
        const updatedGrids = []
        for (const grid of grids) { 
            // updatedGrids.push(...solveCell(grid, i)) 
            const vacantIndexes = [...grid.typeIndexes.vacant]
            const orderedIndexes = vacantIndexes.sort((indexA, indexB) => {  
                const candidatesA = grid.cells[indexA].candidates.length
                const candidatesB = grid.cells[indexB].candidates.length
                if (candidatesA > candidatesB) { return 1 }
                else if (candidatesA < candidatesB) { return - 1 }
                else { return grid.random.shuffleArray([1, - 1])[0] }
            })
            updatedGrids.push(...solveCell(grid, orderedIndexes[0])) 
        }
        grids = updatedGrids
    }

    return { grids, rawEntropy }
}

// @exports
export { solveGrid }