import { MasterTigerConfig } from "../../../constants/masterTiger";
import type { ElementPosition, Winnings } from "../../../interfaces/masterTiger";

const getSymbols = (symbols: string[], count: number) =>
  Array.from(
    { length: count },
    () => symbols[Math.floor(Math.random() * symbols.length)],
  );


const verticalToHorizontal = (reels: string[][], row: number, column: number) => {
  const newReels: string[][] = [];
  for (let i = 0; i < row; i++) {
    if (!Array.isArray(newReels[i])) newReels[i] = [];
    for (let j = 0; j < column; j++) {
      newReels[i].push(reels[j][i]);
    }
  }
  return newReels;
};

export const generateReels = () => {
  const config = MasterTigerConfig;
  const symbols = Object.keys(config.symbols);
  let reels: string[][] = [];
  for (let i = 0; i < config.grid.columns; i++) {
    reels.push(getSymbols(symbols, config.grid.columns));
  }
  reels = verticalToHorizontal(reels, config.grid.rows, config.grid.columns);
  return reels;
};

export const examinePatternWithWays = (reels: string[][]) => {
  reels = generateReels();
  const elementCoordinates: Record<string, ElementPosition[]> = {};
  reels.forEach((arr, i) => {
    arr.forEach((e, j) => {
      if (e == "_") return;
      if (!Array.isArray(elementCoordinates[e])) elementCoordinates[e] = [];
      elementCoordinates[e].push({ row: i, column: j });
    });
  });

  const winnings: Winnings = {};

  for (const [key, value] of Object.entries(elementCoordinates)) {

    if (value.length < 3) continue;
    const byColumn: Record<number, ElementPosition[]> = {};

    value.forEach((e) => {
      if (!Array.isArray(byColumn[e.column])) byColumn[e.column] = [];
      byColumn[e.column].push(e);
    });

    const columns: number[] = [];
    let c = 0;
    while (byColumn[c]) {
      columns.push(c);
      c++;
    }
    if (columns.length < 3) continue;

    let pathCount = 1;
    columns.forEach((col) => {
      pathCount = Math.max(pathCount, byColumn[col].length);
    });

    const paths: ElementPosition[][] = Array.from({ length: pathCount }, () => []);

    columns.forEach((col) => {
      const items = byColumn[col];
      for (let i = 0; i < pathCount; i++) {
        paths[i].push(items[i % items.length]);
      }
    });

    winnings[key] = paths;
  }
  return examineWinnings(winnings);
};

export const examineWinnings = (winnings: Winnings) => {
  const config = MasterTigerConfig;
  const paylines: Record<string, { count: number, mult: number }[]> = {};
  for (const [k, v] of Object.entries(winnings)) {
    paylines[k] = v.map(c => ({
      count: c.length,
      mult: config.symbols[k].payouts[c.length]
    }));
  }
  let winMult = 0;
  Object.keys(paylines).forEach(k => {
    const arr = paylines[k];
    arr.forEach(c => winMult += typeof c.mult == "number" ? c.mult : 0);
  })
  return { paylines, winMult };
};

