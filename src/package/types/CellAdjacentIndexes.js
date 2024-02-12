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
 * @file CellAdjacentIndexes type declaration.
 * @author James Reid
 */

// @ts-check

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { AdjacentIndexTypeFilter } from "./AdjacentIndexTypeFilter.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 * Object describing the existing adjacent indexes of a cell. All possible
 * adjacent cell indexes are included on a cell object in its initial state.
 * During grid creation, when {@link Adjacency Adjacencies} are removed, these
 * changes are reflected on this object by removing the relevant raw adjacent
 * indexes. Note that these are only cell indexes which directly point to other
 * cells in the grid, and should not be confused with {@link Adjacency}.
 *
 * @typedef {object} CellAdjacentIndexes
 * @property {number[]} all - All adjacent cell indexes.
 * @property {number[]} required - Adjacent cell indexes flagged as required for
 *      example between an imposter and a detective cell.
 * @property {number[]} optional - Adjacent cell indexes flagged as optional.
 *      These may be randomly pruned during grid creation in order to produce a
 *      unique grid with fewer adjacencies. Initially all adjacent indexes are
 *      considered to be optional.
 * @property {AdjacentIndexTypeFilter} type - Adjacent indexes filtered by type.
 */

// @@exports
/**
 * @ignore
 * @type {CellAdjacentIndexes}
 */
export let CellAdjacentIndexes
