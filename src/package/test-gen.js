// @ts-check

// @imports-local
import { generateImpostori } from "./impostori/generate/index.js"
import { printGrid } from "./impostori/grid/print.js"
// import { serializeCell } from "./impostori/serialization/cold.js"
import { serializeGrid } from "./impostori/serialization/grid.js"
import { CLIManager } from "./utils/cli/Manager.js"
import { ProgressWidget } from "./utils/cli/Progress.js"
import { Resource } from "./utils/Resource.js"
import { Impostori } from "./types/Impostori.js"
import { serializeImpostori } from "./impostori/serialization/impostori.js"

// @body

const seed = 3163700000 + 1
const impostori = generateImpostori(seed)


// console.log(serializeGrid(impostori.grid).toString("base64url"))
// console.log(serializeGrid(impostori.grid).toString())
// console.log(impostori.grid.adjacencyIDs)
// printGrid(impostori.grid)
// console.log(impostori.rawEntropy)

console.log(serializeImpostori(impostori))

/**
 * recreation of impostori:
 *  - seed
 *  - raw entropy
 *  - corrected entropy (derived from raw according to version specific code)
 *  - rating (as above)
 *  - grade (as above)
 *  - serialized grid string
 * 
 * required --> seed, version, entropy, serialized grid string
 */

/**
 * recreation of grid:
 *  - cells
 *  - type indexes (grid assumed complete, and derived from cells)
 *  - adj (all assumed optional, then added to required list from adj bitmap)
 *  - random (state of random number generator)
 *  - isGenerating (false)
 * 
 * required --> adj bitmap, prng state
 */

/**
 * recreation of cell:
 *  - index (derived from location in serialized string)
 *  - row, column, box (derived from index)
 *  - value
 *  - type (derived from value and hints)
 *  - hints (only worker and detective required; imposter hints inferred)
 *  - adjacent indexes & types (derived from adj bitmap)
 * 
 * required --> value, detective hint, worker hints
 */