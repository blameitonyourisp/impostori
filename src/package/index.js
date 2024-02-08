// Copyright (c) 2023 James Reid. All rights reserved.
//
// This source code file is licensed under the terms of the MIT license, a copy
// of which may be found in the LICENSE.md file in the root of this repository.
//
// For a template copy of the license see one of the following 3rd party sites:
//      - <https://opensource.org/licenses/MIT>
//      - <https://choosealicense.com/licenses/mit>
//      - <https://spdx.org/licenses/MIT>

/**
 * @file Package entrypoint.
 * @author James Reid
 */

// @ts-check

// @@no-imports

// @@body
/**
 * @todo include max retries to prevent hanging
 * @todo resolve progress queue to prevent the -1 case from causing generate
 * @todo change random "shuffle" to "permute"
 * @todo cause grid solve to fail if number of grids is too large and or prevent
 *      random dropout on adj pruning from being too high
 * @todo iteratively increase random dropout to target dropout, solving each
 *      time to prevent an impossible solve (?)
 * @todo refactor grid cell to cell
 * @todo move cell and grid adj files to anoth dir - name ?
 * @todo refactor print to generate module and update to display clearer
 * @todo refactor getAdjacencyData to just getAdjacency
 * @todo update adjacency function to return id 0 to 84
 * @todo replace "WORKER", "IMPOSTER" etc. with an object ref
 */

// @@no-exports
