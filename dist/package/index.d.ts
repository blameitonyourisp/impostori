/**
 * Object containing upper and lower cell indexes (sorted by size not position
 * on grid), and a unique identifier which identifies the adjacency from the
 * frame of the grid rather than the frame of the cell (i.e. for every unique
 * adjacency, two cells will point to it; the adjacency of cell 1 to cell 2 is
 * the same as the adjacency of cell 2 to cell 1, and must therefore not have
 * multiple identifiers).
 *
 * ---
 * **WARNING** The adjacency type should not be confused with the raw adjacent
 * indexes of an individual {@link GridCell }
 * ---
 */
type Adjacency = {
    /**
     * - Higher of the two adjacency cell indexes
     */
    upperIndex: number;
    /**
     * - Lower of the two adjacency cell indexes
     */
    lowerIndex: number;
    /**
     * - Unique adjacency id in the number format "xxyy" where
     * "xx" is the upper index, and "yy" is the lower index
     */
    id: number;
    string: string;
};
/**
 * @file Adjacency type declaration.
 * @author James Reid
 */
/**
 * Object containing upper and lower cell indexes (sorted by size not position
 * on grid), and a unique identifier which identifies the adjacency from the
 * frame of the grid rather than the frame of the cell (i.e. for every unique
 * adjacency, two cells will point to it; the adjacency of cell 1 to cell 2 is
 * the same as the adjacency of cell 2 to cell 1, and must therefore not have
 * multiple identifiers).
 *
 * ---
 * **WARNING** The adjacency type should not be confused with the raw adjacent
 * indexes of an individual {@link GridCell}
 * ---
 *
 * @summary Object containing 2 adjacent cell indexes and a unique identifier
 * @typedef {object} Adjacency
 * @property {number} upperIndex - Higher of the two adjacency cell indexes
 * @property {number} lowerIndex - Lower of the two adjacency cell indexes
 * @property {number} id - Unique adjacency id in the number format "xxyy" where
 *      "xx" is the upper index, and "yy" is the lower index
 * @property {string} string
 */
/**
 * @ignore
 * @type {Adjacency}
 */
declare let Adjacency: Adjacency;

/**
 * Adjacent indexes of a cell filtered by type of adjacent cell.
 */
type AdjacentIndexTypeFilter = {
    /**
     * - Adjacent indexes of detective cells.
     */
    detective: number[];
    /**
     * - Adjacent indexes of imposter cells.
     */
    worker: number[];
    /**
     * - Adjacent indexes of worker cells.
     */
    imposter: number[];
    /**
     * - Adjacent indexes of cells without a type.
     */
    vacant: number[];
};
/**
 * @file AdjacentIndexTypeFilter type declaration.
 * @author James Reid
 */
/**
 * Adjacent indexes of a cell filtered by type of adjacent cell.
 *
 * @typedef {object} AdjacentIndexTypeFilter
 * @property {number[]} detective - Adjacent indexes of detective cells.
 * @property {number[]} worker - Adjacent indexes of imposter cells.
 * @property {number[]} imposter - Adjacent indexes of worker cells.
 * @property {number[]} vacant - Adjacent indexes of cells without a type.
 */
/**
 * @ignore
 * @type {AdjacentIndexTypeFilter}
 */
declare let AdjacentIndexTypeFilter: AdjacentIndexTypeFilter;

/**
 * Object describing the existing adjacent indexes of a cell. All possible
 * adjacent cell indexes are included on a cell object in its initial state.
 * During grid creation, when {@link Adjacency Adjacencies} are removed, these
 * changes are reflected on this object by removing the relevant raw adjacent
 * indexes. Note that these are only cell indexes which directly point to other
 * cells in the grid, and should not be confused with {@link Adjacency }.
 */
