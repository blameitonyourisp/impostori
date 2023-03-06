// @ts-check

// @imports-types
import { GridCell, Random } from "./_index.js"

// @body
/**
 * This is a test
 * 
 * @summary test
 * 
 * @typedef {object} Grid
 * @property {GridCell[]} cells
 * 
 * @property {object} typeIndexes
 * @property {number[]} typeIndexes.detective
 * @property {number[]} typeIndexes.worker
 * @property {number[]} typeIndexes.imposter
 * @property {number[]} typeIndexes.vacant
 * 
 * @property {object} adjacencyIDs
 * @property {number[]} adjacencyIDs.required
 * @property {number[]} adjacencyIDs.optional
 * 
 * @property {Random} random
 * @property {boolean} isGenerating
 */

// @exports
/**
 *
 * @ignore
 * @type {Grid} 
 */
export let Grid


