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
import { getAdjacencyData, removeGridAdjacency } from "../adjacency/index.js"
// @imports-types
import { Grid } from "../../types/index.js"

// @body
/**
 * 
 * 
 * @summary x
 * 
 * @function
 * @static
 * 
 * @param {Grid} grid
 * @returns {Grid}
 */
const removeTwins = grid => {
    let updatedGrid = grid
    for (const cell of grid.cells) {
        for (const index of cell.adjacentIndexes.all) {
            const adjacentCell = grid.cells[index]
            if (adjacentCell.value === cell.value) {
                const adjacency = getAdjacencyData(index, cell.index)
                updatedGrid = removeGridAdjacency(adjacency, updatedGrid)
            }
        }
    }
    return updatedGrid
}

// @exports
export { removeTwins }