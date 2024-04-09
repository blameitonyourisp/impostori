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
import { PixelButton, StatefulLoadingContainer } from "../components/index.js"

// @@imports-package
import { IMPOSTORI_EVENTS } from "../events.js"

// @@body
const {
    puzzleSelected
} = IMPOSTORI_EVENTS

/**
 * @param {StatefulLoadingContainer} root
 */
const runSelector = root => {
    const event = new Event(puzzleSelected)

    const { dailyPuzzles } = root.state
    if (dailyPuzzles.url) { return root.dispatchEvent(event) }
    delete dailyPuzzles.url

    const container = StatefulLoadingContainer.contentContainer()
    for (const key in dailyPuzzles) {
        const button = new PixelButton(key.toUpperCase())
        button.addEventListener("click", () => {
            history.replaceState({ page: "home" }, "")
            history.pushState({}, "")
            root.state.selectedPuzzle = dailyPuzzles[key][0]
            root.dispatchEvent(event)
        })

        container.appendChild(button)
    }

    root.load(container)
}

// @@exports
export { runSelector }
