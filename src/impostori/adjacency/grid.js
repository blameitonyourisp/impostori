/** @license MIT */
// Copyright (c) 2022 James Reid. All rights reserved.
//
// This source code file is licensed under the terms of the MIT license, a copy
// of which may be found in the LICENSE.md file in the root of this repository.  
// 
// For a template copy of the license see one of the following 3rd party sites:
//      * <https://opensource.org/licenses/MIT>
//      * <https://choosealicense.com/licenses/mit>
//      * <https://spdx.org/licenses/MIT>

// @ts-check

// @imports-local
import { removeCellAdjacency, addCellAdjacency, requireCellAdjacency } from "./_index.js"
// @imports-types
import { Adjacency, Grid } from "../../types/_index.js"

// @body
/**
 * 
 * 
 * @summary x
 * 
 * @function
 * @static
 * 
 * @param {Adjacency} adjacency
 * @param {Grid} grid
 * @returns {Grid}
 */
const removeGridAdjacency = (adjacency, grid) => {
    if (!grid.adjacencyIDs.optional.has(adjacency.id)) { return grid }

    const optional = new Set(grid.adjacencyIDs.optional)
    const deleted = new Set(grid.adjacencyIDs.deleted)
    optional.delete(adjacency.id)
    deleted.add(adjacency.id)
    const adjacencyIDs = { ...grid.adjacencyIDs, optional, deleted }

    const cells = [...grid.cells]
    const upperCell = cells[adjacency.upperIndex]
    const lowerCell = cells[adjacency.lowerIndex]

    cells[adjacency.upperIndex] = removeCellAdjacency(upperCell, lowerCell)  
    cells[adjacency.lowerIndex] = removeCellAdjacency(lowerCell, upperCell)

    return { ...grid, cells, adjacencyIDs }
}

/**
 * puts back in optional
 * 
 * @summary x
 * 
 * @function
 * @static
 * 
 * @param {Adjacency} adjacency
 * @param {Grid} grid
 * @returns {Grid}
 */
const addGridAdjacency = (adjacency, grid) => {
    if (!grid.adjacencyIDs.deleted.has(adjacency.id)) { return grid }

    const optional = new Set(grid.adjacencyIDs.optional)
    const deleted = new Set(grid.adjacencyIDs.deleted)
    optional.add(adjacency.id)
    deleted.delete(adjacency.id)
    const adjacencyIDs = { ...grid.adjacencyIDs, optional, deleted }

    const cells = [...grid.cells]
    const upperCell = cells[adjacency.upperIndex]
    const lowerCell = cells[adjacency.lowerIndex]

    cells[adjacency.upperIndex] = addCellAdjacency(upperCell, lowerCell)  
    cells[adjacency.lowerIndex] = addCellAdjacency(lowerCell, upperCell)

    return { ...grid, cells, adjacencyIDs }
}

/**
 * 
 * 
 * @summary x
 * 
 * @function
 * @static
 * 
 * @param {Adjacency} adjacency
 * @param {Grid} grid
 * @returns {Grid}
 */
const requireGridAdjacency = (adjacency, grid) => {
    if (!grid.adjacencyIDs.optional.has(adjacency.id)) { return grid }

    const optional = new Set(grid.adjacencyIDs.optional)
    const required = new Set(grid.adjacencyIDs.required)
    optional.delete(adjacency.id)
    required.add(adjacency.id)
    const adjacencyIDs = { ...grid.adjacencyIDs, required, optional }

    const cells = [...grid.cells]
    const upperCell = cells[adjacency.upperIndex]
    const lowerCell = cells[adjacency.lowerIndex]

    cells[adjacency.upperIndex] = requireCellAdjacency(upperCell, lowerCell)  
    cells[adjacency.lowerIndex] = requireCellAdjacency(lowerCell, upperCell)

    return { ...grid, cells, adjacencyIDs }
}

/**
 * Returns an adjacency object given either 2 (assumed adjacent) cell indexes,
 * or one adjacency id value. This allows the missing information to be inferred
 * in order to reconstruct the adjacency object with upper and lower cell 
 * indexes, and adjacency id.
 * 
 * @summary Calculate adjacency object
 * 
 * @function
 * @static
 * @see Adjacency
 * @tutorial first-tutorial
 * 
 * @param {...number} args - Takes either 2 adjacency cell indexes (ranged from 
 *      0 to 35), or 1 adjacency id value (range 0001 to 3435)
 * @returns {Adjacency}
 */
const getAdjacencyData = (...args) => {
    // declare variables required for the returned adjacency object
    let upperIndex, lowerIndex, id

    // if 2 arguments are passed treat them as adjacent cell indexes, otherwise
    // if one argument is passed treat it as an adjacency id
    if (args.length > 1) {
        // sort provided cell indexes by value
        upperIndex = Math.max(...args)
        lowerIndex = Math.min(...args)
        // concatenate cell indexes into an id of the form "xxyy" where "xx" and
        // "yy" are separate two digit numbers representing the upper and lower
        // cell indexes
        id = upperIndex * 100 + lowerIndex
    }
    else {
        id = args[0]
        // split adjacency id (in form "xxyy") into constituent cell indexes
        // "xx" and "yy"
        upperIndex = Math.floor(id / 100)
        lowerIndex = id % 100
    }

    return { upperIndex, lowerIndex, id }
}

// @exports
export { removeGridAdjacency, addGridAdjacency, requireGridAdjacency, getAdjacencyData }
