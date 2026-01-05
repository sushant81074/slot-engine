import { MasterTigerConfig } from "../../../constants/masterTiger";
import type { ElementPosition } from "../../../interfaces/masterTiger";


const getSymbols = (symbols: string[], count: number) => Array.from({ length: count }, () => symbols[Math.floor(Math.random() * symbols.length)]);

export const generateReels = () => {
    const config = MasterTigerConfig;
    const symbols = Object.keys(config.symbols);
    let reels: string[][] = [];
    for (let i = 0; i < config.grid.columns; i++) {
        reels.push(getSymbols(symbols, config.grid.columns));
    }
    reels = verticalToHorizontal(reels, config.grid.rows, config.grid.columns)
    return reels;
}

const verticalToHorizontal = (reels: string[][], row: number, column: number) => {
    const newReels: string[][] = [];
    for (let i = 0; i < row; i++) {
        if (!Array.isArray(newReels[i])) newReels[i] = [];
        for (let j = 0; j < column; j++) {
            newReels[i].push(reels[j][i])
        }
    }
    return newReels
}

export const examinePatternWithWays0 = (reels: string[][]) => {
    reels = [
        ["_", "K", "_", "_", "K"],   // row 0
        ["K", "_", "K", "_", "_"],   // row 1
        ["_", "K", "_", "_", "_"]    // row 2
    ]
    const elementCoordinates: Record<string, ElementPosition[]> = {}
    //  {
    //     MYSTERY: [
    //         {
    //             row: 0,
    //             column: 4,
    //         }, {
    //             row: 1,
    //             column: 2,
    //         }, {
    //             row: 2,
    //             column: 2,
    //         }, {
    //             row: 2,
    //             column: 4,
    //         }
    //     ],
    // }
    reels.forEach((arr, i) => {
        arr.forEach((e, j) => {
            if (!Array.isArray(elementCoordinates[e])) elementCoordinates[e] = [];
            elementCoordinates[e].push({ row: i, column: j })
        })
    })


    console.log(elementCoordinates);
    const winnings: Record<string, number[][]> = {};
    for (const [key, value] of Object.entries(elementCoordinates)) {
        if (value.length < 3) continue;

        value.forEach(e => {

        })

    }

}

export const examinePatternWithWays1 = (reels: string[][]) => {
    const elementCoordinates: Record<string, ElementPosition[]> = {};

    // 1️⃣ Collect coordinates
    reels.forEach((rowArr, row) => {
        rowArr.forEach((symbol, column) => {
            if (!elementCoordinates[symbol]) {
                elementCoordinates[symbol] = [];
            }
            elementCoordinates[symbol].push({ row, column });
        });
    });

    const winnings: Record<string, ElementPosition[][]> = {};

    // 2️⃣ Process each symbol
    for (const [symbol, positions] of Object.entries(elementCoordinates)) {
        if (positions.length < 3) continue;

        // ---- group by column ----
        const byColumn: Record<number, ElementPosition[]> = {};
        positions.forEach(p => {
            if (!byColumn[p.column]) byColumn[p.column] = [];
            byColumn[p.column].push(p);
        });

        // ---- find continuous columns starting from 0 ----
        const columns: number[] = [];
        let c = 0;
        while (byColumn[c]) {
            columns.push(c);
            c++;
        }

        // must have at least 3 columns for a valid way
        if (columns.length < 3) continue;

        // ---- find how many paths are needed ----
        let pathCount = 1;
        columns.forEach(col => {
            pathCount = Math.max(pathCount, byColumn[col].length);
        });

        // ---- build paths ----
        const paths: ElementPosition[][] =
            Array.from({ length: pathCount }, () => []);

        columns.forEach(col => {
            const items = byColumn[col];
            for (let i = 0; i < pathCount; i++) {
                paths[i].push(items[i % items.length]);
            }
        });

        winnings[symbol] = paths;
    }

    console.log("WAYS RESULT:", winnings);
    return winnings;
};


export const examineWinnings = () => { }
