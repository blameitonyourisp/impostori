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
import { fillCellType, propagateCellType } from "./index.js"
import { 
    continuosTypeIndexes, 
    getAdjacencyData, 
    requireGridAdjacency 
} from "../adjacency/index.js"
import { pipe } from "../../utils/index.js"
// @imports-types
import { Grid, GridCell } from "../../types/index.js"

// @body
/**
 * 
 * @param {Grid} grid 
 * @returns {Grid}
 */
const fillGridTypes = grid => {
    grid = pipe(fillGridDetectives, fillGridWorkers, fillGridImposters)(grid)

    for (const index of grid.typeIndexes.detective) {
        const cell = grid.cells[index]
        for (const adjacentIndex of cell.adjacentIndexes.type.imposter) {
            const adjacency = getAdjacencyData(index, adjacentIndex)
            grid = requireGridAdjacency(adjacency, grid)
        }
    }

    return grid
}

/**
 * 
 * @param {Grid} grid 
 * @returns {Grid}
 */
const fillGridDetectives = grid => {
    const randomIndexArray = grid.random.shuffledIndexArray(36)

    const detectiveValues = Array(6).fill(6)
    while (detectiveValues.reduce((acc, cur) => acc + cur, 0) > 18) {
        detectiveValues.unshift(grid.random.prng(1, 6))
        detectiveValues.pop()
    }

    for (let i = 0; grid.typeIndexes.detective.length != 6 && i < 36; i ++) {
        const index = randomIndexArray[i]
        const cell = grid.cells[index]

        if (isValidDetective(cell, detectiveValues)) {
            const updatedCell = fillCellType(cell, "DETECTIVE")
            grid = propagateCellType(updatedCell, grid)
            detectiveValues.splice(detectiveValues.indexOf(cell.value), 1)
        }
    }
    // const allBoxIndexes = Array.from({ length: 6 }, (_, i) => getBoxIndexes(i))
    // for (const boxIndexes of allBoxIndexes) {
    //     for (const index of boxIndexes) {
    //         const cell = grid.cells[index]
    //         if (isValidDetective(cell, detectiveValues)) {
    //             const updatedCell = fillCellType(cell, "DETECTIVE")
    //             grid = propagateCellType(updatedCell, grid)
    //             detectiveValues.splice(detectiveValues.indexOf(cell.value), 1)
    //             break
    //         }
    //     }
    // }

    return grid
}

/**
 * 
 * @param {GridCell} cell 
 * @param {*} detectiveValues 
 * @returns {boolean}
 */
const isValidDetective = (cell, detectiveValues) => {
    const adjacentTypes = cell.adjacentIndexes.type
    const requiredImposters = cell.value - adjacentTypes.imposter.length
    const maxImposters = cell.value + (cell.adjacentIndexes.all.length - 2)
    
    const isVacant = () => cell.type === "VACANT"
    const isAdjacentDetective = () => !!adjacentTypes.detective.length
    const isCompletable = () => {
        // check that enough cells for imposters, and if already overloaded,
        // that adj can be removed without going below 2 adjacencies
        return requiredImposters <= adjacentTypes.vacant.length &&
            maxImposters >= adjacentTypes.imposter.length
    }
    const isRequestedValue = () => detectiveValues.includes(cell.value)
    
    return isVacant() && 
        !isAdjacentDetective() &&
        isCompletable() &&
        isRequestedValue()
}

/**
 * 
 * @param {*} grid 
 * @returns {Grid}
 */
const fillGridWorkers = grid => {
    const randomIndexArray = grid.random.shuffledIndexArray(36)

    let continuosIndexes
    for (let i = 0; !continuosIndexes && i < 36; i ++) {
        const index = randomIndexArray[i]
        const cell = grid.cells[index]

        const worker = isValidWorker(cell, grid)        
        if (worker.valid) { 
            ({ continuosIndexes } = worker) 
            break
        }
    }
        
    if (continuosIndexes) {
        for (const index of continuosIndexes.splice(0, 12)) {
            const cell = grid.cells[index]
            const updatedCell = fillCellType(cell, "WORKER")
            grid = propagateCellType(updatedCell, grid)
        }
    }

    return grid
}

/**
 * 
 * @param {*} cell 
 * @param {Grid} grid 
 * @returns {boolean}
 */
const isValidWorker = (cell, grid) => {
    const continuosIndexes = continuosTypeIndexes(grid, "VACANT", cell.index)
    
    const isVacant = () => cell.type === "VACANT"
    const isContinuos = () => continuosIndexes.length >= 12

    return { valid: isVacant() && isContinuos(), continuosIndexes }
}

/**
 * 
 * 
 * @summary Fills 
 * 
 * @function
 * @inner
 * 
 * @param {Grid} grid 
 * @returns {Grid}
 */
const fillGridImposters = grid => {
    // loop over 
    for (const index of grid.typeIndexes.vacant) {
        const cell = grid.cells[index]
        if (cell.type === "VACANT") {
            const updatedCell = fillCellType(cell, "IMPOSTER")
            grid = propagateCellType(updatedCell, grid)
        }
    }

    // return updated grid
    return grid
}

// @exports
export { fillGridTypes }