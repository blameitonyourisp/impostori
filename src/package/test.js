import { BitBuffer } from "./utils/BitBuffer.js"
// import { BitBuffer } from "./utils/BitBuffer.js"

const buffer = new BitBuffer({ size: 16 })


// const writer = buffer.writer()

// buffer.write(6, 3, 0)
// buffer.write(9, 4, 3)
// buffer.write(7, 3, 7)
// writer.writeSequential(6, 3)
// writer.writeSequential(9, 4)
// writer.writeSequential(7, 3)
buffer.writeSequential(5, 3)
buffer.writeSequential(9, 4)
buffer.writeSequential(7, 3)
console.log(buffer.readSequential(3))
console.log(buffer.readSequential(4))
console.log(buffer.readSequential(3))

// console.log(buffer.write(2 ** 32, 32, 81))
// buffer.write(2 ** 32 - 1, 32, 81)
// console.log(buffer.read(32, 81))
// 4294967295

// buffer.writeString("32.12.45", 0)
// console.log(buffer.readString(8, 0))

buffer.writeSequential(837492)
console.log(buffer.readSequential())


console.log(buffer.buffer)
// console.log(buffer)

// console.time("test")
// for (let i = 0; i < 100000; i ++) {
//     await buffer.toString()
// }
// console.timeEnd("test")

console.log(await buffer.toString("v1.0.0"))

const test = await BitBuffer.from("s-mY7oAAAAAAAAAAAAAAAAAAeTcN", "v1.0.0")
console.log(test.buffer, test.writePointer)
// console.log(String.fromCharCode.apply(null, buffer.view))

// buffer.read(49)
// console.log(new buffer.reader())

// const copyTestBuf = new BitBuffer({ size: 10 })
// const copyTest = buffer.copy({ sourceStart: -1, strict: true })
// console.log(copyTest)