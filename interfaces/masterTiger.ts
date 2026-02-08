export type GameMode = "BASE" | "FREE_SPINS" | "BONUS";
export type SymbolCategory = "NORMAL" | "WILD" | "SCATTER" | "SPECIAL";
export type PayoutMechanism = "LINES" | "WAYS" | "CLUSTER";
export type Paylines = Record<GameMode, Record<string, number[][] | "USE_WAYS_MECHANISM">>

export interface SlotConfig {
    slotId: string;
    version: string;
    grid: GridConfig;
    engine: EngineConfig;
    symbols: Record<string, SymbolConfig>;
    modes: Record<GameMode, GameModeConfig>;
    buyBonus?: BuyBonusConfig;
}

export interface EngineConfig {
    mechanism: PayoutMechanism;
    waysToWin?: number; // e.g., 243
    maxPayoutMultiplier: number;
    maxPayoutValue: number;
    paylines: Paylines;
}

export interface SymbolConfig {
    id: string;
    category: SymbolCategory;
    substitutesFor?: "ALL" | "ALL_EXCEPT_SCATTER" | string[];
    payouts: Record<number, number>; // count: multiplier
    behavior?: SymbolBehavior;
}

export interface SymbolBehavior {
    transformOnLand?: {
        targetPool: string[]; // For Mystery symbols
        modeRestriction?: GameMode[];
    };
    onLandEvents?: Array<{
        event: "MULTIPLIER_ADD" | "EXTRA_SPINS" | "TRIGGER_FEATURE";
        value: number;
    }>;
}

export interface GameModeConfig {
    reelStrips: string[][]; // Array of arrays (one per reel)
    multiplier?: {
        startValue: number;
        resetOnSpin: boolean;
    };
    features: FeatureConfig[];
}

export interface FeatureConfig {
    name: string;
    trigger: {
        type: "SCATTER_COUNT" | "SYMBOL_COMBINATION" | "RANDOM";
        symbolId?: string;
        thresholds: Record<number, FeatureReward>; // e.g., {3: 6 spins, 4: 10 spins}
    };
}

export interface FeatureReward {
    type: "FREE_SPINS" | "MULTIPLIER_BOOST" | "CASH_PRIZE";
    value: number;
}

export interface BuyBonusConfig {
    enabled: boolean;
    options: Array<{
        id: string;
        costMultiplier: number;
        targetMode: GameMode;
        maxPurchaseQuantity: number;
    }>;
}

export interface GridConfig {
    columns: number;
    rows: number;
}

export type ElementPosition = { row: number, column: number }
export type Winnings = Record<string, ElementPosition[][]>