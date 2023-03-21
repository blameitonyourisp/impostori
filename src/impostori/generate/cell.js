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
import { GridCell, Random } from "../../types/_index.js"

// @body
/**
 * 
 * @summary Generate an empty grid cell
 * 
 * @function
 * @static
 * 
 * @param {number} index - Index of empty cell to be generated
 * @param {Random} random - Instance of seeded prng used throughout generation
 * @returns {GridCell}
 */
const generateEmptyCell = (index, random) => {
    // pre-calculate adjacent indexes in order to not call unnecessarily 
    const adjacentIndexes = random.shuffleArray(getAdjacentIndexes(index))

    return {
        index,
        // initialize row and columns based on index
        row: getRow(index),
        column: getColumn(index),
        box: getBox(index),
        // initialize candidates with a random permuted array in order to 
        // generate different puzzles
        candidates: random.shuffledIndexArray(6, true).map(value => {
            return { value, type: "VACANT" }
        }),
        // initialize rest of cell to null state or starting base state 
        value: 0,
        type: "VACANT", 
        hints: { 
            detective: [],
            worker: [], 
            imposter: [],
            eliminated: []
        },     
        adjacentIndexes: {
            all: adjacentIndexes,
            required: [],
            optional: adjacentIndexes,
            type: {
                detective: [],
                worker: [],
                imposter: [],
                vacant: adjacentIndexes
            }            
        }
    }
}

/**
 * Calculates indexes of all possible orthogonally adjacent hex cells given the
 * index of a center hex cell. Each cell may have up to 6 orthogonally adjacent
 * cells - all indexes out of range (0 to 35) for the grid are omitted, and 
 * wrap around indexes are obviously also omitted, as these cells are not
 * adjacent to each other on the grid.
 * 
 * Wrap around indexes indexes on the opposite side of the grid when the
 * provided central index is in the leftmost or rightmost column.
 * 
 * @summary Get all possible adjacent indexes given the index of a center cell 
 * 
 * @function
 * @inner
 * 
 * @param {number} index - Index 
 * @returns {number[]}
 */
const getAdjacentIndexes = index => {
    // offset array representing the index offsets from a central hex cell to
    // each of the 6 orthogonally adjacent hex cells
    return [-6, -5, -1, 1, 5, 6].flatMap(offset => {
        const adjacentIndex = index + offset
        const columnOffset = Math.abs(adjacentIndex % 6 - index % 6)
        // omit index if it is out of range for the grid, or if it is a
        // wraparound index to a column on the other side of the grid
        return adjacentIndex > 35 || adjacentIndex < 0 || columnOffset > 1 ? []
            : [adjacentIndex]
    })
}

const getRow = index => {
    return Math.floor(index / 6)
}

const getColumn = index => {
    return index % 6
}

const getBox = index => {
    const row = getRow(index)
    const column = getColumn(index)
    return Math.floor(row / 2) * 2 + Math.floor(column / 3)
}

// @exports
export { generateEmptyCell }