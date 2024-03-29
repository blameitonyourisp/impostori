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
 * @file Run tutorial page.
 * @author James Reid
 */

// @ts-check

// @@imports-package
import { StatefulLoadingContainer } from "../components/index.js"

// @@body
/**
 * @param {StatefulLoadingContainer} root
 */
const runTutorial = root => {
    const container = StatefulLoadingContainer.contentContainer()

    root.load(container)

    root.redact({ tutorialComplete: true })
}

// @@exports
export { runTutorial }
