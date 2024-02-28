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
 * @file GameData type declaration.
 * @author James Reid
 */

// @ts-check

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Application } from "pixi.js"
import { GridCell, Impostori } from "../../../package/types/index.js"
import { LoadedSpritesheet } from "./LoadedSpritesheet.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @typedef {object} GameData
 * @property {Impostori} impostori
 * @property {number[]} permutedIndexArray
 * @property {GridCell} selectedCell
 * @property {Application} app
 * @property {LoadedSpritesheet} spritesheet
 */

// @@exports
/**
 * @ignore
 * @type {GameData}
 */
export let GameData
