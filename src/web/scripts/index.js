import { 
    Application,
    Container, 
    Sprite, 
    Assets, 
    SCALE_MODES 
} from "pixi.js"

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    backgroundColor: 0xffecd6
})
document.body.appendChild(app.view)

// SCALE_MODES.DEFAULT = SCALE_MODES.NEAREST
const spritesheet = await Assets.load("spritesheet.json")

const container = new Container()
for (let i = 0; i < 36 ; i ++) {
    const tile = new Sprite(spritesheet.textures["tile_horizontal_1"])
    tile.x = 69 * (i % 6) //+ 10
    tile.y = 82 * Math.floor(i / 6) + 41 * (i % 6) //+ 29
    container.addChild(tile)
}
const tile = new Sprite(spritesheet.textures["tile_horizontal_1"])
tile.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
tile.width *= 3
tile.height *= 3
tile.x = 0
tile.y = 600
container.addChild(tile)
console.log(container.width, container.height)
if (window.innerWidth < container.width) {
    const scale = window.innerWidth / container.width
    container.setTransform(0, 0, scale, scale)
}
container.x = Math.round((app.screen.width - container.width) / 2)
container.y = Math.round((app.screen.height - container.height) / 2)
app.stage.addChild(container)


app.ticker.add(() => {
    
})

// 429 x 692 -> 450 x 750