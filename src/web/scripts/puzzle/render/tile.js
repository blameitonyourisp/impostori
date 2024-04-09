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
import { getCandidate } from "../../../../package/index.js"

// @@imports-package
import { IMPOSTORI_EVENTS } from "../../events.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { StatefulLoadingContainer } from "../../components/index.js"
import { GridCell } from "../../../../package/types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
const {
    selectedCellUpdated
} = IMPOSTORI_EVENTS

/**
 *
 * @param {GridCell} cell
 * @param {StatefulLoadingContainer} root
 * @param {boolean} isGrid
 * @returns {Container[]}
 */
const getCellTiles = (cell, root, isGrid = true) => {
    const { spritesheet } = root.state

    const hints = [
        ...cell.hints.detective,
        ...cell.hints.worker,
        ...cell.hints.imposter
    ]

    const tiles = /** @type {Container[]} */ ([])
    for (const value of hints) {
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

        const type = cell.candidates
            .find((candidate => value === candidate.value))?.type
        if (type === "detective") {
            const typeDot = new Sprite(spritesheet["dot-type-5"])
            container.addChild(typeDot)
        }
        else if (type === "imposter") {
            const typeDot = new Sprite(spritesheet["dot-type-4"])
            typeDot.setTransform(0, 11)
            container.addChild(typeDot)
        }

        tiles.push(container)

        if (!isGrid) {
            container.eventMode = "static"
            container.cursor = "pointer"
            container.on("pointerdown", () => {
                cell = { ...cell }
                // const updatedCell = { ...cell }
                // updatedCell.clientValue = 2

                if (cell.clientValue) {
                    if (value === cell.clientValue) {
                        cell.clientValue = 0
                    }
                    if (cell.clientCandidates.length === 1) {
                        cell.clientCandidates = cell.candidates
                    }
                }
                else if (!candidateValues.includes(value)) {
                    cell.clientValue = value
                    // updatedCell.clientCandidates = [...cell.clientCandidates]
                    cell.clientCandidates.push(getCandidate(cell, value))
                }
                else {
                    cell.clientCandidates = cell
                        .clientCandidates
                        .filter(candidate => candidate.value !== value)
                }
                if (cell.clientCandidates.length === 1) {
                    // stuck in selected state
                    cell.clientValue = cell.clientCandidates[0].value
                }

                root.state.selectedCell = cell
                const event = new CustomEvent(
                    selectedCellUpdated,
                    { detail: { tileUpdated: true } }
                )
                root.dispatchEvent(event)
            })
        }
    }

    return tiles
}

// @@exports
export { getCellTiles }
