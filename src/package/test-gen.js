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

// @@imports-package
import { generateImpostori } from "./impostori/generate/index.js"
import { deserializeImpostori } from "./impostori/serialization/impostori.js"
import { getAdjacencyData } from "./index.js"
import { Random } from "./utils/index.js"
// import { printGrid } from "./index.js"

// @@body
const seed = 3163700000
const impostori = generateImpostori(seed)
const deserializedImpostori = deserializeImpostori(impostori.serializedString)

// for (let i = 0; i < 35; i++) {
//     console.log("ORIGINAL:")
//     console.log(impostori.grid.cells[i])
//     console.log("DESERIALIZED:")
//     console.log(deserializedImpostori.grid.cells[i])
// }

// impostori.grid.random = new Random(impostori.seed)
console.log(impostori.grid.typeIndexes)

console.log(JSON.stringify(impostori) === JSON.stringify(deserializedImpostori))
// console.log(
//     // JSON.stringify(impostori).length,
//     JSON.stringify(impostori).slice(4100, 4175) ===
//     JSON.stringify(deserializedImpostori).slice(4100, 4175)
// )

// // console.log(
// //     JSON.stringify(impostori).length,
// //     JSON.stringify(impostori).slice(2750) ===
// //     JSON.stringify(deserializedImpostori).slice(2750)
// // )

// console.log(JSON.stringify(impostori).slice(4150, 4175))
// console.log(JSON.stringify(deserializedImpostori).slice(4150, 4175))

/**
 * recreation of impostori:
 *  - seed
 *  - raw entropy
 *  - corrected entropy (derived from raw according to version specific code)
 *  - rating (as above)
 *  - grade (as above)
 *  - serialized grid string
 *
 * required --> seed, version, entropy, serialized grid string
 */

/**
 * recreation of grid:
 *  - cells
 *  - type indexes (grid assumed complete, and derived from cells)
 *  - adj (all assumed optional, then added to required list from adj bitmap)
 *  - random (state of random number generator)
 *  - isGenerating (false)
 *
 * required --> adj bitmap, prng state
 */

/**
 * recreation of cell:
 *  - index (derived from location in serialized string)
 *  - row, column, box (derived from index)
 *  - value
 *  - type (derived from value and hints)
 *  - hints (only worker and detective required; imposter hints inferred)
 *  - adjacent indexes & types (derived from adj bitmap)
 *
 * required --> value, detective hint, worker hints
 */

// @@no-exports
