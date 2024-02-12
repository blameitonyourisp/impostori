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
import {
    AdjacentIndexTypeFilter,
    CellAdjacentIndexes,
    CellHints,
    CellType,
    GridCell
} from "../../types/index.js"
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
    /**
     * @ignore
     * @typedef {Array.<keyof typeof cell.hints>} HintKeys
     * @typedef {Array.<keyof typeof cell.adjacentIndexes>} AdjacentIndexKeys
     * @typedef {Array.<keyof typeof cell.adjacentIndexes.type>} TypeFilterKeys
     */

    // candidate and hint sort not strictly required, but use for utility value
    const candidates = [...cell.candidates.sort((a, b) => a.value - b.value)]
    const hints = /** @type {CellHints} */ ({})
    for (const key of /** @type {HintKeys}*/ (Object.keys(cell.hints))) {
        hints[key] = [...cell.hints[key].sort((a, b) => a - b)]
    }
    const adjacentIndexes = /** @type {CellAdjacentIndexes} */ ({})
    for (const key of /** @type {AdjacentIndexKeys}*/
    (Object.keys(cell.adjacentIndexes))) {
        if (key === "type") {
            adjacentIndexes.type = /** @type {AdjacentIndexTypeFilter} */ ({})
            for (const key of /** @type {TypeFilterKeys} */
            (Object.keys(cell.adjacentIndexes.type))) {
                adjacentIndexes.type[key] =
                    [...cell.adjacentIndexes.type[key].sort((a, b) => a - b)]
            }
            continue
        }
        adjacentIndexes[key] =
            [...cell.adjacentIndexes[key].sort((a, b) => a - b)]
    }

    return { ...cell, candidates, hints, adjacentIndexes }
}

// @@exports
export { resetCell, softResetCell, hardResetCell, sortCell }
