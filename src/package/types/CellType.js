// @ts-check

// @body
/**
 * Object containing all data for a cell required to generate a grid,
 * solve a puzzle and to display a puzzle. This includes mainly data identifying
 * the position of the cell in the grid, data identifying the contents of the 
 * cell, and data identifying adjacency relationships with neighboring cells.
 * 
 * Position data is initialized at the start of grid generation, and does
 * not change during the course of generation. All other data is initialized
 * in a default state, and is subject to change during generation.
 * 
 * @summary Object containing all required data for a each grid cell
 * 
 * @typedef {"DETECTIVE"|"WORKER"|"IMPOSTER"|"VACANT"} CellType
 */

// @exports
/**
 * @ignore
 * @type {CellType}
 */
export let CellType