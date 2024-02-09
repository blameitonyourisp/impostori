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
 * @file Parse package.json file.
 * @author James Reid
 */

// @ts-check

// @@imports-node
import fs from "fs"

// @@imports-module
import { DecoratedError } from "./cli/index.js"

// @@body
/**
 * Parse repository package.json file into object, providing wrapped error
 * function which may be called by any consumer to throw a consistently
 * formatted error.
 *
 * @summary Parse repository package.json file into object.
 * @param {string} [pathname=package.json] - Path to repo package.json file.
 * @returns {{packageObject:any, packageError:(error:Error)=>never}} Parsed
 *      packageObject returned by JSON.parse method, and packageError function
 *      which allows any consumer of the json file to throw a consistently
 *      formatted error.
 */
const parsePackage = (pathname = "package.json") => {
    // Create custom "PackageJsonError" from DecoratedError constructor. This
    // allows any consumer of the package json file to throw a consistently
    // formatted error if any missing/incorrectly formatted data is found.
    const packageError = (/** @type {Error} */ error) => {
        throw new DecoratedError({
            name: "PackageJsonError",
            message: "Error encountered parsing repository package.json file",
            path: `${process.cwd()}/${pathname}`,
            detail: error.message,
            "caller-stack": /** @type {string} */ (error.stack)
        })
    }

    // Parsed package.json object.
    let packageObject

    // Fetch and parse package.json file, throwing error if not found or if file
    // format incorrect.
    try { packageObject = JSON.parse(fs.readFileSync(pathname).toString()) }
    catch (error) { packageError(/** @type {Error} */ (error)) }

    return { packageObject, packageError }
}

// @@exports
export { parsePackage }
