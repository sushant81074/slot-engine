import type { GameMode, GameModeConfig, GridConfig, Paylines, PayoutTable, SlotConfig, SpecialRulesConfig, SymbolBehaviorConfig, SymbolConfig, SymbolPayouts } from "../interfaces/protoOne";

const GRID_ID: GridConfig = {
    columns: 5,
    rows: 3
}



const PAY_LINES: Paylines = {
    BASE: {
        1: [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]],
        2: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
        3: [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
        4: [[0, 0], [1, 1], [2, 2], [3, 1], [4, 0]],
        5: [[0, 2], [1, 1], [2, 0], [3, 1], [4, 2]],
        6: [[0, 0], [1, 0], [2, 1], [3, 0], [4, 0]],
        7: [[0, 2], [1, 2], [2, 1], [3, 2], [4, 2]],
        8: [[0, 1], [1, 0], [2, 1], [3, 2], [4, 1]],
        9: [[0, 1], [1, 2], [2, 1], [3, 0], [4, 1]],
        10: [[0, 0], [1, 1], [2, 1], [3, 1], [4, 0]]
    },
    FREE_SPINS: {},
    BONUS: {}
}

const A_PAYOUTS: SymbolPayouts = { 3: 0.2, 4: 0.5, 5: 1 };
const K_PAYOUTS: SymbolPayouts = { 3: 0.2, 4: 0.6, 5: 1.2 };
const Q_PAYOUTS: SymbolPayouts = { 3: 0.3, 4: 0.8, 5: 1.5 };
const J_PAYOUTS: SymbolPayouts = { 3: 0.3, 4: 0.9, 5: 1.6 };
const FEATHERS_PAYOUTS: SymbolPayouts = { 3: 0.5, 4: 1.5, 5: 3 };
const SNAKE_PAYOUTS: SymbolPayouts = { 3: 0.7, 4: 2, 5: 4 };
const WINGS_PAYOUTS: SymbolPayouts = { 3: 1, 4: 3, 5: 6 };
const EAGLE_PAYOUTS: SymbolPayouts = { 3: 2, 4: 6, 5: 12 };
const MOUNT_PAYOUTS: SymbolPayouts = { 3: 2, 4: 5, 5: 10 };
const GOLD_EAGLE_PAYOUTS: SymbolPayouts = { 3: 5, 4: 15, 5: 50 };

const NO_BEHAVIOUR: SymbolBehaviorConfig = {}
const MOUNT_BEHAVIOUR: SymbolBehaviorConfig = {}
const GOLD_EAGLE_BEHAVIOUR: SymbolBehaviorConfig = {
    multiplier: {
        initialValues: [2, 3, 5],
        contributesToLineWin: {
            onlyIfAbove: 1,
        },
        increaseRules: {
            SCATTER_LAND: { incrementBy: 1 },
            FREE_SPIN_START: { incrementBy: 0 },
            FREE_SPIN_END: { incrementBy: 0 },
        },

    },
    sticky: {
        enabledInModes: {
            BASE: true,
            FREE_SPINS: true,
            BONUS: true,
        },
        persistsBetweenSpins: true,
    },
};

const SYMBOLS: Record<string, SymbolConfig> = {
    "A": {
        id: "1",
        category: "NORMAL",
        payouts: A_PAYOUTS,
        behavior: NO_BEHAVIOUR,
    },
    "K": {
        id: "2",
        category: "NORMAL",
        payouts: K_PAYOUTS,
        behavior: NO_BEHAVIOUR,
    },
    "J": {
        id: "3",
        category: "NORMAL",
        payouts: J_PAYOUTS,
        behavior: NO_BEHAVIOUR,
    },
    "Q ": {
        id: "4",
        category: "NORMAL",
        payouts: Q_PAYOUTS,
        behavior: NO_BEHAVIOUR,
    },
    "EAGLE": {
        id: "5",
        category: "NORMAL",
        payouts: EAGLE_PAYOUTS,
        behavior: NO_BEHAVIOUR,
    },
    "WINGS": {
        id: "6",
        category: "NORMAL",
        payouts: WINGS_PAYOUTS,
        behavior: NO_BEHAVIOUR,
    },
    "SNAKE": {
        id: "7",
        category: "NORMAL",
        payouts: SNAKE_PAYOUTS,
        behavior: NO_BEHAVIOUR,
    },
    "FEATHERS": {
        id: "8",
        category: "NORMAL",
        payouts: FEATHERS_PAYOUTS,
        behavior: NO_BEHAVIOUR,
    },
    "MOUNT": {
        id: "9",
        category: "WILD",
        substitutesFor: "ALL_EXCEPT_SCATTER",
        payouts: MOUNT_PAYOUTS,
        behavior: MOUNT_BEHAVIOUR,
    },
    "GOLD_EAGLE": {
        id: "10",
        category: "WILD",
        substitutesFor: "ALL",
        payouts: GOLD_EAGLE_PAYOUTS,
        behavior: GOLD_EAGLE_BEHAVIOUR,
    }
}