type CellAdjacentIndexes = {
    /**
     * - All adjacent cell indexes.
     */
    all: number[];
    /**
     * - Adjacent cell indexes flagged as required for
     * example between an imposter and a detective cell.
     */
    required: number[];
    /**
     * - Adjacent cell indexes flagged as optional.
     * These may be randomly pruned during grid creation in order to produce a
     * unique grid with fewer adjacencies. Initially all adjacent indexes are
     * considered to be optional.
     */
    optional: number[];
    /**
     * - Adjacent indexes filtered by type.
     */
    type: AdjacentIndexTypeFilter;
};
/**
 * Object describing the existing adjacent indexes of a cell. All possible
 * adjacent cell indexes are included on a cell object in its initial state.
 * During grid creation, when {@link Adjacency Adjacencies} are removed, these
 * changes are reflected on this object by removing the relevant raw adjacent
 * indexes. Note that these are only cell indexes which directly point to other
 * cells in the grid, and should not be confused with {@link Adjacency}.
 *
 * @typedef {object} CellAdjacentIndexes
 * @property {number[]} all - All adjacent cell indexes.
 * @property {number[]} required - Adjacent cell indexes flagged as required for
 *      example between an imposter and a detective cell.
 * @property {number[]} optional - Adjacent cell indexes flagged as optional.
 *      These may be randomly pruned during grid creation in order to produce a
 *      unique grid with fewer adjacencies. Initially all adjacent indexes are
 *      considered to be optional.
 * @property {AdjacentIndexTypeFilter} type - Adjacent indexes filtered by type.
 */
/**
 * @ignore
 * @type {CellAdjacentIndexes}
 */
declare let CellAdjacentIndexes: CellAdjacentIndexes;

/**
 * Completed grid cell type, initiated to "VACANT" during grid creation and when
 * brute force solving an incomplete grid.
 */
type CellType = "detective" | "worker" | "imposter" | "vacant";
/**
 * @file CellType type declaration.
 * @author James Reid
 */
/**
 * Completed grid cell type, initiated to "VACANT" during grid creation and when
 * brute force solving an incomplete grid.
 *
 * @typedef {"detective"|"worker"|"imposter"|"vacant"} CellType
 */
/**
 * @ignore
 * @type {CellType}
 */
declare let CellType: CellType;

type CellCandidate = {
    value: number;
    type: CellType;
};
/**
 *
 * @typedef {object} CellCandidate
 * @property {number} value
 * @property {CellType} type
 */
/**
 * @ignore
 * @type {CellCandidate}
 */
declare let CellCandidate: CellCandidate;

/**
 * Cell hints as will appear in the final puzzle, each member array contains a
 * subset of values from 1 to 6.
 */
type CellHints = {
    /**
     * - Array length 1 containing detective hints.
     */
    detective: number[];
    /**
     * - Array length 2 containing worker hints.
     */
    worker: number[];
    /**
     * - Array length 3 containing imposter hints.
     */
    imposter: number[];
};
/**
 * @file CellHints type declaration.
 * @author James Reid
 */
/**
 * Cell hints as will appear in the final puzzle, each member array contains a
 * subset of values from 1 to 6.
 *
 * @typedef {object} CellHints
 * @property {number[]} detective - Array length 1 containing detective hints.
 * @property {number[]} worker - Array length 2 containing worker hints.
 * @property {number[]} imposter - Array length 3 containing imposter hints.
 */
/**
 * @ignore
 * @type {CellHints}
 */
declare let CellHints: CellHints;

/**
 * Object containing all data for a cell required to generate a grid,
 * solve a puzzle and to display a puzzle. This includes mainly data identifying
 * the position of the cell in the grid, data identifying the contents of the
 * cell, and data identifying adjacency relationships with neighboring cells.
 *
 * Position data is initialized at the start of grid generation, and does
 * not change during the course of generation. All other data is initialized
 * in a default state, and is subject to change during generation.
 */
