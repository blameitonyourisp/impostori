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

// @@imports-package
import { generateImpostori } from "../package/impostori/generate/index.js"
import { Random } from "../package/utils/index.js"

// @@imports-utils
import { CLIManager } from "../package/utils/cli/Manager.js"
import { ProgressWidget } from "../package/utils/cli/Progress.js"

// @@body
const banner = `
88888888                                        8.                        .db.
   88                                           88
   88    .d8bd8b. .d8888b. .d8888b. .d8888b. .d8888P' .d8888b. .d8888b. .d88b.
   88    88 88 88 88    88 88    88 88          88    88    88 88    88     88
   88    88 88 88 88    88 88    88 'Y8888b.    88    88    88 88           88
   88    88    88 88    88 88    88       88    88    88    88 88           88
88888888 '8    8' 888888P' 'Y8888P' .d8888P'    'Y8b. 'Y8888P' '8           8'
                  88
                  8'
`
console.log(banner)

const count = 1
const subCount = 10

const manager = new CLIManager()
const progress = new ProgressWidget({
    manager: manager,
    description: "Generating impostori",
    endOps: count * subCount
})
progress.register()

for (let i = 0; i < count; i++) {
    const seed = Random.seed()

    const impostoris = []
    for (let j = 0; j < subCount; j++) {
        impostoris.push(generateImpostori(seed + j).serializedString)
        progress.increment()
    }

    const path = `./build/samples/impostori_${seed}_${subCount}.json`
    fs.writeFileSync(path, JSON.stringify(impostoris))
}

// @@no-exports
