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
import { serializeGrid, deserializeGrid } from "./grid.js"

// @@imports-package
import { getGradeString, getRating } from "../generate/index.js"

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
const serializeImpostori = impostori => {
    let buffer = new BitBuffer({ size: 128 })
    buffer.writeString(impostori.version.puzzle)
    buffer.writeString(impostori.version.repository)
    buffer.writeAbsolute(impostori.seed)

    const grid = serializeGrid(impostori.grid)
    grid.copy({ target: buffer, sourceEnd: grid.writePointer })

    buffer.writeAbsolute(impostori.rawEntropy)
    buffer.write(impostori.normalizedEntropy, { size: 10 })
    buffer.write(impostori.uniformEntropy, { size: 10 })

    const size = Math.ceil(buffer.writePointer / 8)
    buffer = buffer.copy({
        target: new BitBuffer({ size }),
        sourceEnd: buffer.writePointer
    })

    return buffer.toString()
}

/**
 *
 * @param {string} serializedString
 */
const deserializeImpostori = serializedString => {
    const buffer = BitBuffer.from(serializedString)

    const version = {
        puzzle: buffer.readString(),
        repository: buffer.readString()
    } // compare to expected version in param
    const seed = buffer.readAbsolute()

    const impostori = /** @type {Impostori} */ ({
        version,
        seed,
        grid: deserializeGrid(buffer, 0),
        rawEntropy: buffer.readAbsolute(),
        normalizedEntropy: buffer.read(10),
        uniformEntropy: buffer.read(10)
    })

    const rating = getRating(impostori.uniformEntropy)
    const grade = getGradeString(rating)

    return { ...impostori, rating, grade, serializedString }
}

// @@exports
export { serializeImpostori, deserializeImpostori }
