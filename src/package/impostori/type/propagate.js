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
import { getAdjacencyData, removeGridAdjacency } from "../adjacency/grid.js"
// @imports-module
import { fillCellType } from "./cell.js"
// @imports-types
import { CellType, Grid, GridCell } from "../../types/index.js"

// @body
/**
 * 
 * 
 * @summary x
 * 
 * @function
 * @static
 * @param {GridCell} updatedCell 
 * @param {Grid} grid 
 * @returns {Grid}
 */
const propagateCellType = (updatedCell, grid) => {
    const tempArray = []

    grid = { ...grid, cells: [...grid.cells] }
    grid.cells[updatedCell.index] = updatedCell
    grid = updateGridTypeIndexes(updatedCell, grid)
    for (const index of updatedCell.adjacentIndexes.all) {
        let cell = grid.cells[index]
        // must come before cell re-assign
        if (
            grid.isGenerating &&
            cell.type === "DETECTIVE" && 
            updatedCell.type === "IMPOSTER" &&
            !cell.adjacentIndexes.type.imposter.includes(updatedCell.index)
        ) {
            tempArray.push(cell.index)
        }         
        cell = updateCellTypeIndexes(updatedCell, cell)
        grid.cells[index] = cell   
    }

    for (const index of tempArray) {
        let cell = grid.cells[index]
        // resolve for when imposter has only 2 adj
        const adjacency = getAdjacencyData(updatedCell.index, cell.index)
        grid = removeGridAdjacency(adjacency, grid)
        updatedCell = grid.cells[updatedCell.index]        
    }

    if (grid.isGenerating && updatedCell.type === "DETECTIVE") {
        let imposters = [...updatedCell.adjacentIndexes.type.imposter]
        for (const index of imposters) {
            const cell = grid.cells[index]
            if (cell.type === "VACANT") {
                // ids required after all types are filled
                const updatedImposter = fillCellType(cell, "IMPOSTER")
                grid = propagateCellType(updatedImposter, grid)
            }
        }

        // if imposters overloaded from existing detective cells
        imposters = imposters.sort((indexA, indexB) => {
            const adjacenciesA = grid.cells[indexA].adjacentIndexes.all.length
            const adjacenciesB = grid.cells[indexB].adjacentIndexes.all.length
            if (adjacenciesA > adjacenciesB) { return 1 }
            else if (adjacenciesA < adjacenciesB) { return - 1 }
            else { return grid.random.shuffleArray([1, - 1])[0] }
        })
        while (updatedCell.value < imposters.length) {
            const index = imposters[0]
            // resolve for when imposter has only 2 adj
            const adjacency = getAdjacencyData(updatedCell.index, index)
            grid = removeGridAdjacency(adjacency, grid)
            updatedCell = grid.cells[updatedCell.index]
            imposters = updatedCell.adjacentIndexes.type.imposter
        }
    }

    // no significant performance gain noted
    if (!grid.isGenerating) {
        if (updatedCell.type === "DETECTIVE") {
            const linkedIndexes = [
                ...updatedCell.adjacentIndexes.all,
                // ...getBoxIndexes(updatedCell.box)
            ]
            for (const index of linkedIndexes) {
                let cell = grid.cells[index]
                const candidates = cell.candidates.filter(candidate => {
                    return candidate.type != "DETECTIVE"
                })
                cell = { ...cell,  candidates }
                grid.cells[index] = cell
            }
        }
        // multiple cases will come true at same time hence else
        if (grid.typeIndexes.detective.length === 6) {
            grid = stripType(grid, "DETECTIVE")
        }
        else if (grid.typeIndexes.worker.length === 12) {
            grid = stripType(grid, "WORKER")
        }
        else if (grid.typeIndexes.imposter.length === 18) {
            grid = stripType(grid, "IMPOSTER")
        }
    }

    return grid
}

/**
 * 
 * @param {Grid} grid 
 * @param {CellType} type 
 */
const stripType = (grid, type) => {
    grid = { ...grid, cells: [...grid.cells] }
    for (let cell of grid.cells) {
        const candidates = cell.candidates.filter(candidate => {
            return candidate.type != type
        })
        cell = { ...cell,  candidates }
        grid.cells[cell.index] = cell
    }
    return grid
}

/**
 * 
 * @param {*} updatedCell 
 * @param {*} targetCell 
 * @returns {object}
 */
const updateCellTypeIndexes = (updatedCell, targetCell) => {
    const adjacentIndexes = {
        ...targetCell.adjacentIndexes,
        type: updateTypeIndexes(updatedCell, targetCell)
    }
    return { ...targetCell, adjacentIndexes }
}

/**
 * 
 * @param {*} updatedCell 
 * @param {*} grid 
 * @returns {object}
 */
const updateGridTypeIndexes = (updatedCell, grid) => {
    return {
        ...grid,
        typeIndexes: updateTypeIndexes(updatedCell, grid)
    }
}

/**
 * 
 * @param {*} cell 
 * @param {*} target 
 * @returns {object}
 */
const updateTypeIndexes = (cell, target) => {
    target = target.typeIndexes || target.adjacentIndexes.type

    const indexes = {
        detective: [...target.detective],
        worker: [...target.worker],
        imposter: [...target.imposter],
        vacant: [...target.vacant]
    }

    const index = indexes.vacant.indexOf(cell.index)
    if (index != -1) {
        indexes.vacant.splice(index, 1)
        indexes[cell.type.toLowerCase()].push(cell.index)
    }

    return indexes
}

// @exports
export { propagateCellType }