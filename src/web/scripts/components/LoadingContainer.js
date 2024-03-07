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
 * @file Implement basic loading container web component.
 * @author James Reid
 */

// @ts-check

// @@no-imports

// @@body
class LoadingContainer extends HTMLElement {
    #loaded = this.dataset.loaded === "true" ? true : false

    constructor() {
        super()

        if (this.dataset.loaded?.match(/^true$|^false$/)) { return }
        this.dataset.loaded = false.toString()
    }

    toggleLoaded() { this.loaded = !this.loaded }

    get loaded() { return this.#loaded }

    set loaded(bool) {
        this.dataset.loaded = bool.toString()
        this.#loaded = bool
    }
}

// @@exports
export { LoadingContainer }
