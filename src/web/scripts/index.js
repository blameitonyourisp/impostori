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
import "@ungap/custom-elements"

// @@imports-module
import { setHoverable } from "./hoverable.js"

// @@imports-submodule
import { PixelButton, StatefulLoadingContainer } from "./components/index.js"
import { runSelector } from "./selector/index.js"

// @@body
/**
 * @todo Submit completed site for review to the following sites, youtube
 *      creators etc.:
 *      - [aliensrock](https://www.youtube.com/@Aliensrock)
 *      - [cracking the cryptic](https://www.youtube.com/@CrackingTheCryptic)
 *      - [reddit puzzles](https://www.reddit.com/r/puzzles/)
 * @todo Add completed puzzle site to itch.io.
 * @todo Add "test" and "commit"/"revert" buttons for testing a hypothesis about
 *      a candidate/cell.
 * @todo Add puzzle "reset" button.
 * @todo Add "go home" button to return to selector screen.
 * @todo Add timing feature to see how fast you can solve a puzzle.
 * @todo Add "share" button to share puzzle in current solve state.
 * @todo Add puzzle grade and rating to top nav.
 * @todo Add number of cells found/completed by type indicator.
 * @todo Add buttons to remove all candidates in a cell by type (also add to
 *      spritesheet to reflect type choice in shading of platform frame?).
 * @todo Refactor _Puzzle to _Impostori method and state naming etc.
 * @todo Add state to loading container with redact method etc.
 * @todo Fix cyclical object bug on Boutique proxy to object feature (add
 *      tracker to detect cyclical object and resolve them).
 * @todo Add multiple radii to pixel container borders (add "pixel-radius-x"
 *      class styles).
 * @todo Update unload method to return a promise, then only render next page
 *      after unload is done. Promisify load method too on container.
 * @todo Include separate scripts, one to render the loading container, then one
 *      which loads pixi and starts the spritesheet import etc.
 * @todo Add bookmark and undo features to allow users to test and rollback.
 * @todo Add zoom ability to grid portion of pixi container.
 * @todo Remove root from stateful loading container (just target the container
 *      instead in css etc.).
 * @todo Add root div to html to which nav and loading container are appended?
 * @todo Change popstate listener to directly execute a function passed in the
 *      history state object.
 * @todo Add data to resolve object on load/unload methods in loading container.
 * @todo Remove direct calls to re-render puzzle by relying on state events
 *      instead.
 * @todo Add type declaration for "complete" root state.
 * @todo Add checking on selected puzzle to see that it is a valid puzzle.
 * @todo Update "package" imports from impostori package to be "dependency"
 *      imports instead.
 * @todo Review custom web components usage with respect to lack of safari
 *      webkit implementation. If keeping web components, review choice of
 *      polyfill:
 *      - https://www.npmjs.com/package/@ungap/custom-elements
 *      - https://www.webcomponents.org/polyfills
 * @todo Look into creating own, bespoke pixel icon set in aseprite or
 *      vectornator specifically for this game (after a brief search online).
 */

/**
 * Steps:
 * 1. Run scripts to setup page and define custom web components.
 * 2. Declare Boutique store:
 *      2.1 Load spritesheet async and add to store with redaction.
 *      2.2 Load daily puzzles async and add to store with redaction.
 * 3. Select encoded puzzle string:
 *      3.1 Check url parameters for existing puzzle string to use by default.
 *      3.2 Check local storage for incomplete local puzzle, and add this to
 *          "pick up where you left off" option for this device.
 *      3.3 Update store to indicate that url params and local storage have been
 *          checked, and selector can be rendered.
 *      3.4 On daily puzzles loaded *and* url parameters checked, render list of
 *          daily puzzles, and wait for user to choose, then update store.
 *      3.5 Update impostori and encodedImpostori strings in store.
 * 4. On spritesheet loaded *and* encoded puzzle string chosen, run tutorial:
 *      4.1 Check local storage for if tutorial completed, if so set store value
 *          for tutorial complete.
 *      4.2 Otherwise render tutorial slide based on current active slide in
 *          store (default 0). Re-render on store update.
 *      4.3 Add buttons for "skip" and "prev"/"next" which update store current
 *          slide as required.
 *      4.4 Tutorials should have an optional pixi container, and text split
 *          into paragraphs. Next button will display subsequent paragraphs
 *          until next slide with new pixi container.
 *      4.5 Pixi app should fill screen, and interface should be over-layed in
 *          an absolute positioned, full screen div
 * 5. On tutorial complete, run puzzle:
 *      5.1 Render grid and interface.
 *      5.2 Re-render grid on cell/candidate change, and check if grid complete.
 *      5.3 If grid complete, notify user.
 */

// Declare custom web components, and run miscellaneous setup functions.
customElements.define("pixel-button", PixelButton, { extends: "button" })
customElements.define("stateful-loading-container", StatefulLoadingContainer)
setHoverable()

const nav = document.createElement("nav")
nav.classList.add("pixel-container")
const signIn = new PixelButton("Sign In")
const signUp = new PixelButton("Sign Up")
nav.append(signIn, signUp)

const root = new StatefulLoadingContainer()
root.id = "root"
root.classList.add("pixel-container")

document.body.append(nav, root)

window.addEventListener("popstate", event => {
    if (event && event.state) {
        const { page } = event.state
        switch (page) {
            case "home":
                runSelector(root)
                break
            default:
                runSelector(root)
        }
    }
})

// @@no-exports
