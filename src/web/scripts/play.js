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
 * @file <INSERT_FILE_DESCRIPTION_HERE>
 * @author James Reid
 */

// @ts-check

// @@imports-dependencies
import { Application, Spritesheet, SCALE_MODES, BaseTexture } from "pixi.js"

// @@imports-package
import { deserializeImpostori } from "../../package/index.js"

// @@imports-submodule
import { render } from "./render/game.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { GameData } from "./types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
const data = /** @type {GameData} */ ({})

const urlParams = new URLSearchParams(window.location.search)
let serializedImpostori = urlParams.get("puzzle")
if (!serializedImpostori) {
    // Temporary hard-coded puzzle.
    serializedImpostori = "HTEuMC4wHTAuMC4x_AO5BNIYxRDWCOEM5AbjDUMGYRU0CdIVZQVGCMQFNhkzFMUJ0RHiClUIshTBCNYOYxTkDuYR0w5lBmQKYgphFLEVRBTiClMVNhLlGddlmlRG9OkH2r-b0cBKiBAA"
    // throw new Error()
}

data.impostori = deserializeImpostori(serializedImpostori)
data.permutedIndexArray = data.impostori.grid.random.shuffledIndexArray(36)
data.selectedCell = data.impostori.grid.cells[0]

BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    backgroundColor: 0xffecd6
})
document
    .getElementsByClassName("pixi-app")[0]
    .appendChild(/** @type {any} */ (app.view))
data.app = app

//
const spritesheetJsonUrl = new URL(
    "../../../admin/assets/spritesheets/3-bit-small/spritesheet.json",
    import.meta.url
)
const spritesheetImageUrl = new URL(
    "../../../admin/assets/spritesheets/3-bit-small/spritesheet.png",
    import.meta.url
)

const request = new Request(spritesheetJsonUrl.href)
fetch(request)
    .then(response => response.json())
    .then(spritesheetData => {
        spritesheetData.meta.image = spritesheetImageUrl.href
        return new Spritesheet(
            BaseTexture.from(spritesheetData.meta.image),
            spritesheetData
        )
    })
    .then(spritesheet => spritesheet.parse())
    .then(spritesheet => data.spritesheet = spritesheet)
    .then(() => render(data))

// @@no-exports
