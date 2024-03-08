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
 * @file <INSERT_FILE_DESCRIPTION_HERE>
 * @author James Reid
 */

// @ts-check

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { LoadingContainer } from "../components/index.js"
import { AppData } from "../types/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
/**
 * 
 * @param {LoadingContainer} root
 * @param {AppData} state
 */
const runSelector = (root, state, shallowRedaction) => {
    console.log("SELECTOR")
    const { dailyPuzzles } = state

    for (const key in dailyPuzzles) {
        const button = document.createElement("button")
        button.classList.add("pixel-button")
        button.addEventListener("click", () => {
            shallowRedaction({ serializedPuzzle: dailyPuzzles[key][0] })
            root.loading = true
        })

        const buttonText = document.createElement("div")
        buttonText.innerText = key.toUpperCase()
        button.appendChild(buttonText)

        root.appendChild(button)
    }

    root.loading = false
}

// @@exports
export { runSelector }
