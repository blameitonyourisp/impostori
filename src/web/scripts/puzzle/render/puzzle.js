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
import { GameData } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {GameData} data
 * @returns
 */
const renderPuzzle = data => {
    if (!data.spritesheet) { return }

    const container = new Container()
    for (const cell of data.impostori.grid.cells) {
        const platform = getCellPlatform(cell, data)
        platform.setTransform(
            69 * (cell.index % 6),
            82 * Math.floor(cell.index / 6) + 41 * (cell.index % 6)
        )
        container.addChild(platform)
    }

    const selectedPlatform = getCellPlatform(data.selectedCell, data, {
        scale: 3,
        isGrid: false
    })
    selectedPlatform.y = 600
    container.addChild(selectedPlatform)

    if (window.innerWidth < container.width ||
    window.innerHeight < container.height) {
        const scale = Math.min(
            window.innerWidth / container.width,
            window.innerHeight / container.height
        )
        container.setTransform(0, 0, scale, scale)
    }
    container.x = Math.round((data.app.screen.width - container.width) / 2)
    container.y = Math.round((data.app.screen.height - container.height) / 2)
    data.app.stage.addChild(container)
}

// @@exports
export { renderPuzzle }
