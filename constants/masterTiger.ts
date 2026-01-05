import type { SlotConfig } from "../interfaces/masterTiger";

export const MasterTigerConfig: SlotConfig = {
    slotId: "master_tiger_v1",
    version: "1.0.0",
    grid: { columns: 5, rows: 3 },
    engine: {
        mechanism: "WAYS",
        waysToWin: 243,
        maxPayoutMultiplier: 2500,
        maxPayoutValue: 1500000,
        paylines: {
            BASE: { "ALL": "USE_WAYS_MECHANISM" },
            FREE_SPINS: { "ALL": "USE_WAYS_MECHANISM" },
            BONUS: { "ALL": "USE_WAYS_MECHANISM" }
        }
    },
    symbols: {
        "WILD": {
            id: "WILD",
            category: "WILD",
            substitutesFor: ["COIN", "FAN", "POT", "SCROLL", "A", "K", "Q", "J"],
            payouts: {}
        },
        "SCATTER": {
            id: "SCATTER",
            category: "SCATTER",
            payouts: {}
        },
        "MYSTERY": {
            id: "MYSTERY",
            category: "SPECIAL",
            payouts: {},
            behavior: {
                transformOnLand: {
                    targetPool: ["BOOST_MULT_3", "BOOST_SPIN_1"],
                    modeRestriction: ["FREE_SPINS"]
                }
            }
        },
        "BOOST_MULT_3": {
            id: "BOOST_MULT_3",
            category: "SPECIAL",
            payouts: {},
            behavior: { onLandEvents: [{ event: "MULTIPLIER_ADD", value: 3 }] }
        },
        "BOOST_SPIN_1": {
            id: "BOOST_SPIN_1",
            category: "SPECIAL",
            payouts: {},
            behavior: { onLandEvents: [{ event: "EXTRA_SPINS", value: 1 }] }
        },
        "COIN": { id: "COIN", category: "NORMAL", payouts: { 3: 3, 4: 9, 5: 30 } },
        "FAN": { id: "FAN", category: "NORMAL", payouts: { 3: 2.4, 4: 4.8, 5: 12 } },
        "POT": { id: "POT", category: "NORMAL", payouts: { 3: 1.8, 4: 3.6, 5: 10.5 } },
        "SCROLL": { id: "SCROLL", category: "NORMAL", payouts: { 3: 1.5, 4: 2.4, 5: 7.5 } },
        "A": { id: "A", category: "NORMAL", payouts: { 3: 0.6, 4: 1.2, 5: 6 } },
        "K": { id: "K", category: "NORMAL", payouts: { 3: 0.3, 4: 0.9, 5: 5.4 } },
        "Q": { id: "Q", category: "NORMAL", payouts: { 3: 0.3, 4: 0.6, 5: 4.8 } },
        "J": { id: "J", category: "NORMAL", payouts: { 3: 0.3, 4: 0.6, 5: 4.2 } }
    },
    modes: {
        "BASE": {
            reelStrips: [ /* Define per math */],
            features: [{
                name: "FREE_GAME_TRIGGER",
                trigger: {
                    type: "SCATTER_COUNT",
                    symbolId: "SCATTER",
                    thresholds: {
                        3: { type: "FREE_SPINS", value: 6 },
                        4: { type: "FREE_SPINS", value: 10 },
                        5: { type: "FREE_SPINS", value: 15 }
                    }
                }
            }]
        },
        "FREE_SPINS": {
            reelStrips: [ /* Define per math */],
            multiplier: { startValue: 3, resetOnSpin: false },
            features: [{
                name: "RETRIGGER",
                trigger: {
                    type: "SCATTER_COUNT",
                    symbolId: "SCATTER",
                    thresholds: {
                        3: { type: "FREE_SPINS", value: 6 },
                        4: { type: "FREE_SPINS", value: 10 },
                        5: { type: "FREE_SPINS", value: 15 }
                    }
                }
            }]
        },
        BONUS: {
            reelStrips: [],
            features: []
        }
    },
    buyBonus: {
        enabled: true,
        options: [{
            id: "BUY_FREE_GAMES",
            costMultiplier: 40.5,
            targetMode: "FREE_SPINS",
            maxPurchaseQuantity: 99
        }]
    }
};