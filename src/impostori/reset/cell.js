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

// @imports-types
import { CellType, GridCell } from "../../types/_index.js"

// @body
/**
 * 
 * @param {GridCell} cell 
 * @returns {GridCell}
 */
const resetCell = cell => {
    const candidates = Array.from({ length: 6 }, (_, i) => {
        const value = i + 1
        /** @type {CellType} */
        const type = cell.hints.detective.includes(value) ? "DETECTIVE"
            : cell.hints.worker.includes(value) ? "WORKER"
            : "IMPOSTER"
        return { value, type }
    })

    const value = 0
    const type = "VACANT"

    const typeIndexes = {
        detective: [],
        worker: [],
        imposter: [],
        vacant: [...cell.adjacentIndexes.all]
    }
    const adjacentIndexes = { ...cell.adjacentIndexes, type: typeIndexes }

    return { ...cell, candidates, value, type, adjacentIndexes }
}

// @exports
export { resetCell }