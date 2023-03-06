import { serializeCell } from "./cell.js"

const serializeGrid = grid => {
    const buffer = Buffer.alloc(288) // 8 * 36
    for (const cell of grid.cells) {
        const cellBuffer = serializeCell(cell)
        cellBuffer.copy(buffer, 8 * cell.index)
    }
    return buffer
}

export { serializeGrid }