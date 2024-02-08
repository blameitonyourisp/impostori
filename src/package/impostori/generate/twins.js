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
 * @file Remove adjacent twins which break impostori rules.
 * @author James Reid
 */

// @ts-check

// @@imports-package
import { getAdjacencyData, removeGridAdjacency } from "../adjacency/index.js"

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

// @@exports
export { removeTwins }
