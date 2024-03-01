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
 * @file Set body hoverable class for correctly rendering mobile buttons which
 *      have just been clicked.
 * @author James Reid
 */

// @ts-check

// @@no-imports

// @@body
const setHoverable = () => {
    let isTouchActive = false
    const updateHoverable = () => {
        isTouchActive ? document.body.classList.remove("hoverable")
            : document.body.classList.add("hoverable")
    }

    document.addEventListener("touchstart", () => {
        // Activate touch then update hoverable class.
        isTouchActive = true
        updateHoverable()
    })
    document.addEventListener("mousemove", () => {
        // Update hoverable class *first* then disable touch in order to ignore
        // emulated mousemove events dispatched after touchstart or touchend
        // events.
        updateHoverable()
        isTouchActive = false
    })

    updateHoverable()
}

// @@exports
export { setHoverable }
