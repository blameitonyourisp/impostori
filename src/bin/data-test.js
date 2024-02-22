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
 * @file Integration test file.
 * @author James Reid
 */

// @ts-check

// @@imports-node
import fs from "fs"

// @@imports-utils
import { deserializeImpostori } from "../package/index.js"
import { chiSquared, normalCdf } from "../package/utils/index.js"

// @@body
const path = "./build/samples"
const count = 100000
const entropies = /** @type {number[]} */ ([])

FILE_LOOP: for (const filename of fs.readdirSync(path)) {
    const file = JSON.parse(fs.readFileSync(`${path}/${filename}`).toString())
    for (const serializedImpostori of file) {
        const impostori = deserializeImpostori(serializedImpostori)
        entropies.push(impostori.rawEntropy)
        if (entropies.length >= count) { break FILE_LOOP }
    }
}

for (let j = 1280; j <= 3840; j++) {
    const test = Array.from({ length: 100 }, () => 0)
    for (const i of entropies) {
        // const norm = Math.round(512 + (512 / 2.81 / 0.709) * (sample.data[i] - 6.94))

        let norm = Math.round(512 + 256 * (Math.log(i) - 6.94))
        norm = Math.min(Math.max(norm, 0), 1024)
        let uniform = normalCdf({ upper: norm, mean: 512, stdDev: j / 10 })
        uniform = Math.ceil(uniform * 100)

        test[uniform - 1] = test[uniform - 1] + 1
    }
    const expected = entropies.length / 100
    console.log(j / 10, test.reduce((acc, cur) => acc + (expected - cur) ** 2 / expected, 0))
}

// @@no-exports
