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
 * @file Package generated puzzles into json files with equal numbers of puzzles
 *      of each difficulty.
 * @author James Reid
 */

// @ts-check

// @@imports-node
import * as fs from "fs"

// @@imports-package
import { deserializeImpostori } from "../package/index.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { ImpostoriGrade } from "../package/types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
class ImpostoriPackager {
    /**
     *
     * @param {string} sourcePath
     * @param {string} destinationPath
     * @param {number} puzzlesPerGrade
     */
    constructor(sourcePath, destinationPath, puzzlesPerGrade = 1) {
        this.sourcePath = sourcePath
        this.destinationPath = destinationPath
        this.puzzlesPerGrade = puzzlesPerGrade

        this.day = 0
        for (const filename of fs.readdirSync(this.destinationPath)) {
            if (!filename.match(/^impostori_\d+.json$/)) { continue }
            this.day++
        }

        /** @type {Map.<ImpostoriGrade,string>[]} */
        this.puzzleSets = []
        this.completedSets = 0
    }

    package() {
        for (const filename of fs.readdirSync(this.sourcePath)) {
            if (!filename.match(/^impostori_\d+_\d+.json$/)) { continue }

            const fileBuffer = fs.readFileSync(`${this.sourcePath}/${filename}`)
            const serializedImpostoris = JSON.parse(fileBuffer.toString())
            for (const serializedImpostori of serializedImpostoris) {
                const impostori = deserializeImpostori(serializedImpostori)

                let saved = false
                for (const puzzleSet of this.puzzleSets) {
                    if (puzzleSet.has(impostori.grade)) { continue }
                    puzzleSet.set(impostori.grade, serializedImpostori)
                    saved = true
                    if (puzzleSet.size === 5) { this.completedSets++ }
                    if (this.completedSets === this.puzzlesPerGrade) {
                        this.saveSet()
                    }
                    break
                }
                if (!saved) {
                    /** @type {Map.<ImpostoriGrade,string>} */
                    const map = new Map()
                    map.set(impostori.grade, serializedImpostori)
                    this.puzzleSets.push(map)
                }
            }
        }
    }

    saveSet() {
        const completedSets = this.puzzleSets.splice(0, this.completedSets)
        this.completedSets = 0

        const json = JSON.stringify({
            beginner: completedSets.map(map => map.get("beginner")),
            easy: completedSets.map(map => map.get("easy")),
            medium: completedSets.map(map => map.get("medium")),
            hard: completedSets.map(map => map.get("hard")),
            expert: completedSets.map(map => map.get("expert"))
        })

        const path = `${this.destinationPath}/impostori_${this.day}.json`
        fs.writeFileSync(path, json)

        this.day++
    }
}

const sourcePath = "./build/samples"
const destinationPath = "./build/sets"
const packager = new ImpostoriPackager(sourcePath, destinationPath)
packager.package()

// @@no-exports
