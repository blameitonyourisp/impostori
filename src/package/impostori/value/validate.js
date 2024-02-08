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
 * @file Validate grid cell values.
 * @author James Reid
 */

// @ts-check

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Grid } from "../../types/Grid.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {Grid} grid
 * @returns {boolean}
 */
const validateGridValues = grid => {
    const valueIDSet = new Set()
    for (let i = 0; i < 36; i++) {
        const cell = grid.cells[i]
        const values = cell.value ? [cell.value]
            : cell.candidates.map(candidate => candidate.value)
        if (!values) { return false }
        for (let j = 0; j < values.length; j++) {
            const rowValueID = cell.row * 6 + values[j]
            const columnValueID = 36 + cell.column * 6 + values[j]
            const boxValueID = 72 + cell.box * 6 + values[j]
            valueIDSet.add(rowValueID).add(columnValueID).add(boxValueID)
            // valueIDSet.add(rowValueID).add(columnValueID)
        }
    }
    return valueIDSet.size === 108
    // return valueIDSet.size === 72
}

// @@exports
export { validateGridValues }
