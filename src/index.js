// @ts-check

// @imports-local
import { generateImpostori } from "./impostori/generate/_index.js"
import { CLIManager } from "./utils/cli/Manager.js"
import { ProgressWidget } from "./utils/cli/Progress.js"
import { Resource } from "./utils/Resource.js"

// @body

import { Worker, isMainThread, workerData, parentPort } from "worker_threads"
import { Impostori } from "./types/Impostori.js"

if (isMainThread) {
    const resource = new Resource(import.meta.url)

    const threadLimit = 6
    const threads = new Set()

    const seed = 3163700000
    const count = 94

    /** @type {Impostori} */
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