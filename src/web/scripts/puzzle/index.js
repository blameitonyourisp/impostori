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
 * @file Run puzzle page.
 * @author James Reid
 */

// @ts-check

// @@imports-dependencies
import { Application } from "pixi.js"
// import { proxyToObject } from "@blameitonyourisp/boutique"
import { serializeImpostori } from "../../../package/index.js"

// @@imports-package
import { IMPOSTORI_EVENTS } from "../events.js"

// @@imports-module
import { LoadingContainer } from "../components/index.js"

// @@imports-submodule
import { renderPuzzle } from "./render/index.js"

// @@body
const { selectedCellUpdated } = IMPOSTORI_EVENTS

/**
 * @param {LoadingContainer} root
 * @param {any} state
 */
const runPuzzle = (root, state) => {
    const content = LoadingContainer.contentContainer()

    let { width, height } = root.getBoundingClientRect()
    width -= 8
    height -= 8

    const app = new Application({
        width: width,
        height: height,
        resolution: window.devicePixelRatio,
        autoDensity: true,
        backgroundColor: 0xffecd6
    })
    content.append(/** @type {any} */ (app.view))

    const { puzzle } = state
    Object.assign(state, {
        app,
        width,
        height,
        permutedIndexArray: puzzle.grid.random.shuffledIndexArray(36),
        selectedCell: puzzle.grid.cells[0],
    })
    renderPuzzle(root, state)

    const listener = (/** @type {any} */ event) => {
        const { selectedCell } = state

        if (event?.detail?.tileUpdated) {
            state.puzzle.grid.cells.splice(selectedCell.index, 1, selectedCell)
            state.serializedPuzzle = serializeImpostori(state.puzzle)
        }

        renderPuzzle(root, state)
    }
    root.addEventListener(selectedCellUpdated, listener)

    root.load(content)

    const observer = new MutationObserver(event => {
        if (event[0].removedNodes) {
            for (const node of event[0].removedNodes) {
                if (node === content) {
                    root.removeEventListener(selectedCellUpdated, listener)
                    observer.disconnect()
                }
            }
        }
    })
    observer.observe(root, { childList: true })
}

// @@exports
export { runPuzzle }
