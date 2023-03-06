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
import { TypedArrayConstructor } from "../../types/_index.js"

// @body
/**
 * univariate
 */
class Data {
    /**
     * 
     * @param {number[]} [data=[]]
     * @param {object} options
     * @param {number} [options.viewLength=data.length]
     * @param {TypedArrayConstructor} [options.viewConstructor=Float32Array]
     * @param {number} [options.model=0]
     */
    constructor(
        data = [], 
        { 
            viewLength = data.length, 
            viewConstructor = Float32Array,
            model = 0
        } = {}
    ) {
        this.model = model
        this.#build(data, viewLength, viewConstructor)
    }

    #build(data, viewLength, viewConstructor) {
        this.viewLength = viewLength
        this.viewConstructor = viewConstructor
        this.buffer = new ArrayBuffer(this.byteLength)
        this.view = new viewConstructor(this.buffer)
        for (const [index, value] of data.entries()) {
            this.view[index] = value
        }
    }

    resize({ 
        viewLength = this.viewLength, 
        viewConstructor = this.viewConstructor 
    } = {}) {
        const data = Array.from(this.view)
        this.#build(data, viewLength, viewConstructor)
    }

    extend(additionalElements) {
        this.resize({ viewLength: this.viewLength + additionalElements })
    }

    get singleByteLength() {
        let singleByteLength
        switch (this.viewConstructor) {
            case Int8Array:
            case Uint8Array:
            case Uint8ClampedArray:
                singleByteLength = 1
                break
    
            case Int16Array:
            case Uint16Array:
                singleByteLength = 2
                break
    
            case Int32Array:
            case Uint32Array:
            case Float32Array:
                singleByteLength = 4
                break
    
            case Float64Array:
            // case BigInt64Array:
            // case BigUint64Array:
                singleByteLength = 8
                break
        
            default:
                singleByteLength = 1
                break
        }
        return singleByteLength
    }

    get byteLength() {
        return this.singleByteLength * this.viewLength
    }

    get array() {
        return Array.from(this.view)
    }




    get size() {
        return this.viewLength
    }

    get sum() {
        let sum = 0
        for (const value of this.view) { sum += value }
        return sum
    }

    get mean() {
        return this.sum / this.size
    }

    // sumSquaredDeviations - mean squared error
    // get MSE() {
    //     let sumSquaredDeviations 
    // }

    // sumSquaredError - residual sum of squares
    get SSE() {
        let sum = 0
        for (const value of this.view) { 
            const error = value - this.mean
            sum += error * error
        }
        return sum
    }

    get modelSSE() {
        let sum = 0
        for (const value of this.view) { 
            const error = value - this.model
            sum += error * error
        }
        return sum
    }
}

// @exports
export { Data }