const MODES: Record<GameMode, GameModeConfig> = {
    BASE: {
        reelStrips: {
            0: {
                reelIndex: 0,
                symbols: ["A", "K", "Q", "EAGLE", "J", "A", "SCATTER"],
            },
            1: {
                reelIndex: 1,
                symbols: ["K", "Q", "EAGLE", "A", "J", "K"],
            },
            2: {
                reelIndex: 2,
                symbols: ["Q", "EAGLE", "A", "K", "SCATTER"],
            },
            3: {
                reelIndex: 3,
                symbols: ["A", "K", "Q", "J", "EAGLE"],
            },
            4: {
                reelIndex: 4,
                symbols: ["K", "Q", "A", "EAGLE", "SCATTER"],
            },
        },

        availableSymbols: {
            A: true,
            K: true,
            Q: true,
            J: true,
            EAGLE: true,
            SCATTER: true,
        },

        features: {
            FREE_SPINS_TRIGGER: {
                trigger: {
                    type: "SCATTER_COUNT",
                    symbolId: "SCATTER",
                    countToReward: {
                        3: { type: "FREE_SPINS", spins: 10 },
                        4: { type: "FREE_SPINS", spins: 15 },
                        5: { type: "FREE_SPINS", spins: 25 },
                    },
                },
                reward: { type: "FREE_SPINS", spins: 10 }, // fallback (engine-safe)
            },
        },

        spinRules: {
            BASE_SPIN_ALLOWED: {
                id: "BASE_SPIN_ALLOWED",
                enabledInModes: {
                    BASE: true,
                    FREE_SPINS: false,
                    BONUS: false
                },
            },
        },
    },

    FREE_SPINS: {
        reelStrips: {
            0: {
                reelIndex: 0,
                symbols: ["A", "K", "Q", "EAGLE", "EAGLE"],
            },
            1: {
                reelIndex: 1,
                symbols: ["K", "Q", "EAGLE", "A", "EAGLE"],
            },
            2: {
                reelIndex: 2,
                symbols: ["Q", "EAGLE", "A", "K"],
            },
            3: {
                reelIndex: 3,
                symbols: ["A", "K", "Q", "EAGLE"],
            },
            4: {
                reelIndex: 4,
                symbols: ["K", "Q", "A", "EAGLE"],
            },
        },

        availableSymbols: {
            A: true,
            K: true,
            Q: true,
            EAGLE: true,
        },

        features: {
            FREE_SPIN_RETRIGGER: {
                trigger: {
                    type: "SCATTER_COUNT",
                    symbolId: "SCATTER",
                    countToReward: {
                        3: {
                            type: "RETRIGGER_FREE_SPINS",
                            spins: 5,
                            emitEvent: "FREE_SPIN_START",
                        },
                    },
                },
                reward: {
                    type: "RETRIGGER_FREE_SPINS",
                    spins: 5,
                },
            },
        },

        spinRules: {
            FREE_SPIN_ONLY: {
                id: "FREE_SPIN_ONLY",
                enabledInModes: {
                    FREE_SPINS: true,
                    BASE: false,
                    BONUS: false
                },
            },
        },
    },

    BONUS: {
        reelStrips: {
            0: {
                reelIndex: 0,
                symbols: ["EAGLE", "EAGLE", "A"],
            },
            1: {
                reelIndex: 1,
                symbols: ["EAGLE", "K", "Q"],
            },
            2: {
                reelIndex: 2,
                symbols: ["EAGLE", "A", "K"],
            },
            3: {
                reelIndex: 3,
                symbols: ["EAGLE", "Q", "A"],
            },
            4: {
                reelIndex: 4,
                symbols: ["EAGLE", "K", "A"],
            },
        },

        availableSymbols: {
            A: true,
            K: true,
            Q: true,
            EAGLE: true,
        },

        spinRules: {
            BONUS_ONLY: {
                id: "BONUS_ONLY",
                enabledInModes: {
                    BONUS: true,
                    BASE: false,
                    FREE_SPINS: false
                },
            },
        },
    },
};


const PAYOUTS: PayoutTable = {
    A_PAYOUTS,
    J_PAYOUTS,
    K_PAYOUTS,
    Q_PAYOUTS,
    EAGLE_PAYOUTS,
    WINGS_PAYOUTS,
    SNAKE_PAYOUTS,
    FEATHERS_PAYOUTS,
    MOUNT_PAYOUTS,
    GOLD_EAGLE_PAYOUTS
}

const SPECIAL_RULES: SpecialRulesConfig = {
    wildFiveOfKindPaysAs: "HIGHEST_SYMBOL"
}

export const ENGINE_CONFIG: SlotConfig = {
    slotId: "1",
    version: "0.0.1",
    grId: GRID_ID,
    paylines: PAY_LINES,
    symbols: SYMBOLS,
    modes: MODES,
    payouts: PAYOUTS,
    specialRules: SPECIAL_RULES
}
