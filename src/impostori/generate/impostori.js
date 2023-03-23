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

// @imports-module
import { generateGrid } from "./grid.js"
// @imports-types
import { Impostori } from "../../types/index.js"
// @imports-utils
import { Random } from "../../utils/math/index.js"

// #body
/**
 * 
 * @function
 * @static
 * @param {number} [seed]
 * @returns {Impostori}
 */
const generateImpostori = seed => {

    const random = new Random(seed)
    const { grid, rawEntropy } = generateGrid(random)

    return { 
        grid, 
        seed: random.config.seed, 
        version: "1.0.0", 
        rawEntropy, 
        correctedEntropy: 0, 
        rating: 0,
        grade: "",
        serializedString: ""
    }
}

// #exports
export { generateImpostori }