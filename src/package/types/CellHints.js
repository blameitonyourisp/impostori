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
 * @file CellHints type declaration.
 * @author James Reid
 */

// @ts-check

// @@imports-types

// @@body
/**
 * Cell hints as will appear in the final puzzle, each member array contains a
 * subset of values from 1 to 6.
 *
 * @typedef {object} CellHints
 * @property {number[]} detective - Array length 1 containing detective hints.
 * @property {number[]} worker - Array length 2 containing worker hints.
 * @property {number[]} imposter - Array length 3 containing imposter hints.
 */

// @@exports
/**
 * @ignore
 * @type {CellHints}
 */
export let CellHints
