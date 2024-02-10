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
 * @file Serialize grid adjacencies.
 * @author James Reid
 */

// @ts-check

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
 */
const serializeAdjacencies = grid => {
    const buffer = new BitBuffer({ size: 11 }) // 85 bits or 11 bytes
    for (let i = 0; i < 85; i++) {
        const bit = grid.adjacencyIDs.required.has(i)
        buffer.write(bit ? 1 : 0)
    }
    return buffer
}

/**
 *
 * @param {BitBuffer} buffer
 */
const deserializeAdjacencies = buffer => {
    const adjacencyIds = {
        required: new Set(),
        optional: new Set(),
        deleted: new Set()
    }
    for (let i = 0; i < 85; i++) {
        if (buffer.read(1)) { adjacencyIds.required.add(i) }
        else { adjacencyIds.deleted.add(i) }
    }

    return adjacencyIds
}

// @@exports
export { serializeAdjacencies, deserializeAdjacencies }
