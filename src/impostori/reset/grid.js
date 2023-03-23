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

// @imports-module
import { resetCell } from "./cell.js"
// @imports-types
import { Grid } from "../../types/index.js"

// @body
/**
 * 
 * @memberof module:reset
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
        ? { ...grid, typeIndexes, isGenerating: false, cells: [...grid.cells]}
        : { ...grid, isGenerating: false, cells: [...grid.cells]}
    for (let cell of grid.cells) { 
        grid.cells[cell.index] = resetCell(cell, hard) 
    }
    return grid
}

const softResetGrid = grid => resetGrid(grid, false)
const hardResetGrid = grid => resetGrid(grid, true)

// @exports
export { resetGrid, hardResetGrid, softResetGrid }