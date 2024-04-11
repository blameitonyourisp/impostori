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
 * @file Load pixi spritesheet from json data and spritesheet image.
 * @author James Reid
 */

// @ts-check

// @@imports-dependencies
import { Spritesheet, SCALE_MODES, BaseTexture } from "pixi.js"

// @@body
//
const spritesheetJsonUrl = new URL(
    "../../../../admin/assets/spritesheets/3-bit-small/spritesheet.json",
    import.meta.url
)
const spritesheetImageUrl = new URL(
    "../../../../admin/assets/spritesheets/3-bit-small/spritesheet.png",
    import.meta.url
)

/**
 *
 * @param {URL} jsonUrl
 * @param {URL} imageUrl
 */
const loadSpritesheet = (jsonUrl, imageUrl) => {
    return new Promise((resolve, reject) => {
        const request = new Request(jsonUrl.href)
        fetch(request)
            .then(response => response.json())
            .then(spritesheetData => {
                spritesheetData.meta.image = imageUrl.href
                BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST
                return new Spritesheet(
                    BaseTexture.from(spritesheetData.meta.image),
                    spritesheetData
                )
            })
            .then(spritesheet => spritesheet.parse())
            .then(spritesheet => resolve(spritesheet))
            .catch(error => reject(error))
    })
}

// @@exports
export { loadSpritesheet, spritesheetJsonUrl, spritesheetImageUrl }