type GridCell = {
    /**
     * - Cell index in grid ranged 0 to 35.
     */
    index: number;
    /**
     * - Row index of cell ranged 0 to 5.
     */
    row: number;
    /**
     * - Column index of cell ranged 0 to 5.
     */
    column: number;
    /**
     * - Box index of cell ranged 0 to 5.
     */
    box: number;
    /**
     * - Shuffled array of all possible cell
     * values from 1 to 6, when generating grid, cell will be filled randomly
     * with values from this array.
     */
    candidates: CellCandidate[];
    /**
     * - Completed grid cell value ranged 1 to 6. Value
     * is initiated to 0 during grid creation and when brute force solving an
     * incomplete grid.
     */
    value: number;
    /**
     * - Value of cell chosen by client.
     */
    clientValue: number;
    /**
     * - Completed grid cell type.
     */
    type: CellType;
    /**
     * - Cell hints as will appear in the final puzzle.
     */
    hints: CellHints;
    /**
     * - Object describing the
     * existing adjacent indexes of a cell.
     */
    adjacentIndexes: CellAdjacentIndexes;
};
/**
 * Object containing all data for a cell required to generate a grid,
 * solve a puzzle and to display a puzzle. This includes mainly data identifying
 * the position of the cell in the grid, data identifying the contents of the
 * cell, and data identifying adjacency relationships with neighboring cells.
 *
 * Position data is initialized at the start of grid generation, and does
 * not change during the course of generation. All other data is initialized
 * in a default state, and is subject to change during generation.
 *
 * @summary Object containing all required data for a each grid cell
 *
 * @typedef {object} GridCell
 * @property {number} index - Cell index in grid ranged 0 to 35.
 * @property {number} row - Row index of cell ranged 0 to 5.
 * @property {number} column - Column index of cell ranged 0 to 5.
 * @property {number} box - Box index of cell ranged 0 to 5.
 * @property {CellCandidate[]} candidates - Shuffled array of all possible cell
 *      values from 1 to 6, when generating grid, cell will be filled randomly
 *      with values from this array.
 * @property {number} value - Completed grid cell value ranged 1 to 6. Value
 *      is initiated to 0 during grid creation and when brute force solving an
 *      incomplete grid.
 * @property {number} clientValue - Value of cell chosen by client.
 * @property {CellType} type - Completed grid cell type.
 * @property {CellHints} hints - Cell hints as will appear in the final puzzle.
 * @property {CellAdjacentIndexes} adjacentIndexes - Object describing the
 *      existing adjacent indexes of a cell.
 */
/**
 * @ignore
 * @type {GridCell}
 */
declare let GridCell: GridCell;

type GridTypeIndexes = {
    detective: number[];
    worker: number[];
    imposter: number[];
    vacant: number[];
};
/**
 * @file GridTypeIndexes type declaration.
 * @author James Reid
 */
/**
 *
 * @typedef {object} GridTypeIndexes
 * @property {number[]} detective
 * @property {number[]} worker
 * @property {number[]} imposter
 * @property {number[]} vacant
 */
/**
 *
 * @ignore
 * @type {GridTypeIndexes}
 */
declare let GridTypeIndexes: GridTypeIndexes;

type GridAdjacencyIds = {
    required: Set<number>;
    optional: Set<number>;
    deleted: Set<number>;
};
/**
 * @file GridAdjacencyIds type declaration.
 * @author James Reid
 */
/**
 *
 * @typedef {object} GridAdjacencyIds
 * @property {Set.<number>} required
 * @property {Set.<number>} optional
 * @property {Set.<number>} deleted
 */
/**
 *
 * @ignore
 * @type {GridAdjacencyIds}
 */
declare let GridAdjacencyIds: GridAdjacencyIds;

/**
 * @file Seeded random number generator.
 * @author James Reid
 */
/**
 * Seeded prng implemented using BBS algorithm. For more information on this
 * algorithm, see here (https://en.wikipedia.org/wiki/Blum_Blum_Shub).
 */
declare class Random {
    /**
     *
     * @returns {number}
     */
    static seed(): number;
    /**
     *
     * @param {*} float
     * @param {*} min
     * @param {*} max
     * @returns {number}
     */
    static floatToRangedInteger(float: any, min: any, max: any): number;
    /**
     *
     * @param {*} seed
     * @param {*} primeP
     * @param {*} primeQ
     */
    constructor(seed?: any, primeP?: any, primeQ?: any);
    config: {
        seed: any;
        primeP: any;
        primeQ: any;
        divisor: number;
    };
    state: {
        iteration: number;
        iteratedSeed: any;
    };
    /**
     *
     * @returns {number}
     */
    iterate(): number;
    /**
     *
     * @param {*} min
     * @param {*} max
     * @returns {number}
     */
    prng(min?: any, max?: any): number;
    /**
     *
     * @template T
     * @param {T[]} array
     * @returns {T[]}
     */
    shuffleArray<T>([...array]: T[]): T[];
    /**
     *
     * @param {*} length
     * @param {*} startOne
     * @returns {number[]}
     */
    shuffledIndexArray(length: any, startOne?: any): number[];
}

/**
 * Buffer class allowing control over an appropriately sized array buffer at the
 * bit level rather than at the byte level.
 */
