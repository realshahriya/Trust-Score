// Simple in-memory cache to prevent rate-limiting
let cachedPrice: number | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60000; // 60 seconds

export interface MarketData {
    ethPriceUsd: number;
    portfolioValueUsd: number;
}

export async function getEthPrice(): Promise<number> {
    const now = Date.now();

    // Return cached if valid
    if (cachedPrice && (now - lastFetchTime < CACHE_DURATION)) {
        return cachedPrice;
    }

    try {
        // Fetch from CoinGecko (Free API)
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');

        if (!res.ok) {
            throw new Error('Failed to fetch price');
        }

        const data = await res.json();
        const price = data.ethereum.usd;

        cachedPrice = price;
        lastFetchTime = now;

        return price;
    } catch (error) {
        console.error("Market Data Error:", error);
        // Fallback if API fails (approximate price)
        return cachedPrice || 2650.00;
    }
}
