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
 * @file Fill cell value with next valid candidate.
 * @author James Reid
 */

// @ts-check

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { GridCell } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {GridCell} cell
 * @returns {GridCell}
 */
const fillCellValue = cell => {
    const candidates = [...cell.candidates]
    const candidate = candidates.pop()
    // set type at same time for convenience
    const value = candidate?.value
    const type = candidate?.type
    // @ts-ignore
    return { ...cell, value, type, candidates }
}

// change to fork cell and put in solve directory
/**
 *
 * @param {GridCell} cell
 * @returns {GridCell[]}
 */
const forkCellValue = cell => {
    return Array.from({ length: cell.candidates.length }, () => {
        cell = fillCellValue(cell)
        return cell
    })
}

// @@exports
export { fillCellValue, forkCellValue }
