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
 * @file Initial cli for generating impostori.
 * @author James Reid
 */

// @ts-check

// @ts-check

// @@imports-node
import { Worker, isMainThread, workerData, parentPort } from "worker_threads"

// @@imports-package
import { generateImpostori } from "./impostori/generate/index.js"

// @@imports-utils
import { Resource } from "./utils/Resource.js"
import { CLIManager } from "./utils/cli/Manager.js"
import { ProgressWidget } from "./utils/cli/Progress.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Impostori } from "./types/Impostori.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

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

if (isMainThread) {
    console.log(banner)
    const resource = new Resource(import.meta.url)

    const threadLimit = 6
    const threads = new Set()

    const seed = 3163700000
    const count = 1000

    let impostori
    const entropies = []

    const manager = new CLIManager()
    const progress = new ProgressWidget({
        manager: manager,
        description: "Generating impostori",
        endOps: count
    })
    progress.register()

    /**
     *
     * @returns {boolean}
     */
    const createWorker = () => {
        const workerData = { seed: seed + progress.next() }
        const worker = new Worker(resource.__pathname, { workerData })
        threads.add(worker)
        worker.on("error", error => { throw error })
        worker.on("exit", () => {
            threads.delete(worker)
            if (!progress.completeQueue) { createWorker() }
        })
        worker.on("message", msg => {
            impostori = msg
            entropies.push(impostori.rawEntropy)
            progress.increment()
        })
        if (threads.size < threadLimit) { return createWorker() }
        return true
    }

    createWorker()
}
else if (parentPort) {
    const impostori = generateImpostori(workerData.seed)
    parentPort.postMessage(impostori)
}

// @@no-exports
