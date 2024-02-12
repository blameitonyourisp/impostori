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
 * @file Grid type declaration.
 * @author James Reid
 */

// @ts-check

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { GridAdjacencyIds } from "./GridAdjacencyIds.js"
import { GridCell } from "./GridCell.js"
import { GridTypeIndexes } from "./GridTypeIndexes.js"
import { Random } from "../utils/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @typedef {object} Grid
 * @property {GridCell[]} cells
 * @property {GridTypeIndexes} typeIndexes
 * @property {GridAdjacencyIds} adjacencyIDs
 * @property {Random} random
 * @property {boolean} isGenerating
 */

// @@exports
/**
 *
 * @ignore
 * @type {Grid}
 */
export let Grid
