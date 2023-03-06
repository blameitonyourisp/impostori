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
import { validateGridTypes, completedGridTypes } from "../type/_index.js"
import { 
    validateGridAdjacencies, 
    removeGridAdjacency, 
    addGridAdjacency,
    getAdjacencyData, 
    requireGridAdjacency
} from "./_index.js"
// @imports-types
import { Grid } from "../../types/_index.js"

/**
 * 
 * @param {Grid} grid 
 * @returns {Grid}
 */
const pruneGridAdjacencies = grid => {
    const removedAdjacencies = []
    for (const index of grid.typeIndexes.imposter) {
        const cell = grid.cells[index]
        // already randomly shuffled - perhaps consider removing random shuffle on cell hints
        for (const adjacentIndex of cell.adjacentIndexes.optional) {
            const adjacency = getAdjacencyData(index, adjacentIndex)
            const pruned = removeGridAdjacency(adjacency, grid)
            if (validateGridAdjacencies(pruned)) { 
                grid = pruned 
                removedAdjacencies.push(adjacency)
            }
            else { grid = requireGridAdjacency(adjacency, grid) }
        }
    }
    for (const adjacency of removedAdjacencies) {
        const extended = addGridAdjacency(adjacency, grid)
        if (validateGridTypes(extended)) { grid = extended }
    }




    // const imposters = [...grid.typeIndexes.imposter]
    // while (!validateGridTypes(grid)) {
    //     if (!imposters.length) { break }
    //     const indexA = grid.random.shuffleArray(imposters)[0]
    //     const cell = grid.cells[indexA]
    //     const optional = cell.adjacentIndexes.type.imposter.filter(index => {
    //         return cell.adjacentIndexes.optional.includes(index)
    //     })
    //     if (optional.length) {
    //         const indexB = grid.random.shuffleArray(optional)[0]
    //         const adjacency = getAdjacencyData(indexA, indexB)
    //         const pruned = removeGridAdjacency(adjacency, grid)
    //         if (validateGridAdjacencies(pruned)) { grid = pruned }
    //         else { grid = requireGridAdjacency(adjacency, grid) }
    //     }
    //     else {
    //         imposters.splice(imposters.indexOf(indexA), 1)
    //     }        
    // }

    const randomDropout = grid.random.prng(
        Math.round(grid.adjacencyIDs.optional.length * 0.1),
        Math.round(grid.adjacencyIDs.optional.length * 0.2)
    )

    // change to loop over workers until they become invalid, then add a random number of adj back in
    const workers = [...grid.typeIndexes.worker]
    for (let i = 0; i < randomDropout; i ++) {
        if (!workers.length) { break }
        const indexA = grid.random.shuffleArray(workers)[0]
        const cell = grid.cells[indexA]
        const optional = cell.adjacentIndexes.type.worker.filter(index => {
            return cell.adjacentIndexes.optional.includes(index)
        })
        if (optional.length) {
            const indexB = grid.random.shuffleArray(optional)[0]
            const adjacency = getAdjacencyData(indexA, indexB)
            const pruned = removeGridAdjacency(adjacency, grid)
            if (validateGridTypes(pruned)) { grid = pruned }
            else { grid = requireGridAdjacency(adjacency, grid) }
        }
        else {
            workers.splice(workers.indexOf(indexA), 1)
        }        
    }
    // console.log(grid.adjacencyIDs.optional.length)

    // const randomDropout = grid.random.prng(
    //     Math.round(grid.adjacencyIDs.optional.length * 0.1),
    //     Math.round(grid.adjacencyIDs.optional.length * 0.2)
    // )
    // for (let i = 0; i < randomDropout; i ++) {
    //     const id = grid.random.shuffleArray(grid.adjacencyIDs.optional)[0]
    //     const adjacency = getAdjacencyData(id)
    //     const pruned = removeGridAdjacency(adjacency, grid)
    //     if (validateGridAdjacencies(pruned) && validateGridTypes(pruned)) { grid = pruned }
    //     else { grid = requireGridAdjacency(adjacency, grid) }
    // }
    return grid
}

export { pruneGridAdjacencies }