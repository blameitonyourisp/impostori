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
 * @file Generate filled grid.
 * @author James Reid
 */

// @ts-check

// @@imports-package
import { getAdjacencyData } from "../adjacency/index.js"
import { fillGridHints } from "../hint/index.js"
import { softResetGrid, hardResetGrid, sortGrid } from "../reset/index.js"
import { solveGrid } from "../solve/index.js"
import {
    validateGridTypes,
    completedGridTypes,
    fillGridTypes
} from "../type/index.js"
import { fillGridValues } from "../value/index.js"

// @@imports-module
import { generateEmptyCell } from "./cell.js"
import { pruneGridAdjacencies } from "./prune.js"
import { removeTwins } from "./twins.js"

// @@imports-utils
import { pipe } from "../../utils/index.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Grid } from "../../types/index.js"
/* eslint-disable-next-line no-duplicate-imports -- Duplicate import required
for type import */
import { Random } from "../../utils/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {Random} random
 * @returns {Grid}
 */
const generateEmptyGrid = random => {
    const cells = Array.from({ length: 36 }, (_, index) => {
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
 * @returns {{grid:Grid, rawEntropy:number}}
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
    if (solved.grids.length !== 1 || !gridsEqual(grid, solved.grids[0])) {
        return generateGrid(random)
    }

    // grid = softResetGrid(grid)
    grid = pipe(softResetGrid, sortGrid)(grid)

    return { grid, rawEntropy }
}

/**
 *
 * @param {Grid} gridA
 * @param {Grid} gridB
 * @returns {boolean}
 */
const gridsEqual = (gridA, gridB) => {
    gridA
    gridB

    // Implement grid comparison or remove function.
    return true
}

// @@exports
export { generateEmptyGrid, generateGrid }
