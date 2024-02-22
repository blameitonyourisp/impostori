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
 * @file Sample class for statistical analysis.
 * @author James Reid
 */

// @ts-check

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { SampleStatistics } from "../../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
class Sample {
    #data = /** @type {number[]} */ ([])
    #statistics = /** @type {SampleStatistics} */ ({})

    /**
     *
     * @param {number[]} [data=[]]
     */
    constructor(data = []) { this.data = Sample.quicksort(data) }

    /**
     *
     * @param {number[]} [data=[]]
     */
    extend(data = []) {
        const splicedData = /** @type {number[]} */ ([])
        const sample = new Sample(data)
        let [pointer, samplePointer] = [0, 0]

        for (let i = 0; i < this.data.length + sample.data.length; i++) {
            if (pointer >= this.data.length) {
                splicedData.push(...sample.data.slice(samplePointer))
                break
            }
            else if (samplePointer >= sample.data.length) {
                splicedData.push(...this.data.slice(pointer))
                break
            }
            else if (this.data[pointer] < sample.data[samplePointer]) {
                splicedData.push(this.data[pointer])
                pointer++
            }
            else {
                splicedData.push(sample.data[samplePointer])
                samplePointer++
            }
        }

        this.data = splicedData
    }

    /**
     *
     * @param {number} factor
     */
    removeOutliers(factor = 1.5) {
        const lowerBound = this.statistics.q1 - factor * this.statistics.iqr
        const upperBound = this.statistics.q3 + factor * this.statistics.iqr
        const data = /** @type {number[]} */ ([])
        for (const value of this.data) {
            if (value > lowerBound && value < upperBound) { data.push(value) }
        }

        this.data = data
    }

    /**
     *
     * @returns {number[]}
     */
    get data() { return this.#data }

    /**
     *
     * @param {number[]} data
     */
    set data(data) {
        this.#data = Sample.quicksort(data)
        this.#statistics = Sample.getStatistics(this.data)
    }

    /**
     *
     * @returns {SampleStatistics}
     */
    get statistics() { return this.#statistics }

    /**
     *
     * @param {number[]} data
     * @returns {SampleStatistics}
     */
    static getStatistics(data) {
        for (let i = 0; i < data.length - 2; i++) {
            if (data[i] > data[i + 1]) { data = Sample.quicksort(data); break }
        }

        const statistics = /** @type {SampleStatistics} */ ({})

        statistics.sampleSize = data.length

        statistics.min = data[0]
        statistics.max = data[data.length - 1]

        statistics.sum = 0
        for (const value of data) { statistics.sum += value }

        statistics.mean = statistics.sum / statistics.sampleSize

        const halfLength = Math.ceil(data.length / 2)
        statistics.median = data.length % 2
            ? data[halfLength - 1]
            : (data[halfLength] + data[halfLength - 1]) / 2

        statistics.range = statistics.max - statistics.min

        const quarterLength = Math.floor(data.length / 4)
        const threeQuarterLength = quarterLength + halfLength
        statistics.q1 = data.length % 4 > 1
            ? data[quarterLength]
            : (data[quarterLength] + data[quarterLength - 1]) / 2
        statistics.q2 = statistics.median
        statistics.q3 = data.length % 4 > 1
            ? data[quarterLength + halfLength]
            : (data[threeQuarterLength] + data[threeQuarterLength - 1]) / 2
        statistics.iqr = statistics.q3 - statistics.q1

        // Sum squared error, mean squared error, and root mean squared error,
        // considering sample data as an entire population.
        statistics.sse = 0
        for (const value of data) {
            const error = value - statistics.mean
            statistics.sse += error * error
        }
        statistics.mse = statistics.sse / statistics.sampleSize
        statistics.rmse = Math.sqrt(statistics.mse)

        // Variance and standard deviation considering sample data as a sample
        // of a larger population, and including bessel's correction.
        statistics.variance = statistics.sse / (statistics.sampleSize - 1)
        statistics.stdDev = Math.sqrt(statistics.variance)

        return statistics
    }

    /**
     * Sorts array of numbers using basic quicksort algorithm. See here for more
     * details (https://en.wikipedia.org/wiki/Quicksort). Please note that the
     * algorithm below is implemented using iteration rather than recursion in
     * order to avoid exceeding maximum stack size.
     *
     * @param {number[]} data
     * @returns {number[]}
     */
    static quicksort(data) {
        const frames = [0, data.length]

        while (frames.length) {
            for (let i = 0; i < frames.length; i += 2) {
                const frameLength = frames[i + 1] - frames[i]
                if (frameLength <= 1) { frames.splice(i, 2); continue }

                const frame = data.slice(frames[i], frames[i + 1])
                const pivot = frame[0]
                const [lower, upper] = /** @type {number[][]} */ ([[], []])
                for (const value of frame.slice(1)) {
                    value < pivot ? lower.push(value) : upper.push(value)
                }

                const partitionEnd = frames[i] + lower.length
                frames.splice(i + 1, 0, partitionEnd, partitionEnd + 1)
                data.splice(frames[i], frameLength, ...lower, pivot, ...upper)
            }
        }

        return data
    }
}

// @@exports
export { Sample }
