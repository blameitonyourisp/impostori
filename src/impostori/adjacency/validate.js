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
import { validateGridTypes } from "../type/_index.js"

import { Grid } from "../../types/_index.js"
import { continuosTypeIndexes } from "./continuos.js"

// not to be used during solve stage - change to only validate imposterAdj
/**
 * 
 * 
 * @param {Grid} grid 
 * @returns {boolean}
 *   
 */
const validateGridAdjacencies = grid => {
    for (const cell of grid.cells) {
        if (cell.type === "IMPOSTER") {
            const values = new Set(cell.adjacentIndexes.all.map(index => {
                return grid.cells[index].value
            }))
            if (values.size < 2) { return false }
        }
        // else if (cell.adjacentIndexes.all.length < 2) { return false }
    }
    if (continuosTypeIndexes(grid, "VACANT", 0, true).length != 36) { 
        return false 
    }
    return true
}

export { validateGridAdjacencies }