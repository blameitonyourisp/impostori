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

// @@imports-dependencies
import { Boutique } from "@blameitonyourisp/boutique"

// @@body
class StatefulLoadingContainer extends HTMLElement {
    #loading = this.dataset.loading === "false" ? false : true
    #store = new Boutique({})

    constructor() { super() }

    connectedCallback() {
        if (this.dataset.loading?.match(/^true$|^false$/)) { return }
        this.dataset.loading = false.toString()
    }

    load() {}

    unload() {}

    redact() {}

    get loading() { return this.#loading }

    set loading(bool) {
        this.dataset.loading = bool.toString()
        this.#loading = bool
    }
}

// @@exports
export { StatefulLoadingContainer }
