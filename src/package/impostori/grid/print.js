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
 * @file Print grid to terminal in human-readable fashion.
 * @author James Reid
 */

// @ts-check

// @@imports-package
import { CELL_TYPES } from "../type/index.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Grid } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {Grid} grid
 * @returns {void}
 */
const printGrid = grid => {
    for (let row = 0; row < 6; row++) {
        printDetectives(grid, row)
        printWorkers(grid, row)
        printImposters(grid, row)
        printAdjacencies(grid, row)
    }
}

/**
 *
 * @param {Grid} grid
 * @param {number} row
 * @returns {void}
 */
const printDetectives = (grid, row) => {
    const result = []
    for (let column = 0; column < 6; column++) {
        const index = row * 6 + column
        const cell = grid.cells[index]
        const [valueA] = cell.hints.detective
        const parentheses = [
            valueA === cell.value ? "(" : " ",
            valueA === cell.value ? ")" : " ",
        ]
        const v = cell.type === CELL_TYPES.vacant ? "V  " : ""
        const stringA = `${v}${parentheses[0]}${valueA || 0}${parentheses[1]}`
        let paddedString = stringA.padStart(7)
        paddedString = paddedString.padEnd(11)
        const startString = column ? "" : "  "
        result.push(`${startString}┌${paddedString}┐  `)
    }
    console.log(result.join(""))
}

/**
 *
 * @param {Grid} grid
 * @param {number} row
 * @returns {void}
 */
const printWorkers = (grid, row) => {
    const result = []
    for (let column = 0; column < 6; column++) {
        const index = row * 6 + column
        const cell = grid.cells[index]
        const [valueA, valueB] = cell.hints.worker
        const parentheses = [
            valueA === cell.value ? "(" : " ",
            valueA === cell.value ? ")" : " ",
            valueB === cell.value ? "(" : " ",
            valueB === cell.value ? ")" : " ",
        ]
        const stringA = `${parentheses[0]}${valueA || 0}${parentheses[1]}`
        const stringB = `${parentheses[2]}${valueB || 0}${parentheses[3]}`
        let paddedString = stringA.padStart(5)
        paddedString += ` ${stringB}`
        paddedString = paddedString.padEnd(11)
        const adjacentRight = cell.adjacentIndexes.all.includes(index + 1)
        const adjacencyString = adjacentRight ? "──" : "  "
        const startString = column ? "" : "  "
        result.push(`${startString}│${paddedString}│${adjacencyString}`)
    }
    console.log(result.join(""))
}

/**
 *
 * @param {Grid} grid
 * @param {number} row
 * @returns {void}
 */
const printImposters = (grid, row) => {
    const result = []
    for (let column = 0; column < 6; column++) {
        const index = row * 6 + column
        const cell = grid.cells[index]
        const [valueA, valueB, valueC] = cell.hints.imposter
        const parentheses = [
            valueA === cell.value ? "(" : " ",
            valueA === cell.value ? ")" : " ",
            valueB === cell.value ? "(" : " ",
            valueB === cell.value ? ")" : " ",
            valueC === cell.value ? "(" : " ",
            valueC === cell.value ? ")" : " ",
        ]
        const stringA = `${parentheses[0]}${valueA || 0}${parentheses[1]}`
        const stringB = `${parentheses[2]}${valueB || 0}${parentheses[3]}`
        const stringC = `${parentheses[4]}${valueC || 0}${parentheses[5]}`
        let paddedString = stringA.padStart(3)
        paddedString += ` ${stringB} ${stringC}`
        paddedString = paddedString.padEnd(11)
        const startString = column ? "" : "  "
        result.push(`${startString}└${paddedString}┘  `)
    }
    console.log(result.join(""))
}

/**
 *
 * @param {Grid} grid
 * @param {number} row
 * @returns {void}
 */
const printAdjacencies = (grid, row) => {
    const result = []
    for (let column = 0; column < 6; column++) {
        const index = row * 6 + column
        const cell = grid.cells[index]
        const adjacentBottomLeft = cell.adjacentIndexes.all.includes(index + 5)
        const adjacentBottom = cell.adjacentIndexes.all.includes(index + 6)
        let adjacencyString = adjacentBottomLeft ? " ╱" : "  "
        adjacencyString = adjacencyString.padEnd(8)
        adjacencyString += adjacentBottom ? "│" : " "
        const paddedString = adjacencyString.padEnd(15)
        result.push(`${paddedString}`)
    }
    console.log(result.join(""))
    result.forEach((string, index) => {
        result[index] = `${string[1]} ${string.slice(2)}`
    })
    console.log(result.join(""))
}

// @@exports
export { printGrid }
