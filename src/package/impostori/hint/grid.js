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
 * @file Fill grid hints.
 * @author James Reid
 */

// @ts-check

// @@imports-package
import { getAdjacencyData, requireGridAdjacency } from "../adjacency/index.js"
import { CELL_TYPES } from "../type/index.js"

// @@imports-module
import { fillCellHints } from "./cell.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Grid } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
const fillGridHints = grid => {
    grid = { ...grid, cells: [...grid.cells] }
    for (let i = 0; i < 36; i++) {
        const cell = fillCellHints(grid, i)
        grid.cells[i] = cell
        if (cell.type === CELL_TYPES.imposter) {
            const spies = new Set(cell.hints.imposter.filter(value => {
                return value !== cell.value
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

// @@exports
export { fillGridHints }
