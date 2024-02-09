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
 * @file Fill cell hints.
 * @author James Reid
 */

// @ts-check

// @@imports-package
import { CELL_TYPES } from "../type/index.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Grid, GridCell } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {Grid} grid
 * @param {number} index
 * @returns {GridCell}
 */
const fillCellHints = (grid, index) => {
    let cell = grid.cells[index]
    const randomValueArray = grid.random.shuffledIndexArray(6, true)
    const hints = []

    if (cell.type === CELL_TYPES.imposter) {
        const values = new Set()
        for (const index of cell.adjacentIndexes.all) {
            const cell = grid.cells[index]
            values.add(cell.value)
        }
        const spies = grid.random
            .shuffleArray([...values.values()])
            .splice(0, 2)
        for (let i = 0; i < 6; i++) {
            const value = randomValueArray[i]
            if (value === cell.value || spies.includes(value)) { continue }
            hints.push(value)
        }
        hints.push(...spies)
    }
    else {
        for (let i = 0; i < 6; i++) {
            const value = randomValueArray[i]
            if (value === cell.value) { continue }
            hints.push(value)
        }
    }

    const hintIndex = cell.type === CELL_TYPES.detective ? 0
        : cell.type === CELL_TYPES.worker ? grid.random.prng(1, 2)
        : grid.random.prng(3, 5)
    hints.splice(hintIndex, 0, cell.value)

    const detective = hints.splice(0, 1)
    const worker = hints.splice(0, 2).sort()
    const imposter = hints.splice(0, 3).sort()
    cell = { ...cell, hints: { detective, worker, imposter } }

    return cell
}

// @@exports
export { fillCellHints }
