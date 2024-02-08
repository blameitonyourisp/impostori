/**
 * Object containing all data for a cell required to generate a grid,
 * solve a puzzle and to display a puzzle. This includes mainly data identifying
 * the position of the cell in the grid, data identifying the contents of the
 * cell, and data identifying adjacency relationships with neighboring cells.
 */
export type CellType = "detective" | "worker" | "imposter" | "vacant";
/**
 * Object containing all data for a cell required to generate a grid,
 * solve a puzzle and to display a puzzle. This includes mainly data identifying
 * the position of the cell in the grid, data identifying the contents of the
 * cell, and data identifying adjacency relationships with neighboring cells.
 *
 * @typedef {"detective"|"worker"|"imposter"|"vacant"} CellType
 */
/**
 * @ignore
 * @type {CellType}
 */
export let CellType: CellType;
