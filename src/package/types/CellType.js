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
 * @file CellType type declaration.
 * @author James Reid
 */

// @ts-check

// @@no-imports

// @@body
/**
 * Object containing all data for a cell required to generate a grid,
 * solve a puzzle and to display a puzzle. This includes mainly data identifying
 * the position of the cell in the grid, data identifying the contents of the
 * cell, and data identifying adjacency relationships with neighboring cells.
 *
 * @typedef {"detective"|"worker"|"imposter"|"vacant"} CellType
 */

// @@exports
/**
 * @ignore
 * @type {CellType}
 */
export let CellType
