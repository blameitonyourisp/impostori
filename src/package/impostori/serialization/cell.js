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
 * @file Serialize grid cells.
 * @author James Reid
 */

// @ts-check

// @@imports-package
import {
    getAdjacentIndexes,
    getRow,
    getColumn,
    getBox
} from "../adjacency/index.js"
import { resetCell } from "../reset/index.js"
import { CELL_TYPES } from "../type/index.js"

// @@imports-utils
import { BitBuffer } from "../../utils/BitBuffer.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { GridCell, CellType } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {GridCell} cell
 */
const serializeCell = cell => {
    let buffer = new BitBuffer({ size: 3 }) // max size 19 bits or 3 bytes
    const { value, hints } = cell
    const uint3Array = [value, ...hints.detective, ...hints.worker]
    for (const uint3 of uint3Array) {
        buffer.writeSequential(uint3, 3)
    }
    if (cell.candidates.length !== 6) {
        buffer.writeSequential(1, 1)
        const candidates = resetCell(cell).candidates
        let uint6 = 0
        for (let i = 0; i < 6; i++) {
            if (cell.candidates.includes(candidates[i])) {
                uint6 = uint6 | 1 << 5 - i
            }
        }
    }
    else { buffer.writeSequential(0, 1) }
    const size = Math.ceil(buffer.writePointer / 8)
    buffer = buffer.copy({
        target: new BitBuffer({ size }),
        sourceEnd: buffer.writePointer
    })
    return buffer
}

/**
 *
 * @param {number} index
 * @param {BitBuffer} buffer
 * @returns {GridCell}
 */
const deserializeCell = (index, buffer) => {
    const adjacentIndexes = getAdjacentIndexes(index)
    buffer
    // Deserialize cell from buffer fragment.

    return {
        index,
        // initialize row and columns based on index
        row: getRow(index),
        column: getColumn(index),
        box: getBox(index),
        // initialize candidates with a random permuted array in order to
        // generate different puzzles
        candidates: [],
        // initialize rest of cell to null state or starting base state
        value: 0,
        type: CELL_TYPES.vacant,
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

// @@exports
export { serializeCell, deserializeCell }
