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
 * @file Method to render individual number tiles on grid platforms.
 * @author James Reid
 */

// @ts-check

// @@imports-dependencies
import { Container, Sprite } from "pixi.js"

// @@imports-package
import { serializeImpostori } from "../../../../package/index.js"

// @@imports-module
import { renderPuzzle } from "./puzzle.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { StatefulLoadingContainer } from "../../components/index.js"
import { GridCell } from "../../../../package/types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {GridCell} cell
 * @param {StatefulLoadingContainer} root
 * @param {boolean} isGrid
 * @returns {Container[]}
 */
const getCellTiles = (cell, root, isGrid = true) => {
    const { spritesheet } = root.state
    // cell = { ...cell }

    const hints = [
        ...cell.hints.detective,
        ...cell.hints.worker,
        ...cell.hints.imposter
    ]

    const tiles = /** @type {Container[]} */ ([])
    for (const [index, value] of hints.entries()) {
        const container = new Container()

        const candidateValues = cell.clientCandidates.map(({ value }) => value)
        const tileKey = cell.clientValue
            ? value === cell.clientValue ? "tile-3" : "tile-1"
            : candidateValues.includes(value) ? "tile-2" : "tile-1"
        const tile = new Sprite(spritesheet[tileKey])
        tile.setTransform(2, 0)

        const digit = new Sprite(spritesheet[`digit-${value}`])
        digit.setTransform(5, 2)

        container.addChild(tile, digit)

        // const type = cell
        //     .candidates
        //     .find((candidate => value === candidate.value))
        //     ?.type
        if (index === 0) {
            const typeDot = new Sprite(spritesheet["dot-type-5"])
            container.addChild(typeDot)
        }
        else if ([3, 4, 5].includes(index)) {
            const typeDot = new Sprite(spritesheet["dot-type-4"])
            typeDot.setTransform(0, 11)
            container.addChild(typeDot)
        }

        tiles.push(container)


        if (!isGrid) {
            container.eventMode = "static"
            container.cursor = "pointer"
            container.on("pointerdown", () => {
                if (cell.clientValue) {
                    if (value === cell.clientValue) { cell.clientValue = 0 }
                }
                else if (!candidateValues.includes(value)) {
                    cell.clientValue = value
                    cell.clientCandidates.push(getCandidate(cell, value))
                }
                else {
                    cell.clientCandidates = cell.clientCandidates.filter(candidate => candidate.value !== value)
                }
                if (cell.clientCandidates.length === 1) {
                    cell.clientValue = cell.clientCandidates[0].value // stuck in selected state
                }
                // data.impostori.serializedString = serializeImpostori(data.impostori)
                renderPuzzle(root)
            })
        }
    }

    return tiles
}

// @@exports
export { getCellTiles }
