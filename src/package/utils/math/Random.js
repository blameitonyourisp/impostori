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
 * @file Seeded random number generator.
 * @author James Reid
 */

// @ts-check

// @@no-imports

// @@body
/**
 * Seeded prng implemented using BBS algorithm. For more information on this
 * algorithm, see here (https://en.wikipedia.org/wiki/Blum_Blum_Shub).
 */
class Random {
    /**
     *
     * @param {*} seed
     * @param {*} primeP
     * @param {*} primeQ
     */
    constructor(seed = Random.seed(), primeP = 34319, primeQ = 89459) {
        if (seed % primeP === 0 || seed % primeQ === 0) { seed++ }
        this.config = { seed, primeP, primeQ, divisor: primeP * primeQ }
        this.state = { iteration: 0, iteratedSeed: seed }
    }

    /**
     *
     * @returns {number}
     */
    iterate() {
        this.state.iteration++
        this.state.iteratedSeed =
            (this.state.iteratedSeed ** 2) % this.config.divisor
        return this.state.iteratedSeed / this.config.divisor
    }

    /**
     *
     * @param {number} count
     * @returns {number}
     */
    jump(count) {
        for (let i = 0; i < count - 1; i++) { this.iterate() }
        return this.iterate()
    }

    /**
     *
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    jumpRandom(min = 10, max = 100) {
        return this.jump(this.prng(min, max) - 1)
    }

    /**
     *
     * @param {*} min
     * @param {*} max
     * @returns {number}
     */
    prng(min = 0, max = 1) {
        return Random.floatToRangedInteger(this.iterate(), min, max)
    }

    // change to permute
    /**
     *
     * @template T
     * @param {T[]} array
     * @returns {T[]}
     */
    shuffleArray([...array]) {
        return Array.from({ length: array.length }, () => {
            return array.splice(this.prng(0, array.length - 1), 1)[0]
        })
    }

    /**
     *
     * @param {*} length
     * @param {*} startOne
     * @returns {number[]}
     */
    shuffledIndexArray(length, startOne = false) {
        return this.shuffleArray(Array.from({ length }, (_, i) => i + startOne))
    }

    /**
     *
     * @returns {number}
     */
    static seed() {
        return Random.floatToRangedInteger(Math.random(), 2 ** 31, 2 ** 32 - 1)
    }

    /**
     *
     * @param {*} float
     * @param {*} min
     * @param {*} max
     * @returns {number}
     */
    static floatToRangedInteger(float, min, max) {
        return Math.round(min + float * (max - min))
    }
}

// @@exports
export { Random }
