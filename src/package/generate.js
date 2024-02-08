// @ts-check

// @imports-local
import { generateImpostori } from "./impostori/generate/index.js"
import { CLIManager } from "./utils/cli/Manager.js"
import { ProgressWidget } from "./utils/cli/Progress.js"
import { Resource } from "./utils/Resource.js"

// @body

import { Worker, isMainThread, workerData, parentPort } from "worker_threads"
import { Impostori } from "./types/Impostori.js"

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

    const createWorker = () => {
        const workerData = { seed: seed + progress.next() }
        const worker = new Worker(resource.__pathname, { workerData })
        threads.add(worker)
        worker.on("error", err => { throw err })
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