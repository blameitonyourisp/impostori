import { GridCell, CellType } from "../../types/_index.js"

/**
 * 
 * @param {GridCell} cell 
 */
const serializeCell = cell => {
    
    const contextBuffer = new BitBuffer()
    contextBuffer.sequentialWrite(cell.index, 6)
    contextBuffer.sequentialWrite(cell.value, 3)
    contextBuffer.sequentialWrite(serializeType(cell.type), 2)

    for (const index of cell.adjacentIndexes.all) {
        const relativeIndex = index - cell.index
        contextBuffer.sequentialWrite(serializeRelativeIndex(relativeIndex), 3)
    }

    const hints = [
        ...cell.hints.detective, 
        ...cell.hints.worker, 
        ...cell.hints.imposter
    ]
    const hintBuffer = new BitBuffer()
    for (const value of hints) { hintBuffer.sequentialWrite(value, 5) }

    const buffer = Buffer.alloc(8)
    buffer.writeUInt32BE(contextBuffer.uint32, 0)
    buffer.writeUInt32BE(hintBuffer.uint32, 4)

    return buffer
}

/**
 * 
 * @param {CellType} type 
 */
const serializeType = type => {
    return type === "DETECTIVE" ? 0 
        : type === "WORKER" ? 1
        : type === "IMPOSTER" ? 2
        : 3
}

const serializeTypeEnum = {
    "DETECTIVE": 0,
    "WORKER": 1,
    "IMPOSTER": 2,
    "VACANT": 3,
}

const serializeRelativeIndexEnum = {
    "-6": 0,
    "-5": 1,
    "-1": 5,
    "1": 2,
    "5": 4,
    "6": 3,
}

const serializeRelativeIndex = index => {
    return index === - 6 ? 1 
        : index === - 5 ? 2
        : index === 1 ? 3 
        : index === 6 ? 4 
        : index === 5 ? 5 
        : index === - 1 ? 6 
        : 0
}

class BitBuffer {
    constructor({ uint32 = 0, readPointer = 0, writePointer = 0 } = {}) {
        this.uint32 = uint32
        this.readPointer = readPointer
        this.writePointer = writePointer
    }

    read(size = 32, offset = 0) {
        return this.uint32 >>> offset << (32 - size) >>> (32 - size)
    }

    sequentialRead(size) {
        const int = this.read(size, this.readPointer)
        this.readPointer = (this.readPointer + size) % 32
        return int
    }

    write(int, offset) {
        this.uint32 = (this.uint32 | (int << offset)) >>> 0
        return this.uint32
    }

    sequentialWrite(int, size) {
        this.write(int, this.writePointer)
        this.writePointer = (this.writePointer + size) % 32
        return this.writePointer
    }
}

export { serializeCell }