declare class BitBuffer {
    /**
     * Decode serialized url-safe base 64 BitBuffer string, returning a new
     * BitBuffer instance containing the data from the original serialized
     * buffer.
     *
     * @param {string} string - Url-safe base 64 encoded BitBuffer string.
     * @returns {BitBuffer} Decoded BitBuffer instance.
     */
    static from(string: string): BitBuffer;
    /**
     * Convert 4 character url-safe base 64 string to 24-bit unsigned integer.
     *
     * @param {string} string - 4 character url-safe base 64 string.
     * @returns {number} Unsigned 24 bit integer.
     */
    static "__#5@#b64ToUint24"(string: string): number;
    /**
     * Convert 24-bit unsigned integer to 4 character url-safe base 64 string.
     *
     * @param {number} uint24 - Unsigned 24 bit integer.
     * @returns {string} 4 character url-safe base 64 string.
     */
    static "__#5@#uint24ToB64"(uint24: number): string;
    /**
     * Get bit length of a given number.
     *
     * @param {number} value - Input number.
     * @returns {number} Bit length.
     */
    static "__#5@#bitLength"(value: number): number;
    /**
     * Get url-safe base64 character dictionary, which uses different padding
     * characters to the standard base64 encoding in node. Please see
     * [here](https://developer.mozilla.org/en-US/docs/Glossary/Base64) for more
     * information on base64 encoding. For url safe characters, see rfc4648
     * [here](https://datatracker.ietf.org/doc/html/rfc4648#section-5).
     *
     * @returns {string} Url-safe base64 dictionary string.
     */
    static get "__#5@#dict"(): string;
    /**
     * Configure internal buffer property and required pointers.
     *
     * @param {object} obj - Configuration object argument.
     * @param {number} [obj.length] - Maximum character length of buffer when
     *      converted to url-safe base64 string.
     * @param {number} [obj.size] - Size of BitBuffer in *bytes*. Defaults to
     *      maximum allowable size as specified by the character length value.
     * @param {ArrayBuffer} [obj.buffer] - Internal array buffer.
     */
    constructor({ length, size, buffer }?: {
        length?: number | undefined;
        size?: number | undefined;
        buffer?: ArrayBuffer | undefined;
    });
    /**
     * Write an integer directly to internal buffer, updating write pointers to
     * the end of the written data.
     *
     * @param {number} int - Integer to write to buffer.
     * @param {object} obj - Configuration object of optional arguments.
     * @param {number} [obj.size] - Size of buffer segment to write in bits.
     * @param {number} [obj.offset] - Offset of segment within buffer in bits.
     * @param {boolean} [obj.signed] - Write signed or unsigned integer.
     * @returns {number} Integer written to buffer.
     */
    write(int: number, { size, offset, signed }?: {
        size?: number | undefined;
        offset?: number | undefined;
        signed?: boolean | undefined;
    }): number;
    /**
     * Write an integer to internal buffer with an absolute size declaration to
     * indicate how many bits are written (i.e. 5 additional bits written
     * indicating length of written data between 0 and 32 bits). Update write
     * pointers to the end of the written data.
     *
     * @param {number} int - Integer to write to buffer.
     * @param {object} obj - Configuration object of optional arguments.
     * @param {number} [obj.offset] - Offset of segment within buffer in bits.
     * @param {boolean} [obj.signed] - Write signed or unsigned integer.
     * @returns {number} Integer written to buffer.
     */
    writeAbsolute(int: number, { offset, signed }?: {
        offset?: number | undefined;
        signed?: boolean | undefined;
    }): number;
    /**
     * Write an integer to internal buffer with a relative size declaration to
     * indicate how many bits are written (i.e. 1 "sign" bit to indicate if more
     * or less bits than the previous write call are being written, and n "0"
     * bits where n is the relative size between the previous and next write
     * call sizes). Update write pointers to the end of the written data.
     *
     * @param {number} int - Integer to write to buffer.
     * @param {object} obj - Configuration object of optional arguments.
     * @param {number} [obj.offset] - Offset of segment within buffer in bits.
     * @param {boolean} [obj.signed] - Write signed or unsigned integer.
     * @returns {number} Integer written to buffer.
     */
    writeRelative(int: number, { offset, signed }?: {
        offset?: number | undefined;
        signed?: boolean | undefined;
    }): number;
    /**
     * Write a string of arbitrary length to the internal buffer.
     *
     * @param {string} string - String to write to buffer.
     * @param {object} obj - Configuration object of optional arguments.
     * @param {number} [obj.offset] - Offset of segment within buffer in bits.
     * @returns {string} String written to buffer.
     */
    writeString(string: string, { offset }?: {
        offset?: number | undefined;
    }): string;
    /**
     * Read an integer directly from internal buffer, updating read pointers to
     * the end of the read data.
     *
     * @param {number} size - Size of buffer segment to read.
     * @param {object} obj - Configuration object of optional arguments.
     * @param {number} [obj.offset] - Offset of segment within buffer in bits.
     * @param {boolean} [obj.signed] - Read signed or unsigned integer.
     * @returns {number} Integer read from buffer.
     */
    read(size: number, { offset, signed }?: {
        offset?: number | undefined;
        signed?: boolean | undefined;
    }): number;
    /**
     * Read an integer from internal buffer, determining bit size of segment
     * by reading an absolute size declaration from the buffer indicating how
     * many bits should be read (i.e. 5 additional bits read before reading
     * integer to determine bit size of read segment between 0 and 32 bits).
     * Update read pointers to the end of the read data.
     *
     * @param {object} obj - Configuration object of optional arguments.
     * @param {number} [obj.offset] - Offset of segment within buffer in bits.
     * @param {boolean} [obj.signed] - Read signed or unsigned integer.
     * @returns {number} Integer read from buffer.
     */
    readAbsolute({ offset, signed }?: {
        offset?: number | undefined;
        signed?: boolean | undefined;
    }): number;
    /**
     * Read an integer from internal buffer, determining bit size of segment by
     * reading a relative size declaration from the buffer indicating how many
     * bit should be read (i.e. 1 "sign" bit to indicate if more or less bits
     * than the previous read call are being read, and n "0" bits where n is the
     * relative size between the previous and next read call sizes). Update read
     * pointers to the end of the read data.
     *
     * @param {object} obj - Configuration object of optional arguments.
     * @param {number} [obj.offset] - Offset of segment within buffer in bits.
     * @param {boolean} [obj.signed] - Read signed or unsigned integer.
     * @returns {number} Integer read from buffer.
     */
    readRelative({ offset, signed }?: {
        offset?: number | undefined;
        signed?: boolean | undefined;
    }): number;
    /**
     * Read a string of arbitrary length from the internal buffer.
     *
     * @param {object} obj - Configuration object of optional arguments.
     * @param {number} [obj.offset] - Offset of segment within buffer in bits.
     * @returns {string} String read from buffer.
     */
    readString({ offset }?: {
        offset?: number | undefined;
    }): string;
    /**
     * Copy data from source buffer (current buffer instance) to a target buffer
     * passed in the arguments. If no target buffer passed, new BitBuffer
     * instantiated with a length based on number of copied bits. Will update
     * read/write pointers in both source and target buffers.
     *
     * @param {object} obj - Configuration object of optional arguments.
     * @param {BitBuffer} [obj.target] - Target buffer to copy to.
     * @param {number} [obj.targetStart] - Start bit in target buffer.
     * @param {number} [obj.sourceStart] - Start bit in source buffer.
     * @param {number} [obj.sourceEnd] - End bit in source buffer.
     * @returns {BitBuffer} Target buffer with data copied from source buffer.
     */
    copy({ target, targetStart, sourceStart, sourceEnd }?: {
        target?: BitBuffer | undefined;
        targetStart?: number | undefined;
        sourceStart?: number | undefined;
        sourceEnd?: number | undefined;
    }): BitBuffer;
    /**
     * Convert buffer to serialized string of base-64 url-safe characters.
     *
     * @returns {string} Serialized buffer string.
     */
    toString(): string;
    /**
     * Get length of buffer in bits.
     *
     * @returns {number} Bit length of buffer.
     */
    get bitLength(): number;
    /**
     * Get length of buffer in bytes.
     *
     * @returns {number} Byte length of buffer.
     */
    get byteLength(): number;
    /**
     * Safely set current read pointer, observing bit size of buffer.
     *
     * @param {number} pointer - Updated read pointer.
     * @returns {void}
     */
    set readPointer(pointer: number);
    /**
     * Get current read pointer.
     *
     * @returns {number} Internal read pointer.
     */
    get readPointer(): number;
    /**
     * Safely set last read size, observing max and min integer bit sizes.
     *
     * @param {number} size - Updated last read size in bits.
     * @returns {void}
     */
    set lastReadSize(size: number);
    /**
     * Get last read size in bits.
     *
     * @returns {number} Internal last read size in bits.
     */
    get lastReadSize(): number;
    /**
     * Safely set current write pointer, observing bit size of buffer.
     *
     * @param {number} pointer - Updated write pointer.
     * @returns {void}
     */
    set writePointer(pointer: number);
    /**
     * Get current write pointer.
     *
     * @returns {number} Internal write pointer.
     */
    get writePointer(): number;
    /**
     * Safely set last write size, observing max and min integer bit sizes.
     *
     * @param {number} size - Updated last write size in bits.
     * @returns {void}
     */
    set lastWriteSize(size: number);
    /**
     * Get last write size in bits.
     *
     * @returns {number} Internal last write size in bits.
     */
    get lastWriteSize(): number;
    #private;
}

