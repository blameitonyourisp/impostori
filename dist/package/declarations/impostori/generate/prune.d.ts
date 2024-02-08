/**
 *  - remove all adj from imposters (require the adjacency if grid invalid)
 *  - re add all adj unless that invalidates grid
 *  - remove all adj from workers (require the adjacency if grid invalid)
 *  - re add all adj (none will invalidate grid)
 *  - all optional adjacencies are now "genuinely" optional
 *  - divide all optional ids into either required or deleted  according to
 *      random dropout variable
 */
/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
export function pruneGridAdjacencies(grid: Grid): Grid;
import { Grid } from "../../types/index.js";
