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
import { Grid } from "../../types/Grid.js"

// @body

const validateGridValues = grid => {
    const valueIDSet = new Set()
    for (let i = 0; i < 36; i ++) {
        const cell = grid.cells[i]
        const values = cell.value ? [cell.value] 
            : cell.candidates.map(candidate => candidate.value)
        if (!values) { return false }
        for (let j = 0; j < values.length; j ++) {
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

// @exports
export { validateGridValues }