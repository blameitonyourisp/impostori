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
import { GridCell, Random } from "../../types/index.js"
import { 
    getAdjacentIndexes, 
    getRow, 
    getColumn, 
    getBox 
} from "../adjacency/index.js"

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
            imposter: []
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

// @exports
export { generateEmptyCell }