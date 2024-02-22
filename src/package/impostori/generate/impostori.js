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

// @@imports-package
import { serializeImpostori } from "../serialization/index.js"

// @@imports-utils
import { Random, Resource, parsePackage, normalCdf } from "../../utils/index.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { Impostori, ImpostoriGrade } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
const PUZZLE_VERSION = "1.0.0"

/** @enum {ImpostoriGrade} */
const IMPOSTORI_GRADES = {
    beginner: /** @type {ImpostoriGrade} */ ("beginner"),
    easy: /** @type {ImpostoriGrade} */ ("easy"),
    medium: /** @type {ImpostoriGrade} */ ("medium"),
    hard: /** @type {ImpostoriGrade} */ ("hard"),
    expert: /** @type {ImpostoriGrade} */ ("expert")
}

/**
 *
 * @param {number} [seed]
 * @returns {Impostori}
 */
const generateImpostori = seed => {
    const random = new Random(seed)
    const { grid, rawEntropy } = generateGrid(random)
    const impostori = /** @type {Impostori} */ ({
        version: {
            puzzle: PUZZLE_VERSION,
            repository: getVersion()
        },
        seed: random.config.seed,
        grid,
        rawEntropy
    })

    impostori.normalizedEntropy = getNormalizedEntropy(impostori.rawEntropy)
    impostori.uniformEntropy = getUniformEntropy(impostori.normalizedEntropy)

    impostori.rating = getRating(impostori.uniformEntropy)
    impostori.grade = getGradeString(impostori.rating)

    // Reset prng
    impostori.grid.random = new Random(impostori.seed)

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

/**
 *
 * @param {number} rawEntropy
 * @returns {number}
 */
const getNormalizedEntropy = rawEntropy => {
    const normalizedEntropy = 512 + 256 * (Math.log(rawEntropy) - 6.94)
    return Math.min(Math.max(Math.round(normalizedEntropy), 0), 1024)
}

/**
 *
 * @param {number} normalizedEntropy
 * @returns {number}
 */
const getUniformEntropy = normalizedEntropy => {
    const uniformEntropy = normalCdf({
        upper: normalizedEntropy,
        mean: 512,
        stdDev: 187
    })
    return Math.round(uniformEntropy * 1024)
}

/**
 *
 * @param {number} uniformEntropy
 * @returns {number}
 */
const getRating = uniformEntropy => {
    return Math.ceil(uniformEntropy / 10.24)
}

/**
 *
 * @param {number} rating
 * @returns {ImpostoriGrade}
 */
const getGradeString = rating => {
    return rating <= 20 ? IMPOSTORI_GRADES.beginner
        : rating <= 40 ? IMPOSTORI_GRADES.easy
        : rating <= 60 ? IMPOSTORI_GRADES.medium
        : rating <= 80 ? IMPOSTORI_GRADES.hard
        : IMPOSTORI_GRADES.expert
}

// @@exports
export {
    PUZZLE_VERSION,
    IMPOSTORI_GRADES,
    generateImpostori,
    getRating,
    getGradeString
}
