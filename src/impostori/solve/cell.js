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

// @imports-local
import { 
    forkCellValue, 
    propagateCellValue, 
    validateGridValues 
} from "../value/index.js"
import { propagateCellType, validateGridTypes } from "../type/index.js"
// @imports-types
import { Grid } from "../../types/index.js"

// @body
/**
 * 
 * @param {Grid} grid 
 * @param {number} index 
 * @returns {Grid[]}
 */
const solveCell = (grid, index) => {
    const cell = grid.cells[index]
    const updatedCells = forkCellValue(cell)

    const updatedGrids = []
    for (const updatedCell of updatedCells) {
        let updatedGrid = propagateCellValue(updatedCell, grid)
        if (!validateGridValues(updatedGrid)) { continue }
        updatedGrid = propagateCellType(updatedCell, updatedGrid)
        if (!validateGridTypes(updatedGrid)) { continue }
        updatedGrids.push(updatedGrid)
    }

    return updatedGrids
}

// @exports
export { solveCell }