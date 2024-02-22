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
 * @file Impostori type declaration.
 * @author James Reid
 */

// @ts-check

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Grid } from "./Grid.js"
import { ImpostoriGrade } from "./ImpostoriGrade.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @typedef {object} Impostori
 * @property {Grid} grid
 * @property {number} seed
 * @property {object} version
 * @property {string} version.puzzle
 * @property {string} version.repository
 * @property {number} rawEntropy
 * @property {number} normalizedEntropy
 * @property {number} uniformEntropy
 * @property {number} rating
 * @property {ImpostoriGrade} grade
 * @property {string} serializedString
 */

// @@exports
/**
 * @ignore
 * @type {Impostori}
 */
export let Impostori