type Grid = {
    cells: GridCell[];
    typeIndexes: GridTypeIndexes;
    adjacencyIDs: GridAdjacencyIds;
    random: Random;
    isGenerating: boolean;
};
/**
 *
 * @typedef {object} Grid
 * @property {GridCell[]} cells
 * @property {GridTypeIndexes} typeIndexes
 * @property {GridAdjacencyIds} adjacencyIDs
 * @property {Random} random
 * @property {boolean} isGenerating
 */
/**
 *
 * @ignore
 * @type {Grid}
 */
declare let Grid: Grid;

/**
 * Available grade strings for impostori puzzles.
 */
type ImpostoriGrade = "beginner" | "easy" | "medium" | "hard" | "expert";
/**
 * @file ImpostoriGrade type declaration.
 * @author James Reid
 */
/**
 * Available grade strings for impostori puzzles.
 *
 * @typedef {"beginner"|"easy"|"medium"|"hard"|"expert"} ImpostoriGrade
 */
/**
 * @ignore
 * @type {ImpostoriGrade}
 */
declare let ImpostoriGrade: ImpostoriGrade;

type Impostori = {
    grid: Grid;
    seed: number;
    version: {
        puzzle: string;
        repository: string;
    };
    rawEntropy: number;
    normalizedEntropy: number;
    uniformEntropy: number;
    rating: number;
    grade: ImpostoriGrade;
    serializedString: string;
};
/**
 *
 * @typedef {object} Impostori
 * @property {Grid} grid
 * @property {number} seed
 * @property {object} version
 * @property {string} version.puzzle
 * @property {string} version.repository
 * @property {number} rawEntropy
 * @property {number} normalizedEntropy
 * @property {number} uniformEntropy
 * @property {number} rating
 * @property {ImpostoriGrade} grade
 * @property {string} serializedString
 */
