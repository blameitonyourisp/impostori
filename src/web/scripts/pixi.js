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
 * @file Run Impostori SPA.
 * @author James Reid
 */

// @ts-check

// @@imports-module
import { loadPuzzles } from "./load-puzzles.js"
import {
    loadSpritesheet,
    spritesheetImageUrl,
    spritesheetJsonUrl
} from "./load-spritesheet.js"

// @@imports-submodule
import { runSelector } from "./selector/index.js"
import { runTutorial } from "./tutorial/index.js"
import { runPuzzle } from "./puzzle/index.js"

// @@imports-types
/* eslint-disable no-unused-vars -- Types only used in comments. */
import { StatefulLoadingContainer } from "./components/index.js"
/* eslint-enable no-unused-vars -- Close disable-enable pair. */

// @@body
const root = /** @type {StatefulLoadingContainer} */
    (document.getElementById("root"))

const selectorListener = root.createListener(state => {
    const { dailyPuzzles } = state
    return () => { if (dailyPuzzles) { runSelector(root) } }
})
root.addListener(selectorListener)

const tutorialListener = root.createListener(state => {
    const { spritesheet, serializedPuzzle } = state
    return () => { if (spritesheet && serializedPuzzle) { runTutorial(root) } }
})
root.addListener(tutorialListener)

const puzzleListener = root.createListener(state => {
    const { tutorialComplete } = state
    return () => { if (tutorialComplete) { runPuzzle(root) } }
})
root.addListener(puzzleListener)

loadSpritesheet(spritesheetJsonUrl, spritesheetImageUrl)
    .then(spritesheet => { root.redact({ spritesheet }) })
    .catch(error => console.error(error))

loadPuzzles()
    .then(data => {
        const key = typeof data === "string"
            ? "serializedPuzzle"
            : "dailyPuzzles"
        root.redact({ [key]: data })
    })
    .catch(error => console.error(error))

// @@no-exports
