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
import { CELL_TYPES } from "../type/index.js"

// @@imports-utils
import { BitBuffer } from "../../utils/index.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { CellCandidate, GridCell } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {GridCell} cell
 */
const serializeCell = cell => {
    let buffer = new BitBuffer({ size: 3 }) // max size 19 bits or 3 bytes

    const { value, clientValue, hints } = cell
    const uint3Array = [value, clientValue, ...hints.detective, ...hints.worker]
    for (const uint3 of uint3Array) {
        buffer.write(uint3, { size: 3 })
    }

    if (cell.candidates.length !== 6) {
        buffer.write(1, { size: 1 })
        const candidateValues = cell.candidates.map(({ value }) => value)
        let uint6 = 0
        for (let i = 0; i < 6; i++) {
            if (candidateValues.includes(i + 1)) { uint6 = uint6 | 1 << i }
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
        clientValue: buffer.read(3),
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
                vacant: []
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

    let uint6 = parseInt("111111", 2)
    if (buffer.read(1)) { uint6 = buffer.read(6) }
    for (let i = 0; i < 6; i++) {
        if (uint6 << 31 - i >>> 31) {
            cell.candidates.push(getCandidate(cell, i + 1))
        }
    }

    return { ...cell }
}

/**
 *
 * @param {GridCell} cell
 * @param {number} value
 * @returns {CellCandidate}
 */
const getCandidate = (cell, value) => {
    const type = cell.hints.detective.includes(value) ? CELL_TYPES.detective
        : cell.hints.worker.includes(value) ? CELL_TYPES.worker
        : CELL_TYPES.imposter

    return { value, type }
}

// @@exports
export { serializeCell, deserializeCell }
