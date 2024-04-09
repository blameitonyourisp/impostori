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

// @@imports-dependencies
import { deserializeImpostori } from "../../package/index.js"

// @@imports-module
import { IMPOSTORI_EVENTS } from "./events.js"
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
const {
    resourceLoaded,
    puzzleSelected,
    puzzleVerified,
    tutorialComplete
} = IMPOSTORI_EVENTS

const root = /** @type {StatefulLoadingContainer} */
    (document.getElementById("root"))

root.addEventListener(resourceLoaded, () => {
    const { spritesheet, dailyPuzzles } = root.state
    if (spritesheet && dailyPuzzles) { runSelector(root) }
})

root.addEventListener(puzzleSelected, () => {
    const { selectedPuzzle } = root.state
    root.state = {
        ...root.state,
        serializedPuzzle: selectedPuzzle,
        puzzle: deserializeImpostori(selectedPuzzle)
    }
    const event = new Event(puzzleVerified)
    root.dispatchEvent(event)
})

root.addEventListener(puzzleVerified, () => { runTutorial(root) })

root.addEventListener(tutorialComplete, () => { runPuzzle(root) })

loadSpritesheet(spritesheetJsonUrl, spritesheetImageUrl)
    .then(spritesheet => {
        root.state.spritesheet = spritesheet
        const event = new Event(resourceLoaded)
        root.dispatchEvent(event)
    })
    .catch(error => console.error(error))

loadPuzzles()
    .then(data => {
        root.state.dailyPuzzles = data
        const event = new Event(resourceLoaded)
        root.dispatchEvent(event)
    })
    .catch(error => console.error(error))

// @@no-exports
