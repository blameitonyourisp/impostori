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
 * @file Serialize impostori.
 * @author James Reid
 */

// @ts-check

// @@imports-module
import { serializeGrid } from "./grid.js"

// @@imports-utils
import { BitBuffer } from "../../utils/index.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Impostori } from "../../types/Impostori.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {Impostori} impostori
 */
const serializeImpostori = async impostori => {
    let buffer = new BitBuffer({ size: 128 })
    buffer.write(impostori.seed)
    buffer.write(impostori.rawEntropy)

    const grid = serializeGrid(impostori.grid)
    grid.copy({ target: buffer, targetStart: buffer.writePointer })
    // buffer.writePointer = buffer.writePointer
    // console.log(grid)

    // console.log(buffer.writePointer)
    const size = Math.ceil(buffer.writePointer / 8)
    buffer = buffer.copy({ target: new BitBuffer({ size }) })

    console.log(impostori)
    console.log(await buffer.toString())
}

/**
 *
 * @param {string} string
 */
const deserializeImpostori = string => {
    const buffer = BitBuffer.from(string)
    buffer
    // Implement deserializing of impostori.
}

// @@exports
export { serializeImpostori, deserializeImpostori }
