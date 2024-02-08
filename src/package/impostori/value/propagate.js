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
import { Grid, GridCell } from "../../types/index.js"

/**
 * @module value
 */

// @body
/**
 * 
 * 
 * @summary x
 * 
 * @function
 * @static
 * 
 * @param {GridCell} updatedCell 
 * @param {Grid} grid 
 * @returns {Grid}
 */
const propagateCellValue = (updatedCell, grid) => {
    const { row, column, box, value } = updatedCell    
    grid = { ...grid, cells: [...grid.cells] }
    grid.cells[updatedCell.index] = updatedCell
    const linkedIndexes = [
        ...getRowIndexes(row),
        ...getColumnIndexes(column),
        ...getBoxIndexes(box)
    ]
    for (const index of linkedIndexes) {
        let cell = grid.cells[index]
        const candidates = cell.candidates.filter(candidate => {
            return candidate.value != value
        })
        cell = { ...cell,  candidates }
        grid.cells[index] = cell
    }

    if (!grid.isGenerating) {
        for (const index of updatedCell.adjacentIndexes.all) {
            let cell = grid.cells[index]
            const candidates = cell.candidates.filter(candidate => {
                return candidate.value != value
            })
            cell = { ...cell,  candidates }
            grid.cells[index] = cell
        }
    }    

    return grid
}

const getRowIndexes = row => {
    const result = Array(6)
    for (let i = 0; i < 6; i ++) {
        result[i] = row * 6 + i
    }
    return result
}

const getColumnIndexes = column => {
    const result = Array(6)
    for (let i = 0; i < 6; i ++) {
        result[i] = i * 6 + column
    }
    return result
}

// add box logic to validation process, and force 1 detective in each box
// const getBoxIndexes = box => {
//     // return box === 0 ? [0, 1, 2, 6, 7, 12]
//     //     : box === 1 ? [3, 4, 8, 9, 13, 18]
//     //     : box === 2 ? [5, 10, 11, 15, 16, 21]
//     //     : box === 3 ? [14, 19, 20, 24, 25, 30]
//     //     : box === 4 ? [17, 22, 26, 27, 31, 32]
//     //     : box === 5 ? [23, 28, 29, 33, 34, 35]
//     //     : []
//     return box === 0 ? [0, 1, 2, 6, 7, 8]
//         : box === 1 ? [3, 4, 5, 9, 10, 11]
//         : box === 2 ? [12, 13, 14, 18, 19, 20]
//         : box === 3 ? [15, 16, 17, 21, 22, 23]
//         : box === 4 ? [24, 25, 26, 30, 31, 32]
//         : box === 5 ? [27, 28, 29, 33, 34, 35]
//         : []
// }

const getBoxIndexes = box => {
    const result = Array(6)
    for (let i = 0; i < 6; i ++) {
        const boxRow = (box % 2)
        const boxColumn = Math.floor(box / 2)
        const innerRow = i % 3
        const innerColumn = Math.floor(i / 3)
        result[i] = boxRow * 3 + boxColumn * 12 + innerRow + innerColumn * 6
    }
    return result
}

// @exports
export { propagateCellValue }