/**
 * @ignore
 * @type {Impostori}
 */
declare let Impostori: Impostori;

/**
 *
 * @param {GridCell} cell
 * @param {GridCell} targetCell
 * @returns {GridCell}
 */
declare function removeCellAdjacency(cell: GridCell, targetCell: GridCell): GridCell;
/**
 *
 * @param {GridCell} cell
 * @param {GridCell} targetCell
 * @returns {GridCell}
 */
declare function addCellAdjacency(cell: GridCell, targetCell: GridCell): GridCell;
/**
 *
 * @param {GridCell} cell
 * @param {GridCell} targetCell
 * @returns {GridCell}
 */
declare function requireCellAdjacency(cell: GridCell, targetCell: GridCell): GridCell;
/**
 * Calculates indexes of all possible orthogonally adjacent hex cells given the
 * index of a center hex cell. Each cell may have up to 6 orthogonally adjacent
 * cells - all indexes out of range (0 to 35) for the grid are omitted, and
 * wrap around indexes are obviously also omitted, as these cells are not
 * adjacent to each other on the grid.
 *
 * Wrap around indexes indexes on the opposite side of the grid when the
 * provided central index is in the leftmost or rightmost column.
 *
 * @param {number} index
 * @returns {number[]}
 */
declare function getAdjacentIndexes(index: number): number[];
/**
 *
 * @param {*} index
 * @returns {number}
 */
declare function getRow(index: any): number;
/**
 *
 * @param {*} index
 * @returns {number}
 */
declare function getColumn(index: any): number;
/**
 *
 * @param {*} index
 * @returns {number}
 */
declare function getBox(index: any): number;

/**
 *
 * @param {Adjacency} adjacency
 * @param {Grid} grid
 * @returns {Grid}
 */
declare function removeGridAdjacency(adjacency: Adjacency, grid: Grid): Grid;
/**
 *
 * @param {Adjacency} adjacency
 * @param {Grid} grid
 * @returns {Grid}
 */
