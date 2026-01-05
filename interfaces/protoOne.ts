export type GameMode = "BASE" | "FREE_SPINS" | "BONUS";

export type SymbolCategory = "NORMAL" | "WILD" | "SCATTER";

export interface SlotConfig {
    slotId: string;
    version: string;
    grId: GridConfig;
    paylines: Record<number, Paylines>;
    symbols: Record<string, SymbolConfig>;
    modes: Record<GameMode, GameModeConfig>;
    payouts: PayoutTable;
    specialRules?: SpecialRulesConfig;
}

export interface GridConfig {
    columns: number;
    rows: number;
}

export type Paylines = Record<GameMode, Record<string, number[][]>>

export interface SymbolConfig {
    id: string;
    category: SymbolCategory;
    substitutesFor?: "ALL" | "ALL_EXCEPT_SCATTER" | string[];
    payouts: SymbolPayouts;
    behavior?: SymbolBehaviorConfig;
}

export type SymbolPayouts = Record<number, number>;

export interface SymbolBehaviorConfig {
    sticky?: StickyBehaviorConfig;
    multiplier?: MultiplierBehaviorConfig;
    events?: SymbolEventBehaviorConfig;
}

export interface StickyBehaviorConfig {
    enabledInModes: Record<GameMode, true>;
    persistsBetweenSpins: boolean;
}

export interface MultiplierBehaviorConfig {
    initialValues: number[]; // RANDOM PICK
    contributesToLineWin: {
        onlyIfAbove: number;
    };
    increaseRules?: Record<GameEvent, MultiplierIncreaseRule>;
}

export interface MultiplierIncreaseRule {
    incrementBy: number;
}

export type GameEvent =
    | "SCATTER_LAND"
    | "FREE_SPIN_START"
    | "FREE_SPIN_END";

export interface SymbolEventBehaviorConfig {
    on: GameEvent;
    action: SymbolEventAction;
}

export type SymbolEventAction =
    | { type: "INCREASE_MULTIPLIER"; amount: number }
    | { type: "ADD_FREE_SPINS"; amount: number };

export interface GameModeConfig {
    reelStrips: Record<number, ReelStripConfig>;
    availableSymbols?: Record<string, true>;
    features?: Record<string, FeatureConfig>;
    spinRules?: Record<string, SpinRuleConfig>;
}

export interface ReelStripConfig {
    reelIndex: number;
    symbols: string[]; // ORDER MATTERS
}

export interface FeatureConfig {
    trigger: FeatureTriggerConfig;
    reward: FeatureRewardConfig;
}

export interface FeatureTriggerConfig {
    type: "SCATTER_COUNT";
    symbolId: string;
    countToReward: Record<number, FeatureRewardConfig>;
}

export type FeatureRewardConfig =
    | { type: "FREE_SPINS"; spins: number }
    | { type: "RETRIGGER_FREE_SPINS"; spins: number; emitEvent?: GameEvent };

export interface SpinRuleConfig {
    id: string;
    enabledInModes: Record<GameMode, boolean>;
}

export type PayoutTable = Record<string, SymbolPayouts>;

export interface SpecialRulesConfig {
    wildFiveOfKindPaysAs: "HIGHEST_SYMBOL" | string;
}

export interface GridCellState {
    symbolId: string;
    isWild: boolean;
    isScatter: boolean;
    sticky: boolean;
    locked: boolean;
    multiplier: number;
}