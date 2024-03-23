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
 * @file Implement basic stateful loading container web component.
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
    #animation = {
        keyframes: [{ opacity: 1 }, { opacity: 0 }],
        options: { easing: "ease-out", duration: 300 },
        reverse: { direction: /** @type {PlaybackDirection} */ ("reverse") }
    }

    constructor() { super() }

    connectedCallback() {
        if (!this.dataset.loading?.match(/^true$|^false$/)) {
            this.dataset.loading = true.toString()
        }

        const loadingContainer = document.createElement("div")
        loadingContainer.classList.add("loading", "loading-container")
        const loadingText = document.createElement("p")
        loadingText.innerText = this.dataset.text || "Loading..."
        const loadingBar = document.createElement("div")
        loadingBar.classList.add("pixel-container", "loading-bar")
        const loadingBounce = document.createElement("div")
        loadingBounce.classList.add("pixel-container", "loading-bounce")
        loadingBar.appendChild(loadingBounce)
        loadingContainer.append(loadingText, loadingBar)

        const contentContainer = document.createElement("div")
        contentContainer.classList.add("content")

        this.classList.add("stateful-loading-container")
        this.append(loadingContainer, contentContainer)
    }

    /**
     *
     * @param {HTMLElement} newContent
     */
    load(newContent) {
        return new Promise(resolve => {
            const { keyframes, options, reverse } = this.#animation

            const replaceContent = () => {
                this.contentContainer.replaceWith(newContent)
                this.contentContainer
                    .animate(keyframes, { ...options, ...reverse })
                    .addEventListener("finish", () => { resolve({}) })
            }

            if (this.loading) {
                this.loadingContainer.animate(keyframes, options)
                    .addEventListener("finish", () => {
                        this.loading = false
                        replaceContent()
                    })
            }
            else {
                this.contentContainer.animate(keyframes, options)
                    .addEventListener("finish", replaceContent)
            }
        })
    }

    unload() {
        return new Promise(resolve => {
            if (this.loading) { resolve({}) }

            const { keyframes, options, reverse } = this.#animation

            this.contentContainer.animate(keyframes, options)
                .addEventListener("finish", () => {
                    this.loading = true
                    this.loadingContainer
                        .animate(keyframes, { ...options, ...reverse })
                        .addEventListener("finish", () => { resolve({}) })
                })
        })
    }

    /**
     * @param {any} detail
     */
    redact(detail) { this.#shallowRedaction(detail) }

    get loading() { return this.#loading }

    set loading(bool) {
        this.dataset.loading = bool.toString()
        this.#loading = bool
    }

    get loadingContainer() {
        return this.getElementsByClassName("loading")[0]
    }

    get contentContainer() {
        return this.getElementsByClassName("content")[0]
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
