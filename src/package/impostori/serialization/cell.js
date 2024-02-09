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
import { BitBuffer } from "../../utils/index.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { GridCell } from "../../types/index.js"
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
        buffer.write(uint3, { size: 3 })
    }

    if (cell.candidates.length !== 6) {
        buffer.write(1, { size: 1 })
        const candidates = resetCell(cell).candidates
        let uint6 = 0
        for (let i = 0; i < 6; i++) {
            if (cell.candidates.includes(candidates[i])) {
                uint6 = uint6 | 1 << 5 - i
            }
        }
        buffer.write(uint6, { size: 6 })
    }
    else { buffer.write(0, { size: 1 }) }

    const size = Math.ceil(buffer.writePointer / 8)
    buffer = buffer.copy({
        target: new BitBuffer({ size }),
        sourceEnd: buffer.writePointer
    })

    return buffer
}

/**
 *
 * @param {BitBuffer} buffer
 * @param {number} index
 * @returns {GridCell}
 */
const deserializeCell = (buffer, index) => {
    const adjacentIndexes = getAdjacentIndexes(index)
    const cell = /** @type {GridCell} */ ({
        index,
        row: getRow(index),
        column: getColumn(index),
        box: getBox(index),
        candidates: [],
        value: buffer.read(3),
        clientValue: 0,
        type: CELL_TYPES.vacant,
        hints: {
            detective: [buffer.read(3)],
            worker: [buffer.read(3), buffer.read(3)],
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
    })

    cell.type = cell.hints.detective.includes(cell.value) ? CELL_TYPES.detective
        : cell.hints.worker.includes(cell.value) ? CELL_TYPES.worker
        : CELL_TYPES.imposter
    cell.hints.imposter = [1, 2, 3, 4, 5, 6].filter(hint => {
        return !cell.hints.detective.includes(hint) &&
            !cell.hints.worker.includes(hint)
    })

    if (buffer.read(1)) {
        const uint6 = buffer.read(6)
        for (let i = 0; i < 6; i++) {
            if (uint6 << 31 - i >>> 31) {
                const type =
                    cell.hints.detective.includes(6 - i) ? CELL_TYPES.detective
                        : cell.hints.worker.includes(6 - i) ? CELL_TYPES.worker
                        : CELL_TYPES.imposter
                cell.candidates.push({ value: 6 - i, type })
            }
        }
    }

    return { ...cell }
}

// @@exports
export { serializeCell, deserializeCell }
