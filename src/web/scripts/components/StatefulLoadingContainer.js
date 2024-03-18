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
    #shallowRedaction = this.#store.createRedaction((state, detail) => {
        Object.assign(state, detail)
    })

    constructor() { super() }

    connectedCallback() {
        if (this.dataset.loading?.match(/^true$|^false$/)) { return }
        this.dataset.loading = false.toString()

        const loadingContainer = document.createElement("div")
        loadingContainer.classList.add("loading")
        const loadingText = document.createElement("p")
        loadingText.innerText = this.dataset.text || "Loading"
        loadingContainer.appendChild(loadingText)

        const contentContainer = document.createElement("div")
        contentContainer.classList.add("content")

        this.classList.add("stateful-loading-container")
        this.append(loadingContainer, contentContainer)
    }

    /**
     *
     * @param {HTMLElement} [newContent]
     */
    load(newContent) {
        if (newContent) {
            const oldContent = this.getElementsByClassName("content")[0]
            if (oldContent) { oldContent.replaceWith(newContent) }
            else { this.appendChild(newContent) }
        }
        this.loading = false
    }

    unload() { this.loading = true }

    /**
     * @param {any} detail
     */
    redact(detail) { this.#shallowRedaction(detail) }

    get loading() { return this.#loading }

    set loading(bool) {
        this.dataset.loading = bool.toString()
        this.#loading = bool
    }

    get createRedaction() {
        return this.#store.createRedaction.bind(this.#store)
    }

    get createListener() {
        return this.#store.createListener.bind(this.#store)
    }

    get addListener() {
        return this.#store.addListener.bind(this.#store)
    }

    get removeListener() {
        return this.#store.removeListener.bind(this.#store)
    }

    get state() { return this.#store.state }

    static contentContainer() {
        const container = document.createElement("div")
        container.classList.add("content")

        return container
    }
}

// @@exports
export { StatefulLoadingContainer }
