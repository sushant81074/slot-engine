export type GameMode = "Base" | "FreeSpins" | "Bonus";

export enum SymbolType {
    Standard = "Standard",
    Wild = "Wild",
    Scatter = "Scatter",
    Bonus = "Bonus",
}

export enum EvaluationType {
    Lines = "Lines",
    Ways = "Ways",
    Cluster = "Cluster"
}

export interface SymbolRegistry {
    [symbolId: string]: {
        id: string;
        name: string;
        type: SymbolType;
        payouts: Record<string, number>;
        substitutesFor?: string[];
        allowedReels?: number[];
        isSticky?: boolean;
    };
}

export type TPaylines = Record<GameMode, Record<string, number[][]>>

export interface EngineConfig {
    dimensions: {
        rows: number;
        cols: number;
    };
    evaluation: EvaluationType;
    paylines: TPaylines;
    reelStrips: Record<GameMode, string[][]>;
    paylineRules?: {
        directions: ("LTR" | "RTL")[];
        minMatch: number;
        wildCanStart: boolean;
    };
    scatterRules?: {
        payAnywhere: boolean;
        multiplyByBet: boolean;
        triggersFeatures?: boolean;
    };
    multiplierRules?: {
        scope: "per_win" | "per_spin" | "global";
        appliesTo: ("lines" | "scatter" | "bonus")[];
        stackable: boolean;
    };
    limits?: {
        maxWinMultiplier: number;
    };
    rng?: {
        type: "server" | "provably_fair";
    };

}

export interface FeatureRegistry {
    holdAndWin?: {
        triggerSymbolId: string;
        minTriggerCount: number;
        resetSpins: number;
        jackpots: Record<string, { multiplier: number; type: "fixed" | "full_grid" }>;
    };
    freeSpins?: {
        triggerSymbolId: string;
        triggerMap: Record<string, number>;
        multiplierLogic?: "sticky_wilds" | "global_increment";
    };
    bonusBuy?: Record<string, {
        costMultiplier: number;
        guaranteedSymbols?: Array<{ id: string; count: number }>;
    }>;
}

export interface SpinResult {
    spinId: string;
    grid: string[][];
    wins: {
        totalWin: number;
        lineWins: Array<{
            lineId: string;
            symbolId: string;
            count: number;
            amount: number;
        }>;
        scatterWins: Array<{
            symbolId: string;
            count: number;
            amount: number;
        }>;
    };
    nextState: "BaseGame" | "FreeSpins" | "BonusGame";
    stateData?: {
        remainingSpins: number;
        currentMultiplier: number;
        lockedPositions?: Array<{ r: number; c: number; value?: number }>;
    };
}

export interface SlotGameManifest {
    gameId: string;
    version: string;
    symbols: SymbolRegistry;
    engine: EngineConfig;
    features: FeatureRegistry;
    betSettings: {
        minBet: number;
        maxBet: number;
        denominations: number[];
    };
}