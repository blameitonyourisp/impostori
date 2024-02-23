import {
    Application,
    Assets,
    Container,
    Sprite,
    Spritesheet,
    SCALE_MODES,
    BaseTexture
} from "pixi.js"
import { deserializeImpostori } from "../../package/index.js"

const urlParams = new URLSearchParams(window.location.search)
const serializedImpostori = urlParams.get("puzzle")
if (!serializedImpostori) {
    throw new Error()
}
const impostori = deserializeImpostori(serializedImpostori)

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    backgroundColor: 0xffecd6
})
document.body.appendChild(app.view)

const spritesheetJsonUrl = new URL(
    "../../../admin/assets/spritesheets/1-bit/spritesheet.json",
    import.meta.url
)
const spritesheetImageUrl = new URL(
    "../../../admin/assets/spritesheets/1-bit/spritesheet.png",
    import.meta.url
)

const request = new Request(spritesheetJsonUrl.href)
fetch(request)
    .then(response => response.json())
    .then(spritesheetData => {
        spritesheetData.meta.image = spritesheetImageUrl.href
        return new Spritesheet(
            BaseTexture.from(spritesheetData.meta.image),
            spritesheetData
        )
    })
    .then(spritesheet => spritesheet.parse())
    .then(spritesheet => {
        // SCALE_MODES.DEFAULT = SCALE_MODES.NEAREST
        const container = new Container()

        const tiles = /** @type {Sprite[]} */ ([])
        const connections = /** @type {Sprite[]} */ ([])
        for (const [index, cell] of impostori.grid.cells.entries()) {
            const tileSelector = impostori.grid.random.prng(1, 6)
            const tile = 1 << cell.box & parseInt("100110", 2)
                ? new Sprite(spritesheet[`tile_vertical_${tileSelector}`])
                : new Sprite(spritesheet[`tile_horizontal_${tileSelector}`])

            tile.x = 69 * (index % 6)
            tile.y = 82 * Math.floor(index / 6) + 41 * (index % 6)
            tiles.push(tile)

            for (const index of cell.adjacentIndexes.all) {
                if (index < cell.index) { continue }
                let connection = new Sprite(spritesheet["connection_3"])

                switch (index - cell.index) {
                    case 6:
                        connection = new Sprite(spritesheet["connection_1"])
                        connection.x = tile.x + 30
                        connection.y = tile.y + 67
                        break
                    case 1:
                        connection = new Sprite(spritesheet["connection_2"])
                        connection.x = tile.x + 62
                        connection.y = tile.y + 44
                        break
                    default:
                        connection = new Sprite(spritesheet["connection_3"])
                        connection.x = tile.x - 7
                        connection.y = tile.y + 44
                }

                // connection_1
                // connection.x = tile.x + 30
                // connection.y = tile.y + 67

                // connection_2
                // connection.x = 69 * (index % 6) + 62
                // connection.y = tile.y + 44

                // connection_3
                // connection.x = tile.x - 7
                // connection.y = tile.y + 44

                connections.push(connection)
            }
        }

        for (const sprite of [...tiles, ...connections]) {
            container.addChild(sprite)
        }

        // const tile = new Sprite(spritesheet["tile_horizontal_1"])
        // tile.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
        // tile.width *= 3
        // tile.height *= 3
        // tile.x = 0
        // tile.y = 600
        // container.addChild(tile)
        // console.log(container.width, container.height)
        if (window.innerWidth < container.width) {
            const scale = window.innerWidth / container.width
            container.setTransform(0, 0, scale, scale)
        }
        container.x = Math.round((app.screen.width - container.width) / 2)
        container.y = Math.round((app.screen.height - container.height) / 2)
        app.stage.addChild(container)

        app.ticker.add(() => {
            
        })
    })

// @@no-exports
