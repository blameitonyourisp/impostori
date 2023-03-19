class BitBuffer {
    constructor({ size = 4, buffer = new ArrayBuffer(size) } = {}) {
        this.buffer = buffer
    }

    read(size = 32, offset = 0) {
        if (size > 32) { return }
        const { view, byteLength, subBit } = this.#getView(size, offset)
        let uint32 = 0
        for (let i = 0; i < byteLength; i ++) {
            const offset = 24 + subBit - i * 8
            uint32 = offset >= 0 
                ? (uint32 | view.getUint8(i) << offset) >>> 0
                : (uint32 | view.getUint8(i) >>> - offset) >>> 0
        }
        return uint32 >>> 32 - size
    }

    write(int, size = 32, offset = 0) {
        if (Math.log2(int) > 32 || size > 32) { return }
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

    #getView(size, offset) {
        const startByte = Math.floor(offset / 8)
        const subBit = offset - 8 * startByte
        const byteLength = Math.ceil((subBit + size) / 8)
        if (startByte + byteLength > this.byteLength) { return }
        const view = new DataView(this.buffer, startByte, byteLength)
        return { view, byteLength, subBit }
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
                string += BitBuffer.uint24ToB64(uint24)
                uint24 = 0
            }
        }
        return string
    }

    get bitLength() { 
        return this.byteLength << 3 
    }

    get byteLength() { 
        return this.buffer.byteLength 
    }

    static from(string) {
        if (!string.match(/^[A-Za-z0-9\-_]*$/)) { return }
        const buffer = new BitBuffer({ size: Math.ceil(string.length * 3 / 4) })
        const regex = /[A-Za-z0-9\-_]{1,4}/g
        for (const match of string.match(regex)) {
            const uint24 = BitBuffer.b64ToUint24(match.padEnd(4, "A"))
            buffer.sequentialWrite(uint24, 24)
        }
        return buffer
    }

    static b64ToUint24(string) {
        if (!string.match(/^[A-Za-z0-9\-_]{4}$/)) { return }
        let uint24 = 0
        for (const [index, char] of string.split("").entries()) {
            const uint6 = BitBuffer.b64ToInt(char)
            uint24 = (uint24 | (uint6 << 18 - index * 6)) >>> 0
        }
        return uint24
    }

    static uint24ToB64(uint24) {
        if (uint24 > 2 ** 24) { return } 
        let string = ""
        for (let i = 0; i < 4; i ++) {
            const uint6 = uint24 >>> 18 - i * 6 << 26 >>> 26
            string += BitBuffer.intToB64(uint6)
        }
        return string
    }

    static b64ToInt(char) {
        return BitBuffer.dict.indexOf(char)
    } 

    static intToB64(int) {
        return BitBuffer.dict[int]
    }

    static get dict() {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + // ALPHA UPPER
            "abcdefghijklmnopqrstuvwxyz" + // alpha lower
            "0123456789" + // numbers
            "-_" // misc
    }
}

export { BitBuffer }