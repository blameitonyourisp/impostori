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
 * @file Method to render individual grid platform.
 * @author James Reid
 */

// @ts-check

// @@imports-dependencies
import { Container, Point, Polygon, Sprite } from "pixi.js"

// @@imports-module
import { getCellTiles } from "./tile.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { StatefulLoadingContainer } from "../../components/index.js"
import { GridCell } from "../../../../package/types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
//
const PLATFORM_POLYGON = [
    [21, 2],
    [58, 2],
    [77, 36],
    [58, 70],
    [21, 70],
    [2, 36]
]

//
const TILE_LOCATIONS = [
    [32, 9],
    [17, 19],
    [47, 19],
    [17, 39],
    [47, 39],
    [32, 49]
]

//
const CONNECTION_LOCATIONS = [
    [62, 3], // Connection at index - 5.
    [30, - 15], // Connection at index - 6.
    [- 7, 3] // Connection at index - 1.
]

//
const CENTER_DOT_LOCATION = [34, 31]

/**
 *
 * @param {GridCell} cell
 * @param {StatefulLoadingContainer} root
 * @param {object} obj
 * @param {boolean} [obj.isGrid]
 * @param {number} [obj.scale]
 * @returns {Container}
 */
const getCellPlatform = (cell, root, {
    isGrid = true,
    scale = 1
} = {}) => {
    const { permutedIndexArray, selectedCell, spritesheet } = root.state

    const container = new Container()
    container.setTransform(0, 0, scale, scale)
    container.hitArea = new Polygon(
        PLATFORM_POLYGON.map(([x, y]) => new Point(x, y))
    )

    const selector = permutedIndexArray[cell.index]
    const platformKey = 1 << cell.box & parseInt("100110", 2)
        ? `platform-vertical-${selector % 6 + 1}-cw`
        : `platform-horizontal-${selector % 6 + 1}-cw`
    const platform = new Sprite(spritesheet[platformKey])
    container.addChild(platform)

    const tiles = getCellTiles(cell, root, isGrid)
    for (const [index, tile] of tiles.entries()) {
        tile.setTransform(...TILE_LOCATIONS[index])
        container.addChild(tile)
    }

    const { index, row, column, box } = selectedCell
    const centerDotKey = cell.index === index ? "dot-center-6-x"
        : cell.box === box ? "dot-center-6"
        : cell.row === row ? "dot-center-5"
        : cell.column === column ? "dot-center-5"
        : "dot-center-1"
    const centerDot = new Sprite(spritesheet[centerDotKey])
    centerDot.setTransform(...CENTER_DOT_LOCATION)
    container.addChild(centerDot)

    if (isGrid) {
        container.eventMode = "static"
        container.cursor = "pointer"
        container.on("pointerdown", () => root.redact({ selectedCell: cell }))

        for (const index of cell.adjacentIndexes.all) {
            if (cell.index < index) { continue }
            let connection

            switch (cell.index - index) {
                case 5:
                    connection = new Sprite(spritesheet["connection-1-c"])
                    connection.setTransform(...CONNECTION_LOCATIONS[0])
                    break
                case 6:
                    connection = new Sprite(spritesheet["connection-2-c"])
                    connection.setTransform(...CONNECTION_LOCATIONS[1])
                    break
                default:
                    connection = new Sprite(spritesheet["connection-3-c"])
                    connection.setTransform(...CONNECTION_LOCATIONS[2])
            }

            container.addChild(connection)
        }
    }

    return container
}

// @@exports
export { getCellPlatform }
