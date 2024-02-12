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
 * @file AdjacentIndexTypeFilter type declaration.
 * @author James Reid
 */

// @ts-check

// @@imports-types

// @@body
/**
 * Adjacent indexes of a cell filtered by type of adjacent cell.
 *
 * @typedef {object} AdjacentIndexTypeFilter
 * @property {number[]} detective - Adjacent indexes of detective cells.
 * @property {number[]} worker - Adjacent indexes of imposter cells.
 * @property {number[]} imposter - Adjacent indexes of worker cells.
 * @property {number[]} vacant - Adjacent indexes of cells without a type.
 */

// @@exports
/**
 * @ignore
 * @type {AdjacentIndexTypeFilter}
 */
export let AdjacentIndexTypeFilter
