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
 * @file Load serialized impostori strings.
 * @author James Reid
 */

// @ts-check

// @@no-imports

// @@body
const MS_IN_DAY = 86400000 // 1000 * 60 * 60 * 24
const DAYS_BEFORE_WRAP = 2920 // 365 * 8 (8 years of puzzles on puzzle branch)

const loadPuzzles = ({
    repo = "blameitonyourisp/impostori",
    directory = "puzzles/sets",
    daysBeforeWrap = DAYS_BEFORE_WRAP
} = {}) => {
    return new Promise((resolve, reject) => {
        // Check for puzzle in url params, and resolve if found.
        const urlParams = new URLSearchParams(window.location.search)
        const serializedImpostori = urlParams.get("puzzle")
        if (serializedImpostori) { resolve(serializedImpostori) }

        // Otherwise fetch daily puzzles object.
        const day = Math.floor(Date.now() / MS_IN_DAY % daysBeforeWrap)
        const url = new URL(
            `${repo}/${directory}/impostori_${day}.json`,
            "https://raw.githubusercontent.com"
        )
        const request = new Request(url.href)
        fetch(request)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

// @@exports
export { loadPuzzles }
