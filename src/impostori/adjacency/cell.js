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

// @imports-types
import { GridCell } from "../../types/_index.js"

// @body
/**
 * 
 * 
 * @summary x
 * 
 * @function
 * @static
 * 
 * @param {GridCell} cell
 * @param {GridCell} targetCell 
 * @returns {GridCell}
 */
const removeCellAdjacency = (cell, targetCell) => {
    const targetIndex = targetCell.index
    
    const optionalIndex = cell.adjacentIndexes.optional.indexOf(targetIndex)
    const allIndex = cell.adjacentIndexes.all.indexOf(targetIndex)
    if (optionalIndex === -1 || allIndex === -1) { return cell }

    const all = [...cell.adjacentIndexes.all]
    all.splice(allIndex, 1)

    const optional = [...cell.adjacentIndexes.optional]
    optional.splice(optionalIndex, 1)

    const type = { ...cell.adjacentIndexes.type }
    const key = targetCell.type.toLowerCase()
    type[key] = [...type[key]]
    type[key].splice(type[key].indexOf(targetIndex), 1)

    const adjacentIndexes = { ...cell.adjacentIndexes, all, optional, type }
    return { ...cell, adjacentIndexes }
}

/**
 * 
 * 
 * @summary x
 * 
 * @function
 * @static
 * 
 * @param {GridCell} cell
 * @param {GridCell} targetCell 
 * @returns {GridCell}
 */
const addCellAdjacency = (cell, targetCell) => {
    const targetIndex = targetCell.index
    if (cell.adjacentIndexes.all.includes(targetIndex)) { return cell }

    const all = [...cell.adjacentIndexes.all, targetIndex]
    const optional = [...cell.adjacentIndexes.optional, targetIndex]

    const type = { ...cell.adjacentIndexes.type }
    const key = targetCell.type.toLowerCase()
    type[key] = [...type[key], targetIndex]

    const adjacentIndexes = { ...cell.adjacentIndexes, all, optional, type }
    return { ...cell, adjacentIndexes }
}

/**
 * 
 * 
 * @summary x
 * 
 * @function
 * @static
 * 
 * @param {GridCell} cell
 * @param {GridCell} targetCell 
 * @returns {GridCell}
 */
const requireCellAdjacency = (cell, targetCell) => {
    const targetIndex = targetCell.index
    
    const optionalIndex = cell.adjacentIndexes.optional.indexOf(targetIndex)
    if (optionalIndex === -1) { return cell }

    const required = [...cell.adjacentIndexes.required]
    required.push(targetIndex)

    const optional = [...cell.adjacentIndexes.optional]
    optional.splice(optionalIndex, 1)

    const adjacentIndexes = { ...cell.adjacentIndexes, required, optional }
    return { ...cell, adjacentIndexes }
}

// @exports
export { removeCellAdjacency, addCellAdjacency, requireCellAdjacency }