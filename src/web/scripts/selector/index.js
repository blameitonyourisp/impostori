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
 * @file Run selector page.
 * @author James Reid
 */

// @ts-check

// @@imports-package
import { StatefulLoadingContainer } from "../components/index.js"

// @@body
/**
 * @param {StatefulLoadingContainer} root
 */
const runSelector = root => {
    root.unload()

    const { dailyPuzzles } = root.state

    const container = StatefulLoadingContainer.contentContainer()
    for (const key in dailyPuzzles) {
        const button = document.createElement("button")
        button.classList.add("pixel-button")
        button.addEventListener("click", () => {
            root.redact({ serializedPuzzle: dailyPuzzles[key][0] })
            root.loading = true
        })

        const buttonText = document.createElement("div")
        buttonText.innerText = key.toUpperCase()
        button.appendChild(buttonText)

        container.appendChild(button)
    }

    root.load(container)
}

// @@exports
export { runSelector }
