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
import { allContinuosTypeIndexes } from "./continuos.js"
// @imports-types
import { Grid } from "../../types/Grid.js"

// @body

// 18 or fewer imposters - min 18 total imposter and possible imposter cells (Y)
// 12 or fewer workers - "" (Y)
// 6 or fewer detectives - "" (Y)

// every cell must have a candidate (Y)
// continuos workers must be 12 or longer (if no workers, use vacant instead where the vacant cell can be a worker) (Y)
// continuos imposters must be less than 18 (Y)

// all detectives must be completable with possible adjacent imposters (Y)
// all imposters must be completable with possible adjacent correct values (Y)

/**
 * 
 * @param {Grid} grid 
 * @returns {boolean}
 */
const completedGridTypes = grid => {
    for (const cell of grid.cells) {
        if (cell.type === "IMPOSTER") {
            const values = new Set(cell.adjacentIndexes.all.map(index => {
                return grid.cells[index].value
            }))
            if (values.size < 2) { return false }
        }
    }
    return grid.typeIndexes.vacant.length === 0 &&
        grid.typeIndexes.detective.length === 6 && 
        grid.typeIndexes.worker.length === 12 &&
        grid.typeIndexes.imposter.length === 18
}

/**
 * 
 * @param {Grid} grid 
 * @returns {boolean}
 */
const validateGridTypes = grid => {
    for (let i = 0; i < 36; i ++) {
        const cell = grid.cells[i]
        if (!cell.value && !cell.candidates.length) { return false }
    }

    return validateDetectives(grid) &&
        validateWorkers(grid) &&
        validateImposters(grid)
}

/**
 * 
 * @param {Grid} grid 
 * @returns {boolean}
 */
const validateDetectives = grid => {
    const continuosIndexes = allContinuosTypeIndexes(grid, "DETECTIVE")
    const maxContinuos = Math.max(...continuosIndexes.map(arr => arr.length))
    if (maxContinuos > 1) { return false }
    for (const index of grid.typeIndexes.detective) {
        const cell = grid.cells[index]
        let minImposters = cell.adjacentIndexes.type.imposter.length
        let maxImposters = cell.adjacentIndexes.type.imposter.length
        for (const vacantIndex of cell.adjacentIndexes.type.vacant) {
            const cell = grid.cells[vacantIndex]
            const types = new Set()
            for (const candidate of cell.candidates) {
                types.add(candidate.type)
            }
            if (types.has("IMPOSTER")) {
                if (types.size === 1) { minImposters ++ }
                maxImposters ++ 
            } 
        }
        if (cell.value < minImposters || cell.value > maxImposters) {
            return false
        }
    }
    // const allBoxIndexes = Array.from({ length: 6 }, (_, i) => getBoxIndexes(i))
    // for (const boxIndexes of allBoxIndexes) {
    //     let hasDetective = false
    //     for (const index of boxIndexes) {
    //         const cell = grid.cells[index]
    //         const types = cell.type != "VACANT" ? [cell.type] 
    //             : cell.candidates.map(candidate => candidate.type)
    //         if (types.includes("DETECTIVE")) { hasDetective = true; break }
    //     }
    //     if (!hasDetective) { return false }
    // }
    return grid.typeIndexes.detective.length <= 6 &&
        maxTypeCount(grid, "DETECTIVE") >= 6
}

/**
 * 
 * @param {Grid} grid 
 * @returns {boolean}
 */
const validateWorkers = grid => {
    const continuosIndexes = allContinuosTypeIndexes(grid, "WORKER")
    const maxContinuos = Math.max(...continuosIndexes.map(arr => arr.length))
    if (maxContinuos < 12) { return false }

    return grid.typeIndexes.worker.length <= 12 &&
        maxTypeCount(grid, "WORKER") >= 6
}

/**
 * 
 * @param {Grid} grid 
 * @returns {boolean}
 */
const validateImposters = grid => {
    const continuosIndexes = allContinuosTypeIndexes(grid, "IMPOSTER")
    const maxContinuos = Math.max(...continuosIndexes.map(arr => arr.length))
    // consider different max continuos groups for imposters
    if (maxContinuos >= 7) { return false }

    for (const index of grid.typeIndexes.imposter) {
        const cell = grid.cells[index]
        const spies = cell.hints.imposter.filter(value => value != cell.value)
        const values = new Set()
        for (const index of cell.adjacentIndexes.all) {
            const cell = grid.cells[index]
            const candidates = cell.value ? [cell.value] 
                : cell.candidates.map(candidate => candidate.value)
            for (const candidate of candidates) { values.add(candidate) }
        }
        if (!values.has(spies[0]) || !values.has(spies[1])) { return false }
    }

    return grid.typeIndexes.imposter.length <= 18 &&
        maxTypeCount(grid, "IMPOSTER") >= 6
}

/**
 * 
 * @param {Grid} grid 
 * @returns {boolean}
 */
const maxTypeCount = (grid, type) => {
    let count = 0
    for (const cell of grid.cells) {
        if (cell.type === type) { count ++ }
        else if (cell.type === "VACANT") {
            const types = cell.candidates.map(candidate => candidate.type)
            if (types.includes(type)) { count ++ }
        }
    }
    return count
}

// @exports
export { completedGridTypes, validateGridTypes }