declare function addGridAdjacency(adjacency: Adjacency, grid: Grid): Grid;
/**
 *
 * @param {Adjacency} adjacency
 * @param {Grid} grid
 * @returns {Grid}
 */
declare function requireGridAdjacency(adjacency: Adjacency, grid: Grid): Grid;
/**
 * Returns an adjacency object given either 2 (assumed adjacent) cell indexes,
 * or one adjacency id value. This allows the missing information to be inferred
 * in order to reconstruct the adjacency object with upper and lower cell
 * indexes, and adjacency id.
 *
 * @see Adjacency
 * @param {...number} args - Takes either 2 adjacency cell indexes (ranged from
 *      0 to 35), or 1 adjacency id value (range 0 to 84)
 * @returns {Adjacency}
 */
declare function getAdjacencyData(...args: number[]): Adjacency;

/**
 *
 * @param {number} index - Index of empty cell to be generated
 * @param {Random} random - Instance of seeded prng used throughout generation
 * @returns {GridCell}
 */
declare function generateEmptyCell(index: number, random: Random): GridCell;

/**
 *
 * @param {Random} random
 * @returns {Grid}
 */
declare function generateEmptyGrid(random: Random): Grid;
/**
 *
 * @param {Random} random
 * @returns {{grid:Grid, rawEntropy:number}}
 */
declare function generateGrid(random: Random): {
    grid: Grid;
    rawEntropy: number;
};

declare const PUZZLE_VERSION: "1.0.0";
type IMPOSTORI_GRADES = ImpostoriGrade;
declare namespace IMPOSTORI_GRADES {
    let beginner: ImpostoriGrade;
    let easy: ImpostoriGrade;
    let medium: ImpostoriGrade;
    let hard: ImpostoriGrade;
    let expert: ImpostoriGrade;
}
/**
 *
 * @param {number} [seed]
 * @returns {Impostori}
 */
declare function generateImpostori(seed?: number | undefined): Impostori;
/**
 *
 * @param {number} uniformEntropy
 * @returns {number}
 */
declare function getRating(uniformEntropy: number): number;
/**
 *
 * @param {number} rating
 * @returns {ImpostoriGrade}
 */
declare function getGradeString(rating: number): ImpostoriGrade;

/**
 *  - remove all adj from imposters (require the adjacency if grid invalid)
 *  - re add all adj unless that invalidates grid
 *  - remove all adj from workers (require the adjacency if grid invalid)
 *  - re add all adj (none will invalidate grid)
 *  - all optional adjacencies are now "genuinely" optional
 *  - divide all optional ids into either required or deleted  according to
 *      random dropout variable
 */
/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
declare function pruneGridAdjacencies(grid: Grid): Grid;

/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
declare function removeTwins(grid: Grid): Grid;

/**
 *
 * @param {Grid} grid
 * @returns {void}
 */
declare function printGrid(grid: Grid): void;

/**
 *
 * @param {Grid} grid
 * @param {number} index
 * @returns {GridCell}
 */
declare function fillCellHints(grid: Grid, index: number): GridCell;

/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
declare function fillGridHints(grid: Grid): Grid;

/**
 *
 * @param {GridCell} cell
 * @returns {GridCell}
 */
declare function resetCell(cell: GridCell, hard?: boolean): GridCell;
declare function softResetCell(cell: GridCell): GridCell;
declare function hardResetCell(cell: GridCell): GridCell;
/**
 *
 * @param {GridCell} cell
 * @returns {GridCell}
 */
declare function sortCell(cell: GridCell): GridCell;

/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
declare function resetGrid(grid: Grid, hard?: boolean): Grid;
declare function hardResetGrid(grid: Grid): Grid;
declare function softResetGrid(grid: Grid): Grid;
/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
declare function sortGrid(grid: Grid): Grid;

/**
 *
 * @param {Grid} grid
 */
declare function serializeAdjacencies(grid: Grid): BitBuffer;
/**
 *
 * @param {BitBuffer} buffer
 */
declare function deserializeAdjacencies(buffer: BitBuffer): {
    required: Set<any>;
    optional: Set<any>;
    deleted: Set<any>;
};

/**
 *
 * @param {GridCell} cell
 */
declare function serializeCell(cell: GridCell): BitBuffer;
/**
 *
 * @param {BitBuffer} buffer
 * @param {number} index
 * @returns {GridCell}
 */
