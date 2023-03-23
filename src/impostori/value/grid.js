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
import { fillCellValue } from "./cell.js"
import { propagateCellValue } from "./propagate.js"
import { validateGridValues } from "./validate.js"
// @imports-types
import { Grid } from "../../types/Grid.js"

// @body
/**
 * 
 * @summary x
 * 
 * @function
 * @static
 * 
 * @param {Grid} grid 
 * @returns {Grid}
 */
const fillGridValues = (grid) => {
    const history = [grid]
    let count = 0
    const randomIndexArray = grid.random.shuffledIndexArray(36)
    for (let i = 0; i < 36; i ++) {
        const index = randomIndexArray[i]
        const updatedCell = fillCellValue(grid.cells[index])
        grid = propagateCellValue(updatedCell, grid)
        if (validateGridValues(grid)) { history.push(grid) } 
        else {
            let cell = grid.cells[index]
            while (!cell.candidates.length) {
                // @ts-ignore
                grid = history.pop()
                cell = grid.cells[randomIndexArray[-- i]]
            }
            cell.value = 0
            grid = history.slice(-1)[0]
            grid.cells[cell.index] = cell
            -- i
        }
        // control this and other timers/counters from the batch generate script in order to speed up generation
        // stats on non-rejected solved grids - used to inform rejection threshold for solved grid raw entropy
        // count    time    mean    std-dev
        // 50       490     2600    1370
        // 100      370     2400    1400
        // 500      380     2480    1400
        // 1000     390     2400    1310
        // 1500     380     2300    1180
        // 2000     380     2200    1150
        // 2500     390     2300    1210
        // 5000     400     2200    1220
        // 10000    380     2100    1170
        // 15000    410     2200    1240
        // 25000    440     2200    1230
        // 50000    510     2200    1260
        // inf.     570     2200    1220
        // mean 2650 std dev 3160
        // no real performance gains observed - here for hang prevention
        if (++ count > 10000) { return fillGridValues(history[0]) }
        // count ++
    }
    return grid
}

// @exports
export { fillGridValues }