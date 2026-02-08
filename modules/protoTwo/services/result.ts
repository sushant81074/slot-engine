import { SLOT_GAME_MANIFEST } from "../../../constants/protoTwo";

const config = SLOT_GAME_MANIFEST;

export const protoTwo = () => {
    const generateReels = (row: number, col: number): string[][] => {
        return Array.from({ length: col }, () => Array.from({ length: row }, () => {
            const symbols = Object.keys(config.symbols);
            const symbolIdx = Math.floor(Math.random() * symbols.length);
            return symbols[symbolIdx];
        }));
    }

    const examinePaylines = (reels: string[][]) => {
        const symbols = [...new Set(reels.flat(2))]

        const base = config.engine.paylines.Base;
        const wild = Object.keys(config.symbols).find(e => config.symbols[e].id == "WILD" || config.symbols[e].name == "WILD") || "";

        const res: any = {};

        symbols.forEach(s => {
            for (const [key, value] of Object.entries(base)) {
                const count = value.map(([x, y]) =>
                    (reels?.[x]?.[y] == s || reels?.[x]?.[y] == wild) ? true : false
                ).filter(Boolean).length

                if (!res[s] && count >= 3) res[s] = { [key]: count };
            }

        });
        console.log(res);

        return res;
    };

    const reels = generateReels(config.engine.dimensions.cols, config.engine.dimensions.rows);
    const paylines = examinePaylines(reels)
}

