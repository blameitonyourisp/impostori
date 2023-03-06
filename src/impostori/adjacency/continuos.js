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
import { Grid, CellType } from "../../types/_index.js"

// @body
/**
 * 
 * @param {Grid} grid 
 * @param {CellType} type
 * @param {?number} index
 */
const continuosTypeIndexes = (grid, type, index = null, any = false) => {
    // change param to options object
    const keyType = type.toLowerCase()
    index ??= grid.typeIndexes[keyType][0]
    // if (!index && type === "WORKER") { 
    //     for (const cell of grid.cells) {
    //         const types = cell.candidates.map(candidate => candidate.type)
    //         if (types.includes(type)) {
    //             index = cell.index
    //             break
    //         }
    //     }
    // }
    // if (!index || grid.cells[index].type != type) { return [index] } // change to include candidate type cells
    if (!index && index != 0) { return [index] }

    const continuosIndexes = new Set([index])
    for (const continuosIndex of continuosIndexes.values()) {
        const cell = grid.cells[continuosIndex]
        const adjacentIndexes = any ? [...cell.adjacentIndexes.all]
            : [...cell.adjacentIndexes.type[keyType]]

        // console.log(adjacentIndexes)

        for (const vacantIndex of cell.adjacentIndexes.type.vacant) {
            const cell = grid.cells[vacantIndex]
            const types = new Set()
            for (const candidate of cell.candidates) {
                types.add(candidate.type)
            }
            const isWorker = () => type === "WORKER"
            const isForcedImposter = () => types.size === 1
            if (types.has(type) && (isWorker() || isForcedImposter())) {
                adjacentIndexes.push(vacantIndex)
            }
        }

        // console.log(adjacentIndexes)

        for (const adjacentIndex of adjacentIndexes) {
            continuosIndexes.add(adjacentIndex)
        }
    }

    return [...continuosIndexes.values()]
}

/**
 * 
 * @param {Grid} grid 
 * @param {CellType} type
 */
const allContinuosTypeIndexes = (grid, type) => {
    const keyType = type.toLowerCase()
    let indexes = new Set(grid.typeIndexes[keyType].map(index => index))
    if (!indexes.size && type === "WORKER") {
        indexes = new Set()
        for (const index of grid.typeIndexes.vacant) {
            const cell = grid.cells[index]
            const types = cell.candidates.map(candidate => candidate.type)
            if (types.includes(type)) {
                indexes.add(index)
            }
        }
    }
    // console.log(indexes)

    const allContinuosIndexes = []
    while (indexes.size) {
        const index = indexes.values().next().value
        const continuosIndexes = continuosTypeIndexes(grid, type, index)
        for (const continuosIndex of continuosIndexes) {
            indexes.delete(continuosIndex)
        }
        allContinuosIndexes.push(continuosIndexes)
    }     

    // console.log(allContinuosIndexes)
    return allContinuosIndexes
}

// @exports
export { continuosTypeIndexes, allContinuosTypeIndexes }