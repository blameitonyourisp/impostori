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
 * @file Implement pixel button component.
 * @author James Reid
 */

// @ts-check

// @@no-imports

// @@body
class PixelButton extends HTMLButtonElement {
    #text

    /**
     * @param {string} text
     */
    constructor(text) {
        super()

        this.#text = text
    }

    connectedCallback() {
        const buttonText = document.createElement("p")
        buttonText.innerText = this.#text
        const innerContainer = document.createElement("div")
        innerContainer.appendChild(buttonText)
        this.appendChild(innerContainer)
        this.classList.add("pixel-button")
    }
}

// @@exports
export { PixelButton }
