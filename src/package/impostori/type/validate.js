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
 * @file Validate grid types.
 * @author James Reid
 */

// @ts-check

// @@imports-module
import { CELL_TYPES } from "./cell.js"
import { allContinuosTypeIndexes } from "./continuos.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Grid, CellType } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body

// 18 or fewer imposters - min 18 total imposter and possible imposter cells (Y)
// 12 or fewer workers - "" (Y)
// 6 or fewer detectives - "" (Y)

// every cell must have a candidate (Y)
// continuos workers must be 12 or longer (if no workers, use vacant instead
// where the vacant cell can be a worker) (Y)
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
        if (cell.type === CELL_TYPES.imposter) {
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
    for (let i = 0; i < 36; i++) {
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
    const continuosIndexes = allContinuosTypeIndexes(grid, CELL_TYPES.detective)
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
            if (types.has(CELL_TYPES.imposter)) {
                if (types.size === 1) { minImposters++ }
                maxImposters++
            }
        }
        if (cell.value < minImposters || cell.value > maxImposters) {
            return false
        }
    }

    return grid.typeIndexes.detective.length <= 6 &&
        maxTypeCount(grid, CELL_TYPES.detective) >= 6
}

/**
 *
 * @param {Grid} grid
 * @returns {boolean}
 */
const validateWorkers = grid => {
    const continuosIndexes = allContinuosTypeIndexes(grid, CELL_TYPES.worker)
    const maxContinuos = Math.max(...continuosIndexes.map(arr => arr.length))
    if (maxContinuos < 12) { return false }

    return grid.typeIndexes.worker.length <= 12 &&
        maxTypeCount(grid, CELL_TYPES.worker) >= 6
}

/**
 *
 * @param {Grid} grid
 * @returns {boolean}
 */
const validateImposters = grid => {
    const continuosIndexes = allContinuosTypeIndexes(grid, CELL_TYPES.imposter)
    const maxContinuos = Math.max(...continuosIndexes.map(arr => arr.length))
    // consider different max continuos groups for imposters
    if (maxContinuos >= 7) { return false }

    for (const index of grid.typeIndexes.imposter) {
        const cell = grid.cells[index]
        const spies = cell.hints.imposter.filter(value => value !== cell.value)
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
        maxTypeCount(grid, CELL_TYPES.imposter) >= 6
}

/**
 *
 * @param {Grid} grid
 * @param {CellType} type
 * @returns {number}
 */
const maxTypeCount = (grid, type) => {
    let count = 0
    for (const cell of grid.cells) {
        if (cell.type === type) { count++ }
        else if (cell.type === CELL_TYPES.vacant) {
            const types = cell.candidates.map(candidate => candidate.type)
            if (types.includes(type)) { count++ }
        }
    }

    return count
}

// @@exports
export { completedGridTypes, validateGridTypes }
