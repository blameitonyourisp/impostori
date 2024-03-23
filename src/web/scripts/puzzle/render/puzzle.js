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
 * @file Method to render interactive puzzle grid.
 * @author James Reid
 */

// @ts-check

// @@imports-dependencies
import { Container } from "pixi.js"

// @@imports-module
import { getCellPlatform } from "./platform.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { StatefulLoadingContainer } from "../../components/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 * @param {StatefulLoadingContainer} root
 * @returns
 */
const renderPuzzle = root => {
    const { app, width, height, puzzle, selectedCell } = root.state
    const container = new Container()
    for (const cell of puzzle.grid.cells) {
        const platform = getCellPlatform(cell, root)
        platform.setTransform(
            69 * (cell.index % 6),
            82 * Math.floor(cell.index / 6) + 41 * (cell.index % 6)
        )
        container.addChild(platform)
    }

    const selectedPlatform = getCellPlatform(selectedCell, root, {
        scale: 3,
        isGrid: false
    })
    selectedPlatform.y = 575
    container.addChild(selectedPlatform)

    if (width < container.width || height < container.height) {
        const scale = Math.min(
            width / container.width,
            height / container.height
        )
        container.setTransform(0, 0, scale, scale)
    }
    container.x = Math.round((width - container.width) / 2)
    container.y = Math.round((height - container.height) / 2)
    app.stage.addChild(container)
}

// @@exports
export { renderPuzzle }
