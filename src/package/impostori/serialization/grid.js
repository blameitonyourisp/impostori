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
 * @file Serialize impostori grid.
 * @author James Reid
 */

// @ts-check

// @@imports-package
import {
    requireGridAdjacency,
    removeGridAdjacency,
    getAdjacencyData
} from "../adjacency/index.js"

// @@imports-module
import { serializeAdjacencies, deserializeAdjacencies } from "./adjacency.js"
import { serializeCell, deserializeCell } from "./cell.js"

// @@imports-utils
import { BitBuffer, Random } from "../../utils/index.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Grid, GridCell } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {Grid} grid
 * @returns {BitBuffer}
 */
const serializeGrid = grid => {
    let buffer = new BitBuffer({ size: 128 })
    for (const cell of grid.cells) {
        const cellBuffer = serializeCell(cell)
        cellBuffer.copy({ target: buffer, sourceEnd: cellBuffer.writePointer })
    }

    const adjacencies = serializeAdjacencies(grid)
    adjacencies.copy({ target: buffer, sourceEnd: adjacencies.writePointer })

    const size = Math.ceil(buffer.writePointer / 8)
    buffer = buffer.copy({
        target: new BitBuffer({ size }),
        sourceEnd: buffer.writePointer
    }) // add source end
    return buffer
}

/**
 *
 * @param {BitBuffer} buffer
 * @param {number} seed
 * @returns {Grid}
 */
const deserializeGrid = (buffer, seed) => {
    const typeIndexes = {
        detective: [],
        worker: [],
        imposter: [],
        vacant: []
    }

    const cells = /** @type {GridCell[]} */ ([])
    for (let i = 0; i < 36; i++) {
        const cell = deserializeCell(buffer, i)
        typeIndexes[cell.type].push(i)
        cells.push(cell)
    }

    cells.forEach(cell => {
        cell.adjacentIndexes.all.forEach(adjacentIndex => {
            const { type } = cells[adjacentIndex]
            cell.adjacentIndexes.type[type].push(adjacentIndex)
        })
    })

    const adjacencyIds = deserializeAdjacencies(buffer)
    let grid = /** @type {Grid} */ ({
        cells,
        typeIndexes,
        adjacencyIDs: {
            required: new Set(),
            optional: new Set(Array.from({ length: 85 }, (_, i) => i)),
            deleted: new Set()
        },
        random: new Random(seed),
        isGenerating: false
    })

    for (const adjacencyId of grid.adjacencyIDs.optional) {
        if (adjacencyIds.required.has(adjacencyId)) {
            grid = requireGridAdjacency(getAdjacencyData(adjacencyId), grid)
        }
        else {
            grid = removeGridAdjacency(getAdjacencyData(adjacencyId), grid)
        }
    }

    return grid
}

// @@exports
export { serializeGrid, deserializeGrid }
