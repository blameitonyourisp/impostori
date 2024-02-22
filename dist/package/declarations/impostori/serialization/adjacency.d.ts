/**
 *
 * @param {Grid} grid
 */
export function serializeAdjacencies(grid: Grid): BitBuffer;
/**
 *
 * @param {BitBuffer} buffer
 */
export function deserializeAdjacencies(buffer: BitBuffer): {
    required: Set<any>;
    optional: Set<any>;
    deleted: Set<any>;
};
import { Grid } from "../../types/index.js";
import { BitBuffer } from "../../utils/index.js";
