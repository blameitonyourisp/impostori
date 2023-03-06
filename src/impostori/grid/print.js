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
import { Grid } from "../../types/_index.js"

// @body
/**
 * 
 * 
 * @summary x
 * 
 * @function
 * @static
 * 
 * @param {Grid} grid 
 * @returns {void}
 */
const printGrid = grid => {
    for (let row = 0; row < 6; row ++) {
        printDetectives(grid, row)
        printWorkers(grid, row)
        printImposters(grid, row)
        printAdjacencies(grid, row)        
    }
}

/**
 * 
 * 
 * @summary x
 * 
 * @function
 * @inner
 * 
 * @param {Grid} grid 
 * @param {number} row 
 * @returns {void}
 */
const printDetectives = (grid, row) => {
    const result = []
    for (let column = 0; column < 6; column ++) {
        const index = row * 6 + column
        const cell = grid.cells[index]
        const [valueA] = cell.hints.detective
        const parentheses = [
            valueA === cell.value ? "(" : " ",
            valueA === cell.value ? ")" : " ",
        ]
        const _v = cell.type === "VACANT" ? "V  " : ""
        const stringA = `${_v}${parentheses[0]}${valueA || 0}${parentheses[1]}`
        let paddedString = stringA.padStart(7)
        paddedString = paddedString.padEnd(11)
        const startString = column ? "": "  "
        result.push(`${startString}┌${paddedString}┐  `)
    }
    console.log(result.join(""))
}

/**
 * 
 * 
 * @summary x
 * 
 * @function
 * @inner
 * 
 * @param {Grid} grid 
 * @param {number} row 
 * @returns {void}
 */
const printWorkers = (grid, row) => {
    const result = []
    for (let column = 0; column < 6; column ++) {
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
        const startString = column ? "": "  "
        result.push(`${startString}│${paddedString}│${adjacencyString}`)
    }
    console.log(result.join(""))
}

/**
 * 
 * 
 * @summary x
 * 
 * @function
 * @inner
 * 
 * @param {Grid} grid 
 * @param {number} row 
 * @returns {void}
 */
const printImposters = (grid, row) => {
    const result = []
    for (let column = 0; column < 6; column ++) {
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
        const startString = column ? "": "  "
        result.push(`${startString}└${paddedString}┘  `)
    }
    console.log(result.join(""))
}

/**
 * 
 * 
 * @summary x
 * 
 * @function
 * @inner
 * 
 * @param {Grid} grid 
 * @param {number} row 
 * @returns {void}
 */
const printAdjacencies = (grid, row) => {
    const result = []
    for (let column = 0; column < 6; column ++) {
        const index = row * 6 + column
        const cell = grid.cells[index]
        const adjacentBottomLeft = cell.adjacentIndexes.all.includes(index + 5)
        const adjacentBottom = cell.adjacentIndexes.all.includes(index + 6)
        let adjacencyString = adjacentBottomLeft ? " ╱" : "  "
        adjacencyString = adjacencyString.padEnd(8)
        adjacencyString += adjacentBottom ? "│" : " "
        let paddedString = adjacencyString.padEnd(15)
        result.push(`${paddedString}`)

    }
    console.log(result.join(""))
    result.forEach((string, index) => {
        result[index] = `${string[1]} ${string.slice(2)}`
    })
    console.log(result.join(""))
}

// @exports
export { printGrid }