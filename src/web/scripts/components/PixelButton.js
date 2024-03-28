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

// @@imports-dependencies
import { createElement } from "lucide"

// @@body
class PixelButton extends HTMLButtonElement {
    #text
    #icon
    #stroke
    #height

    /**
     * @param {string} text
     * @param {object} [obj]
     * @param {import("lucide").IconNode} [obj.icon]
     * @param {string} [obj.stroke]
     * @param {string} [obj.height]
     */
    constructor(text, { icon, stroke = "#0d2b45", height = "1em" } = {}) {
        super()

        this.#text = text
        this.#icon = icon
        this.#stroke = stroke
        this.#height = height
    }

    connectedCallback() {
        const buttonText = document.createElement("p")
        buttonText.innerText = this.#text
        const innerContainer = document.createElement("div")
        innerContainer.appendChild(buttonText)
        this.appendChild(innerContainer)
        this.classList.add("pixel-button")

        if (this.#icon) {
            const icon = createElement(this.#icon)
            icon.setAttribute("stroke", this.#stroke)
            icon.setAttribute("height", this.#height)
            icon.classList.add("my-icon-class")
            innerContainer.appendChild(icon)
        }
    }
}

// @@exports
export { PixelButton }
