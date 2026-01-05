import {
    EvaluationType,
    SymbolType,
    type EngineConfig,
    type FeatureRegistry,
    type SlotGameManifest,
    type SymbolRegistry
} from "../interfaces/protoTwo";

export const SYMBOLS: SymbolRegistry = {
    EAGLE: {
        id: "EAGLE",
        name: "Eagle",
        type: SymbolType.Standard,
        payouts: {
            "3": 2,
            "4": 5,
            "5": 100
        }
    },

    SUN_BIRD: {
        id: "SUN_BIRD",
        name: "Sun Bird",
        type: SymbolType.Standard,
        payouts: {
            "3": 1.5,
            "4": 4,
            "5": 50
        }
    },

    SNAKE: {
        id: "SNAKE",
        name: "Snake",
        type: SymbolType.Standard,
        payouts: {
            "3": 1,
            "4": 2.5,
            "5": 25
        }
    },

    FEATHER: {
        id: "FEATHER",
        name: "Feather",
        type: SymbolType.Standard,
        payouts: {
            "3": 1,
            "4": 2.5,
            "5": 25
        }
    },

    A: {
        id: "A",
        name: "A",
        type: SymbolType.Standard,
        payouts: {
            "3": 0.5,
            "4": 1.5,
            "5": 10
        }
    },

    K: {
        id: "K",
        name: "K",
        type: SymbolType.Standard,
        payouts: {
            "3": 0.5,
            "4": 1.5,
            "5": 10
        }
    },

    Q: {
        id: "Q",
        name: "Q",
        type: SymbolType.Standard,
        payouts: {
            "3": 0.5,
            "4": 1.5,
            "5": 10
        }
    },

    J: {
        id: "J",
        name: "J",
        type: SymbolType.Standard,
        payouts: {
            "3": 0.5,
            "4": 1.5,
            "5": 10
        }
    },

    WILD: {
        id: "WILD",
        name: "Wild",
        type: SymbolType.Wild,
        payouts: {},
        substitutesFor: [
            "EAGLE",
            "SUN_BIRD",
            "SNAKE",
            "FEATHER",
            "A",
            "K",
            "Q",
            "J"
        ],
        allowedReels: [2, 3, 4, 5],
        isSticky: true
    },

    BONUS: {
        id: "BONUS",
        name: "Bonus Coin",
        type: SymbolType.Bonus,
        payouts: {}
    }
};

export const ENGINE_CONFIG: EngineConfig = {
    dimensions: {
        rows: 3,
        cols: 5
    },

    evaluation: EvaluationType.Lines,

    paylines: {
        Base: {
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
        FreeSpins: {},
        Bonus: {}
    },


    reelStrips: {
        Base: [
            ["A", "K", "Q", "J", "FEATHER", "SNAKE", "SUN_BIRD", "EAGLE", "BONUS"],
            ["A", "K", "Q", "J", "FEATHER", "SNAKE", "SUN_BIRD", "EAGLE", "WILD", "BONUS"],
            ["A", "K", "Q", "J", "FEATHER", "SNAKE", "SUN_BIRD", "EAGLE", "WILD", "BONUS"],
            ["A", "K", "Q", "J", "FEATHER", "SNAKE", "SUN_BIRD", "EAGLE", "WILD", "BONUS"],
            ["A", "K", "Q", "J", "FEATHER", "SNAKE", "SUN_BIRD", "EAGLE", "BONUS"]
        ],

        Bonus: [
            ["BONUS", ""],
            ["BONUS", ""],
            ["BONUS", ""],
            ["BONUS", ""],
            ["BONUS", ""]
        ],

        FreeSpins: [
            ["A", "K", "Q", "J", "FEATHER", "SNAKE", "SUN_BIRD", "EAGLE", "BONUS"],
            ["A", "K", "Q", "J", "FEATHER", "SNAKE", "SUN_BIRD", "EAGLE", "WILD", "BONUS"],
            ["A", "K", "Q", "J", "FEATHER", "SNAKE", "SUN_BIRD", "EAGLE", "WILD", "BONUS"],
            ["A", "K", "Q", "J", "FEATHER", "SNAKE", "SUN_BIRD", "EAGLE", "WILD", "BONUS"],
            ["A", "K", "Q", "J", "FEATHER", "SNAKE", "SUN_BIRD", "EAGLE", "BONUS"]
        ]
    }

};

export const FEATURES: FeatureRegistry = {
    holdAndWin: {
        triggerSymbolId: "BONUS",
        minTriggerCount: 6,
        resetSpins: 3,
        jackpots: {
            MINI: { multiplier: 25, type: "fixed" },
            MAJOR: { multiplier: 100, type: "fixed" },
            GRAND: { multiplier: 1000, type: "full_grid" }
        }
    },

    bonusBuy: {
        BONUS_GAME: {
            costMultiplier: 32,
            guaranteedSymbols: [
                { id: "BONUS", count: 6 }
            ]
        }
    }
};

export const SLOT_GAME_MANIFEST: SlotGameManifest = {
    gameId: "young_eagle_song",
    version: "1.0.0",

    symbols: SYMBOLS,
    engine: ENGINE_CONFIG,
    features: FEATURES,

    betSettings: {
        minBet: 0.1,
        maxBet: 100,
        denominations: [0.1, 0.2, 0.5, 1, 2, 5, 10]
    }
};
