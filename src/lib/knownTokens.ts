export interface KnownToken {
    name: string;
    symbol: string;
    score: number;
    description: string;
    price: number; // Mock price in USD
}

export const FAMOUS_TOKENS: Record<string, KnownToken> = {
    // USDT
    "0xdac17f958d2ee523a2206206994597c13d831ec7": {
        name: "Tether USD",
        symbol: "USDT",
        score: 99,
        description: "Official Tether USD smart contract. Verified and audited.",
        price: 1.00
    },
    // USDC
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
        name: "USD Coin",
        symbol: "USDC",
        score: 99,
        description: "Official Circle USDC smart contract. Verified and audited.",
        price: 1.00
    },
    // DAI
    "0x6b175474e89094c44da98b954eedeac495271d0f": {
        name: "Dai Stablecoin",
        symbol: "DAI",
        score: 98,
        description: "Official MakerDAO DAI smart contract. Decentralized and Verified.",
        price: 1.00
    },
    // WETH
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
        name: "Wrapped Ether",
        symbol: "WETH",
        score: 100,
        description: "Canonical Wrapped Ether contract. Fundamental DeFi infrastructure.",
        price: 2650.00
    },
    // UNI
    "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984": {
        name: "Uniswap",
        symbol: "UNI",
        score: 98,
        description: "Official Uniswap Governance Token.",
        price: 7.50
    },
    // LINK
    "0x514910771af9ca656af840dff83e8264ecf986ca": {
        name: "Chainlink",
        symbol: "LINK",
        score: 98,
        description: "Official Chainlink Token contract.",
        price: 18.20
    },
    // SHIB
    "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce": {
        name: "Shiba Inu",
        symbol: "SHIB",
        score: 90,
        description: "Official Shiba Inu token contract.",
        price: 0.000025
    },
    // PEPE
    "0x6982508145454ce325ddbe47a25d4ec3d2311933": {
        name: "Pepe",
        symbol: "PEPE",
        score: 85,
        description: "Official Pepe token contract.",
        price: 0.000001
    }
};
