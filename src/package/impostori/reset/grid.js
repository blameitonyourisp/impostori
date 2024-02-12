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
 * @file Reset generation values across a grid.
 * @author James Reid
 */

// @ts-check

// @@imports-module
import { resetCell, sortCell } from "./cell.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Grid, GridTypeIndexes } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
const resetGrid = (grid, hard = false) => {
    const typeIndexes = {
        detective: [],
        worker: [],
        imposter: [],
        vacant: Array.from({ length: 36 }, (_, index) => index)
    }
    grid = hard
        ? { ...grid, typeIndexes, cells: [...grid.cells], isGenerating: false }
        : { ...grid, cells: [...grid.cells], isGenerating: false }
    for (const cell of grid.cells) {
        grid.cells[cell.index] = resetCell(cell, hard)
    }
    return grid
}

const softResetGrid = (/** @type {Grid} */ grid) => resetGrid(grid, false)
const hardResetGrid = (/** @type {Grid} */ grid) => resetGrid(grid, true)

/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
const sortGrid = grid => {
    /**
     * @ignore
     * @typedef {Array.<keyof typeof Grid.typeIndexes>} TypeIndexKeys
     */

    const typeIndexes = /** @type {GridTypeIndexes} */ ({})
    for (const key of /** @type {TypeIndexKeys} */
    (Object.keys(grid.typeIndexes))) {
        typeIndexes[key] = [...grid.typeIndexes[key].sort((a, b) => a - b)]
    }

    const adjacencyIDs = {
        required: new Set(),
        optional: new Set(),
        deleted: new Set()
    }
    for (let i = 0; i < 85; i++) {
        grid.adjacencyIDs.required.has(i) ? adjacencyIDs.required.add(i)
            : grid.adjacencyIDs.optional.has(i) ? adjacencyIDs.optional.add(i)
            : adjacencyIDs.deleted.add(i)
    }

    grid = { ...grid, cells: [...grid.cells], typeIndexes, adjacencyIDs }
    for (const cell of grid.cells) { grid.cells[cell.index] = sortCell(cell) }

    return grid
}

// @@exports
export { resetGrid, hardResetGrid, softResetGrid, sortGrid }
