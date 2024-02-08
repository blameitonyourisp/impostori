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

import { Impostori } from "../../types/Impostori.js";
import { BitBuffer } from "../../utils/BitBuffer.js";
import { serializeGrid } from "./grid.js";

/**
 * 
 * @param {Impostori} impostori 
 */
const serializeImpostori = async impostori => {
    let buffer = new BitBuffer({ size: 128 })
    buffer.writeSequential(impostori.seed, 32)
    buffer.writeSequential(impostori.rawEntropy)

    const grid = serializeGrid(impostori.grid)
    grid.copy({ target: buffer, targetStart: buffer.writePointer })
    // buffer.writePointer = buffer.writePointer
    // console.log(grid)

    // console.log(buffer.writePointer)
    const size = Math.ceil(buffer.writePointer / 8)
    buffer = buffer.copy({ target: new BitBuffer({ size })})

    console.log(impostori)
    console.log(await buffer.toString(impostori.version))
}

const deserializeImpostori = string => {
    const buffer = BitBuffer.from(string)

}

export { serializeImpostori, deserializeImpostori }