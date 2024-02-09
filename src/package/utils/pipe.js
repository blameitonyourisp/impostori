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
 * @file Basic pipe implementation.
 * @author James Reid
 */

// @ts-check

// @@no-imports

// @@body
/**
 *
 * @param  {...any} functions
 * @returns {any}
 */
const pipe = (...functions) => (/** @type {any} */ argument) => {
    return functions.reduce((accumulator, current) => {
        return current(accumulator)
    }, argument)
}

// @@exports
export { pipe }
