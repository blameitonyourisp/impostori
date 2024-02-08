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
 * @file Solve grid, returning all possible solutions.
 * @author James Reid
 */

// @ts-check

// @@imports-module
import { solveCell } from "./cell.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Grid } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {Grid} grid
 * @returns {{grids:Grid[], rawEntropy:number}}
 */
const solveGrid = grid => {
    let rawEntropy = 0
    let grids = [grid]

    // cause solve to fail if grids length gets too big

    for (let i = 0; i < 36; i++) {
        rawEntropy += grids.length
        const updatedGrids = []
        for (const grid of grids) {
            const vacantIndexes = [...grid.typeIndexes.vacant]
            const orderedIndexes = vacantIndexes.sort((indexA, indexB) => {
                const candidatesA = grid.cells[indexA].candidates.length
                const candidatesB = grid.cells[indexB].candidates.length
                if (candidatesA > candidatesB) { return 1 }
                else if (candidatesA < candidatesB) { return - 1 }
                return grid.random.shuffleArray([1, - 1])[0]
            })
            updatedGrids.push(...solveCell(grid, orderedIndexes[0]))
        }
        grids = updatedGrids
    }

    return { grids, rawEntropy }
}

// @@exports
export { solveGrid }
