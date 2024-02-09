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
 * @file Prune grid adjacencies between cells according to impostori rules.
 * @author James Reid
 */

// @ts-check

// @@imports-package
import {
    removeGridAdjacency,
    addGridAdjacency,
    getAdjacencyData,
    requireGridAdjacency
} from "../adjacency/index.js"
import {
    validateGridTypes,
    continuosTypeIndexes,
    CELL_TYPES
} from "../type/index.js"

// @@imports-utils
import { pipe } from "../../utils/index.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Grid } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *  - remove all adj from imposters (require the adjacency if grid invalid)
 *  - re add all adj unless that invalidates grid
 *  - remove all adj from workers (require the adjacency if grid invalid)
 *  - re add all adj (none will invalidate grid)
 *  - all optional adjacencies are now "genuinely" optional
 *  - divide all optional ids into either required or deleted  according to
 *      random dropout variable
 */

/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
const pruneGridAdjacencies = grid => {
    grid = pipe(pruneImposterAdjacencies, pruneWorkerAdjacencies)(grid)
    // caution high random dropout may cause solve that takes too long due to
    // number of possible solutions
    const randomDropout = grid.random.iterate()
    for (const adjacencyID of grid.adjacencyIDs.optional) {
        const adjacency = getAdjacencyData(adjacencyID)
        grid = grid.random.iterate() > randomDropout
            ? requireGridAdjacency(adjacency, grid)
            : removeGridAdjacency(adjacency, grid)
    }
    return grid
}

/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
const pruneImposterAdjacencies = grid => {
    const removedAdjacencies = []
    for (const index of grid.typeIndexes.imposter) {
        const cell = grid.cells[index]
        // already randomly shuffled - perhaps consider removing random shuffle
        // on cell hints
        for (const adjacentIndex of cell.adjacentIndexes.optional) {
            const adjacency = getAdjacencyData(index, adjacentIndex)
            const pruned = removeGridAdjacency(adjacency, grid)
            if (validatePrunedAdjacencies(pruned)) {
                grid = pruned
                removedAdjacencies.push(adjacency)
            }
            else { grid = requireGridAdjacency(adjacency, grid) }
        }
    }
    // shuffle removed adjacencies first?
    for (const adjacency of removedAdjacencies) {
        const extended = addGridAdjacency(adjacency, grid)
        if (validateGridTypes(extended)) { grid = extended }
    }
    return grid
}

/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
const pruneWorkerAdjacencies = grid => {
    const removedAdjacencies = []
    for (const index of grid.typeIndexes.worker) {
        const cell = grid.cells[index]
        const optional = cell.adjacentIndexes.type.worker.filter(index => {
            return cell.adjacentIndexes.optional.includes(index)
        })
        for (const adjacentIndex of optional) {
            const adjacency = getAdjacencyData(index, adjacentIndex)
            const pruned = removeGridAdjacency(adjacency, grid)
            if (validatePrunedAdjacencies(pruned)) {
                grid = pruned
                removedAdjacencies.push(adjacency)
            }
            else { grid = requireGridAdjacency(adjacency, grid) }
        }
    }
    // shuffle removed adjacencies first?
    for (const adjacency of removedAdjacencies) {
        grid = addGridAdjacency(adjacency, grid)
    }
    return grid
}

/**
 *
 * @param {Grid} grid
 * @returns {boolean}
 */
const validatePrunedAdjacencies = grid => {
    for (const cell of grid.cells) {
        if (cell.type === CELL_TYPES.imposter) {
            const values = new Set(cell.adjacentIndexes.all.map(index => {
                return grid.cells[index].value
            }))
            if (values.size < 2) { return false }
        }
    }
    if (continuosTypeIndexes(grid, CELL_TYPES.vacant, 0, true).length !== 36) {
        return false
    }
    return true
}

// @@exports
export { pruneGridAdjacencies }
