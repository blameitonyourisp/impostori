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

// @@imports-package
import { deserializeImpostori } from "../../../package/index.js"

// @@imports-module
import { StatefulLoadingContainer } from "../components/index.js"

// @@imports-submodule
import { renderPuzzle } from "./render/index.js"

// @@body
/**
 * @param {StatefulLoadingContainer} root
 */
const runPuzzle = root => {
    const impostori = deserializeImpostori(root.state.serializedPuzzle)
    const content = StatefulLoadingContainer.contentContainer()

    //
    let { width, height } = root.getBoundingClientRect()
    width -= 8
    height -= 8

    //
    const app = new Application({
        width: width,
        height: height,
        resolution: window.devicePixelRatio,
        autoDensity: true,
        backgroundColor: 0xffecd6
    })
    content.append(/** @type {any} */ (app.view))

    const data = {}
    data.impostori = impostori
    data.permutedIndexArray = data.impostori.grid.random.shuffledIndexArray(36)
    data.selectedCell = data.impostori.grid.cells[0]
    data.spritesheet = root.state.spritesheet
    data.app = app

    const puzzle = deserializeImpostori(root.state.serializedPuzzle)
    root.redact({
        app,
        width,
        height,
        puzzle,
        permutedIndexArray: puzzle.grid.random.shuffledIndexArray(36),
        selectedCell: puzzle.grid.cells[0]
    })
    renderPuzzle(root)

    root.load(content)
}

// @@exports
export { runPuzzle }
