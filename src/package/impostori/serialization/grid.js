import { BitBuffer } from "../../utils/BitBuffer.js"
import { serializeAdjacencies } from "./adjacency.js"
import { serializeCell } from "./cell.js"

const serializeGrid = grid => {
    let buffer = new BitBuffer({ size: 128 })
    for (const cell of grid.cells) {
        const cellBuffer = serializeCell(cell)
        cellBuffer.copy({ target: buffer, sourceEnd: cellBuffer.writePointer })
    }
    const adjacencies = serializeAdjacencies(grid)
    adjacencies.copy({ target: buffer, sourceEnd: adjacencies.writePointer})

    const size = Math.ceil(buffer.writePointer / 8)
    buffer = buffer.copy({ target: new BitBuffer({ size })}) // add source end
    return buffer
}

const deserializeGrid = () => {

}

export { serializeGrid }