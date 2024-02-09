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

// @@imports-module
import { serializeAdjacencies } from "./adjacency.js"
import { serializeCell } from "./cell.js"

// @@imports-utils
import { BitBuffer } from "../../utils/index.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Grid } from "../../types/index.js"
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
    buffer = buffer.copy({ target: new BitBuffer({ size }) }) // add source end
    return buffer
}

const deserializeGrid = () => {

}

// @@exports
export { serializeGrid, deserializeGrid }
