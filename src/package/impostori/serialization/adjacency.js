// @ts-check

import { BitBuffer } from "../../utils/BitBuffer.js"
import { Grid } from "../../types/index.js"

/**
 * 
 * @param {Grid} grid 
 */
const serializeAdjacencies = grid => {
    const buffer = new BitBuffer({ size: 11 }) // 85 bits or 11 bytes
    for (let i = 0; i < 84; i ++) {
        const bit = grid.adjacencyIDs.required.has(i)
        buffer.writeSequential(bit ? 1 : 0, 1)
    }
    return buffer
}

export { serializeAdjacencies }