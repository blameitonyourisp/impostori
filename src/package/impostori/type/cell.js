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
 * @file Fill cell type.
 * @author James Reid
 */

// @ts-check

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { CellType, GridCell } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/** @enum {CellType} */
const CELL_TYPES = {
    detective: /** @type {CellType} */ ("detective"),
    worker: /** @type {CellType} */ ("worker"),
    imposter: /** @type {CellType} */ ("imposter"),
    vacant: /** @type {CellType} */ ("vacant")
}

/**
 *
 * @param {GridCell} cell
 * @param {CellType} type
 * @returns {GridCell}
 */
const fillCellType = (cell, type) => {
    cell = { ...cell, type }
    if (type === CELL_TYPES.detective) { return selectImposters(cell) }
    return cell
}

/**
 *
 * @param {GridCell} cell
 * @returns {GridCell}
 */
const selectImposters = cell => {
    const vacant = [...cell.adjacentIndexes.type.vacant]
    const imposters = cell.adjacentIndexes.type.imposter.length

    // imposter array may be too long - fixed in propagation
    const type = {
        ...cell.adjacentIndexes.type,
        imposter: [
            ...cell.adjacentIndexes.type.imposter,
            ...vacant.splice(0, cell.value - imposters)
        ],
        vacant
    }
    const adjacentIndexes = { ...cell.adjacentIndexes, type }

    return { ...cell, adjacentIndexes }
}

// @@exports
export { CELL_TYPES, fillCellType }
