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
 * @file Generate completed impostori puzzle.
 * @author James Reid
 */

// @ts-check

// @@imports-module
import { generateGrid } from "./grid.js"

// @@imports-utils
import { Random, Resource, parsePackage } from "../../utils/index.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Impostori } from "../../types/index.js"
import { serializeImpostori } from "../index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 *
 * @param {number} [seed]
 * @returns {Impostori}
 */
const generateImpostori = seed => {
    const random = new Random(seed)
    const { grid, rawEntropy } = generateGrid(random)
    const impostori = {
        version: getVersion(),
        seed: random.config.seed,
        grid,
        rawEntropy,
        correctedEntropy: 0,
        rating: 0,
        grade: "",
        serializedString: ""
    }

    return { ...impostori, serializedString: serializeImpostori(impostori) }
}

/**
 * Fetch version string from package repository.
 *
 * @returns {string} Version string package.json repository object.
 */
const getVersion = () => {
    // Fetch parsed package file.
    const pathname = new Resource(import.meta.url)
        .absolutePath("../../../../package.json")
    const { packageObject, packageError } = parsePackage(pathname)

    // Get package version.
    const { version } = packageObject

    // If format not recognised, call error handler form parsePackage.
    if (!version) {
        const msg = "Version unset or unrecognized, no package version found"
        packageError(new Error(msg))
    }

    return version
}

// @@exports
export { generateImpostori }
