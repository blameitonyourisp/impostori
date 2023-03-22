// @ts-check

// @imports-types
import { GridCell, Random } from "./index.js"

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
 * @property {Set.<number>} adjacencyIDs.required
 * @property {Set.<number>} adjacencyIDs.optional
 * @property {Set.<number>} adjacencyIDs.deleted
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


