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
import { generateEmptyCell } from "./index.js"
import { getAdjacencyData, pruneGridAdjacencies, removeTwins, validateGridAdjacencies } from "../adjacency/index.js"
import { validateGridTypes, completedGridTypes, fillGridTypes } from "../type/index.js"
import { fillGridValues } from "../value/index.js"
import { pipe } from "../../utils/index.js"
import { fillGridHints } from "../hint/index.js"
import { softResetGrid, hardResetGrid } from "../reset/index.js"
// @imports-types
import { Grid, Random } from "../../types/index.js"
import { solveGrid } from "../solve/grid.js"

// @body
/**
 * 
 * 
 * @summary Generate a random empty grid
 * 
 * @function
 * @static
 * 
 * @param {Random} random 
 * @returns {Grid}
 */
const generateEmptyGrid = random => {
    const cells =  Array.from({ length: 36 }, (_, index) => {
        return generateEmptyCell(index, random)
    })

    const typeIndexes = {
        detective: [],
        worker: [],
        imposter: [],
        vacant: random.shuffledIndexArray(36)
    }

    const optional = new Set()
    cells.forEach(cell => {
        cell.adjacentIndexes.all.forEach(index => {
            const adjacency = getAdjacencyData(cell.index, index)
            optional.add(adjacency.id)
        })        
    })
    const adjacencyIDs = { required: new Set(), optional, deleted: new Set() }

    return { cells, typeIndexes, adjacencyIDs, random, isGenerating: true }
}

/**
 * 
 * @param {Random} random 
 * @returns {Grid}
 */
const generateGrid = random => {
    let grid, typed
    do {
        grid = pipe(generateEmptyGrid, fillGridValues, removeTwins)(random)
        do { typed = fillGridTypes(grid) } while (!completedGridTypes(typed))
        grid = pipe(pruneGridAdjacencies, fillGridHints)(typed)
    } while (!validateGridTypes(grid))


    const solved = pipe(hardResetGrid, solveGrid)(grid)
    const { rawEntropy } = solved
    if (solved.grids.length != 1 || !gridsEqual(grid, solved.grids[0])) { 
        return generateGrid(random)
    }

    grid = softResetGrid(grid)
    
    return { grid, rawEntropy } 
}

const gridsEqual = (gridA, gridB) => {
    // $
    return true
}

// @exports
export { generateEmptyGrid, generateGrid }