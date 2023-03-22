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
import { fillCellHints } from "./index.js"
// @imports-types
import { Grid } from "../../types/index.js"
import { getAdjacencyData, requireGridAdjacency } from "../adjacency/index.js"

// @body
/**
 * 
 * @summary x
 * 
 * @function
 * @static
 * 
 * @param {Grid} grid
 * @returns {Grid}
 */
const fillGridHints = (grid) => {
    grid = { ...grid, cells: [...grid.cells] }
    for (let i = 0; i < 36; i ++) {
        const cell = fillCellHints(grid, i)
        grid.cells[i] = cell
        if (cell.type === "IMPOSTER") {
            const spies = new Set(cell.hints.imposter.filter(value => {
                return value != cell.value
            }))
            for (const index of cell.adjacentIndexes.required) {
                const adjacentCell = grid.cells[index]
                spies.delete(adjacentCell.value)
            }
            for (const index of cell.adjacentIndexes.all) {
                const adjacentCell = grid.cells[index]
                if (spies.has(adjacentCell.value)) {
                    const adjacency = getAdjacencyData(cell.index, index)
                    grid = requireGridAdjacency(adjacency, grid)
                    spies.delete(adjacentCell.value)
                }
            }
        }
    }
    return grid
}

// @exports
export { fillGridHints }



