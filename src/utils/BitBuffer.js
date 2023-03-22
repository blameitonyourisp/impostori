class BitBuffer {
    constructor({ size = 4, buffer = new ArrayBuffer(size) } = {}) {
        this.buffer = buffer
    }
    
    write(int, size, offset, strict = false) {
        offset = strict ? offset : this.#clampOffset(offset)
        size = strict ? size : this.#clampSize(size, offset)
        int = strict ? int : this.#clampInt(int, offset)
        if (int > 2 ** size - 1 || size > 32) { 
            throw new BitBuffer.#SizeError(size, "READ") 
        }
        const { view, byteLength, subBit } = this.#getView(size, offset)
        for (let i = 0; i < byteLength; i ++) {
            const byte = view.getUint8(i)
            let uint8 = 0
            for (let j = 0; j < 8; j ++) {
                const index = i * 8 + j
                const bit = index < subBit || index > subBit + size 
                    ? byte << 24 + j >>> 31
                    : int << (32 - size) + (index - subBit) >>> 31
                uint8 = uint8 | (bit << 7 - j)
            }
            view.setUint8(i, uint8)
        }
        return int
    }

    writeSequential(int, size, strict = false) {
        this.writePointer ??= 0
        size ??= this.writeSequential(Math.ceil(Math.log2(int)), 5, strict)
        const uint32 = this.write(int, size, this.writePointer, strict)
        this.writePointer = (this.writePointer + size) % this.bitLength
        return uint32
    }

    writeString(string, offset, strict = false) {
        for (const char of string) {
            this.write(char.charCodeAt(0), 8, offset, strict)
            offset += 8
        }
        return string
    }

    read(size, offset, strict = false) {
        offset = strict ? offset : this.#clampOffset(offset)
        size = strict ? size : this.#clampSize(size, offset)
        if (size > 32) { throw new BitBuffer.#SizeError(size, "READ") }
        const { view, byteLength, subBit } = this.#getView(size, offset)
        let uint32 = 0
        for (let i = 0; i < byteLength; i ++) {
            const offset = 24 + subBit - i * 8
            uint32 = offset >= 0 ? (uint32 | view.getUint8(i) << offset) >>> 0
                : (uint32 | view.getUint8(i) >>> - offset) >>> 0
        }
        return uint32 >>> 32 - size
    }

    readSequential(size, strict = false) {
        this.readPointer ??= 0
        size ??= this.readSequential(5, strict)
        const uint32 = this.read(size, this.readPointer, strict)
        this.readPointer = (this.readPointer + size) % this.bitLength
        return uint32
    }

    readString(size, offset, strict = false) {
        let string = ""
        for (let i = 0; i < size; i ++) {
            string += String.fromCharCode(this.read(8, offset + i * 8, strict))
        }
        return string
    }

    copy({
        target = null,
        targetStart = 0,
        sourceStart = 0,
        sourceEnd = this.bitLength,
        strict = false
    } = {}) {
        const sourceBits = sourceEnd - sourceStart
        const targetBits = target ? target.bitLength - targetStart : Infinity
        if (strict && (sourceStart < 0 || sourceEnd > this.bitLength)) {
            const index = sourceStart < 0 ? sourceStart : sourceEnd
            throw new BitBuffer.#RangeError(index, this.buffer)
        }
        if (strict && sourceBits > targetBits) {
            const index = target.bitLength + 1
            throw new BitBuffer.#RangeError(index, target.buffer)
        }
        target ??= new BitBuffer({ size: Math.ceil(sourceBits / 8) })
        for (let i = 0; i < sourceBits; i ++) {
            target.write(this.read(1, sourceStart + i), 1, targetStart + i)
        }
        return target
    }
    
    toString() {
        let string = ""
        let pointer = 0
        let uint24 = 0
        const view = new Uint8Array(this.buffer)
        for (let i = 0; i < Math.ceil(this.byteLength / 3) * 3; i ++) {
            const byte = view[i] || 0
            uint24 = (uint24 | (byte << 16 - pointer * 8)) >>> 0
            pointer = ++ pointer % 3
            if (!pointer) {
                string += BitBuffer.#uint24ToB64(uint24)
                uint24 = 0
            }
        }
        return string
    }

    #clampInt(int, offset) {
        const bitsRemaining = this.bitLength - offset
        const maxInt = bitsRemaining < 32 ? (2 << bitsRemaining) - 1 >>> 0
            : BitBuffer.#MAX_INT
        return Math.min(int, maxInt)
    }

    #clampSize(size, offset) {
        return Math.min(size, this.bitLength - offset, 32)
    }

    #clampOffset(offset) {
        return Math.min(offset, this.bitLength - 1)
    }

    #getView(size, offset) {
        const startByte = Math.floor(offset / 8)
        const subBit = offset - 8 * startByte
        const byteLength = Math.ceil((subBit + size) / 8)
        if (startByte + byteLength > this.byteLength) { 
            throw new BitBuffer.#RangeError(size, offset)
        }
        const view = new DataView(this.buffer, startByte, byteLength)
        return { view, byteLength, subBit }
    }

    get bitLength() { 
        return this.byteLength << 3 
    }

    get byteLength() { 
        return this.buffer.byteLength 
    }

    /**
     * 
     * @param {string} string 
     */
    static from(string) {
        if (!string.match(/^[A-Za-z0-9\-_]*$/)) { 
            throw new BitBuffer.#StringError(size, "READ") 
        }
        const buffer = new BitBuffer({ size: Math.ceil(string.length * 3 / 4) })
        const regex = /[A-Za-z0-9\-_]{1,4}/g
        for (const match of string.match(regex)) {
            const uint24 = BitBuffer.#b64ToUint24(match.padEnd(4, "A"))
            buffer.sequentialWrite(uint24, 24)
        }
        return buffer
    }

    // errors not required for internal
    static #b64ToUint24(string) {
        let uint24 = 0
        for (const [index, char] of string.split("").entries()) {
            const uint6 = BitBuffer.#dict.indexOf(char)
            uint24 = (uint24 | (uint6 << 18 - index * 6)) >>> 0
        }
        return uint24
    }

    static #uint24ToB64(uint24) {
        let string = ""
        for (let i = 0; i < 4; i ++) {
            const uint6 = uint24 >>> 18 - i * 6 << 26 >>> 26
            string += BitBuffer.#dict[uint6]
        }
        return string
    }

    static get #MAX_INT() {
        return 4294967295 // 2 ** 32 - 1 
    }

    static get #dict() {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + // ALPHA UPPER
            "abcdefghijklmnopqrstuvwxyz" + // alpha lower
            "0123456789" + // numbers
            "-_" // misc
    }

    static get #SizeError() {
        return class BitBufferSizeError extends Error {
            constructor(size, operation) {
                super("An integer size of ${} bits was requ")
            }
        }
    }

    static get #StringError() {
        return class BitBufferStringError extends Error {
            constructor() {
                super("An integer size of ${} bits was requ")
            }
        }
    }

    static get #RangeError() {
        return class BitBufferRangeError extends Error {
            constructor(size, offset) {
                super("An integer size of ${} bits was requ")
            }
        }
    }
}

// to get another pointer window, just make new instance of bit buffer class
// but pass the original buffer into the constructor

export { BitBuffer }