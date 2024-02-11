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
 * @file Reset generation values in grid cell.
 * @author James Reid
 */

// @ts-check

// @@imports-package
import { CELL_TYPES } from "../type/index.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { CellType, GridCell } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {GridCell} cell
 * @returns {GridCell}
 */
const resetCell = (cell, hard = false) => {
    const candidates = Array.from({ length: 6 }, (_, i) => {
        const value = i + 1
        /** @type {CellType} */
        const type = cell.hints.detective.includes(value) ? CELL_TYPES.detective
            : cell.hints.worker.includes(value) ? CELL_TYPES.worker
            : CELL_TYPES.imposter
        return { value, type }
    })

    const value = 0
    const type = CELL_TYPES.vacant

    const typeIndexes = {
        detective: [],
        worker: [],
        imposter: [],
        vacant: [...cell.adjacentIndexes.all]
    }
    const adjacentIndexes = { ...cell.adjacentIndexes, type: typeIndexes }

    return hard
        ? { ...cell, candidates, value, type, adjacentIndexes }
        : { ...cell, candidates }
}

const softResetCell = (/** @type {GridCell} */ cell) => resetCell(cell, false)
const hardResetCell = (/** @type {GridCell} */ cell) => resetCell(cell, true)

/**
 *
 * @param {GridCell} cell
 * @returns {GridCell}
 */
const sortCell = cell => {
    const numSort = (a, b) => a - b
    // candidate and hint sort not strictly required, but use for utility value
    const candidates = [...cell.candidates.sort((a, b) => a.value - b.value)]
    const hints = {
        detective: [...cell.hints.detective.sort(numSort)],
        worker: [...cell.hints.worker.sort(numSort)],
        imposter: [...cell.hints.imposter.sort(numSort)]
    }
    const adjacentIndexes = {
        all: [...cell.adjacentIndexes.all.sort(numSort)],
        required: [...cell.adjacentIndexes.required.sort(numSort)],
        optional: [...cell.adjacentIndexes.optional.sort(numSort)],
        type: {
            detective: [...cell.adjacentIndexes.type.detective.sort(numSort)],
            worker: [...cell.adjacentIndexes.type.worker.sort(numSort)],
            imposter: [...cell.adjacentIndexes.type.imposter.sort(numSort)],
            vacant: [...cell.adjacentIndexes.type.vacant.sort(numSort)]
        }
    }

    return { ...cell, candidates, hints, adjacentIndexes }
}

// @@exports
export { resetCell, softResetCell, hardResetCell, sortCell }