declare function deserializeCell(buffer: BitBuffer, index: number): GridCell;

/**
 *
 * @param {Grid} grid
 * @returns {BitBuffer}
 */
declare function serializeGrid(grid: Grid): BitBuffer;
/**
 *
 * @param {BitBuffer} buffer
 * @param {number} seed
 * @returns {Grid}
 */
declare function deserializeGrid(buffer: BitBuffer, seed: number): Grid;

/**
 *
 * @param {Impostori} impostori
 */
declare function serializeImpostori(impostori: Impostori): string;
/**
 *
 * @param {string} serializedString
 */
declare function deserializeImpostori(serializedString: string): {
    rating: number;
    grade: ImpostoriGrade;
    serializedString: string;
    grid: Grid;
    seed: number;
    version: {
        puzzle: string;
        repository: string;
    };
    rawEntropy: number;
    normalizedEntropy: number;
    uniformEntropy: number;
};

/**
 *
 * @param {Grid} grid
 * @param {number} index
 * @returns {Grid[]}
 */
declare function solveCell(grid: Grid, index: number): Grid[];

/**
 *
 * @param {Grid} grid
 * @returns {{grids:Grid[], rawEntropy:number}}
 */
declare function solveGrid(grid: Grid): {
    grids: Grid[];
    rawEntropy: number;
};

type CELL_TYPES = CellType;
declare namespace CELL_TYPES {
    let detective: CellType;
    let worker: CellType;
    let imposter: CellType;
    let vacant: CellType;
}
/**
 *
 * @param {GridCell} cell
 * @param {CellType} type
 * @returns {GridCell}
 */
declare function fillCellType(cell: GridCell, type: CellType): GridCell;

/**
 *
 * @param {Grid} grid
 * @param {CellType} type
 * @param {?number} index
 */
declare function continuosTypeIndexes(grid: Grid, type: CellType, index?: number | null, any?: boolean): number[];
/**
 *
 * @param {Grid} grid
 * @param {CellType} type
 */
declare function allContinuosTypeIndexes(grid: Grid, type: CellType): number[][];

/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
declare function fillGridTypes(grid: Grid): Grid;

/**
 *
 * @param {GridCell} updatedCell
 * @param {Grid} grid
 * @returns {Grid}
 */
declare function propagateCellType(updatedCell: GridCell, grid: Grid): Grid;

/**
 *
 * @param {Grid} grid
 * @returns {boolean}
 */
declare function completedGridTypes(grid: Grid): boolean;
/**
 *
 * @param {Grid} grid
 * @returns {boolean}
 */
declare function validateGridTypes(grid: Grid): boolean;

/**
 *
 * @param {GridCell} cell
 * @returns {GridCell}
 */
declare function fillCellValue(cell: GridCell): GridCell;
/**
 *
 * @param {GridCell} cell
 * @returns {GridCell[]}
 */
declare function forkCellValue(cell: GridCell): GridCell[];

/**
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
declare function fillGridValues(grid: Grid): Grid;

/**
 *
 * @param {GridCell} updatedCell
 * @param {Grid} grid
 * @returns {Grid}
 */
declare function propagateCellValue(updatedCell: GridCell, grid: Grid): Grid;

/**
 *
 * @param {Grid} grid
 * @returns {boolean}
 */
declare function validateGridValues(grid: Grid): boolean;

export { CELL_TYPES, IMPOSTORI_GRADES, PUZZLE_VERSION, addCellAdjacency, addGridAdjacency, allContinuosTypeIndexes, completedGridTypes, continuosTypeIndexes, deserializeAdjacencies, deserializeCell, deserializeGrid, deserializeImpostori, fillCellHints, fillCellType, fillCellValue, fillGridHints, fillGridTypes, fillGridValues, forkCellValue, generateEmptyCell, generateEmptyGrid, generateGrid, generateImpostori, getAdjacencyData, getAdjacentIndexes, getBox, getColumn, getGradeString, getRating, getRow, hardResetCell, hardResetGrid, printGrid, propagateCellType, propagateCellValue, pruneGridAdjacencies, removeCellAdjacency, removeGridAdjacency, removeTwins, requireCellAdjacency, requireGridAdjacency, resetCell, resetGrid, serializeAdjacencies, serializeCell, serializeGrid, serializeImpostori, softResetCell, softResetGrid, solveCell, solveGrid, sortCell, sortGrid, validateGridTypes, validateGridValues };
