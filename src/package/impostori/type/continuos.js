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
 * @file Fetch continuos adjacent indexes of same type.
 * @author James Reid
 */

// @ts-check

// @@imports-module
import { CELL_TYPES } from "./cell.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Grid, CellType } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {Grid} grid
 * @param {CellType} type
 * @param {?number} index
 */
const continuosTypeIndexes = (grid, type, index = null, any = false) => {
    index ??= grid.typeIndexes[type][0]
    if (!index && index !== 0) { return [index] }

    const continuosIndexes = new Set([index])
    for (const continuosIndex of continuosIndexes.values()) {
        const cell = grid.cells[continuosIndex]
        const adjacentIndexes = any ? [...cell.adjacentIndexes.all]
            : [...cell.adjacentIndexes.type[type]]

        for (const vacantIndex of cell.adjacentIndexes.type.vacant) {
            const cell = grid.cells[vacantIndex]
            const types = new Set()
            for (const candidate of cell.candidates) {
                types.add(candidate.type)
            }
            const isWorker = () => type === CELL_TYPES.worker
            const isForcedImposter = () => types.size === 1
            if (types.has(type) && (isWorker() || isForcedImposter())) {
                adjacentIndexes.push(vacantIndex)
            }
        }

        for (const adjacentIndex of adjacentIndexes) {
            continuosIndexes.add(adjacentIndex)
        }
    }

    return [...continuosIndexes.values()]
}

/**
 *
 * @param {Grid} grid
 * @param {CellType} type
 */
const allContinuosTypeIndexes = (grid, type) => {
    let indexes = new Set(grid.typeIndexes[type].map(index => index))
    if (!indexes.size && type === CELL_TYPES.worker) {
        indexes = new Set()
        for (const index of grid.typeIndexes.vacant) {
            const cell = grid.cells[index]
            const types = cell.candidates.map(candidate => candidate.type)
            if (types.includes(type)) {
                indexes.add(index)
            }
        }
    }

    const allContinuosIndexes = []
    while (indexes.size) {
        const index = indexes.values().next().value
        const continuosIndexes = continuosTypeIndexes(grid, type, index)
        for (const continuosIndex of continuosIndexes) {
            indexes.delete(continuosIndex)
        }
        allContinuosIndexes.push(continuosIndexes)
    }

    return allContinuosIndexes
}

// @@exports
export { continuosTypeIndexes, allContinuosTypeIndexes }
