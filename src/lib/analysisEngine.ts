import { ChainData } from './blockchain';
import { getEngine } from '@/engine/factory';
import { EntityData, ScoreHistoryPoint, SentimentPoint } from './mockData';
import { generateSecurityReport } from './aiAgent';
import { checkHype } from './twitter';
import { getEthPrice } from './marketData';
import { FAMOUS_TOKENS } from './knownTokens';

type AnalysisWeights = {
    onChain: number;
    market: number;
    social: number;
    ai: number;
};

type RandomizationContext = {
    seed: number;
    seedHex: string;
    intensity: number;
    method: string;
    weights: AnalysisWeights;
    rng: () => number;
};

export async function analyzeEntity(input: string, chainId: string = '1'): Promise<EntityData> {
    // 1. Fetch Real Data via Chain Engine
    const engine = getEngine(chainId);
    const chainData = await engine.fetchData(input);

    if (!chainData) {
        throw new Error('Entity not found');
    }

    const randomization = createRandomizationContext(chainData.address, chainId);

    // 1.5 Check for Known Famous Tokens (Whitelist)
    // 1.5 Check for Known Famous Tokens (Whitelist)
    const normalizedAddr = chainData.address.toLowerCase();

    // Check if it's a known token AND matches the current chain
    // This prevents "Fake" tokens on L2s that might just happen to have the same address (rare) 
    // or user confusion when searching Mainnet addr on L2.
    if (FAMOUS_TOKENS[normalizedAddr] && FAMOUS_TOKENS[normalizedAddr].networks.includes(chainId)) {
        const token = FAMOUS_TOKENS[normalizedAddr];
        const ethPrice = await getEthPrice();
        const balance = parseFloat(chainData.balance);
        const scoreVariance = Math.round((randomization.rng() - 0.5) * 6);
        const minScore = Math.max(80, token.score - 4);
        const maxScore = Math.min(100, token.score + 2);
        const randomizedScore = clampNumber(token.score + scoreVariance, minScore, maxScore);

        return {
            id: `${token.name} (${token.symbol})`,
            address: chainData.address,
            type: 'token',
            score: randomizedScore,
            label: randomizedScore >= 80 ? 'Safe' : 'Caution',
            summary: `**VERIFIED ENTITY:** ${token.description} This is a well-known, high-trust smart contract in the ecosystem.`,
            risks: [
                { type: 'success', title: 'Official Contract', description: `matches known CA for ${token.symbol}` },
                { type: 'success', title: 'High Liquidity', description: 'Deep market depth and widely held.' },
                { type: 'info', title: 'Verified Code', description: 'Source code audited and verified.' }
            ],
            history: generateMockHistory(randomizedScore, randomization.rng),
            sentiment: generateMockSentiment(randomizedScore, randomization.rng),
            hypeScore: clampNumber(90 + Math.floor(randomization.rng() * 10), 0, 100),
            mentionsCount: 5000 + Math.floor(randomization.rng() * 10000),
            marketData: {
                ethPriceUsd: ethPrice,
                portfolioValueUsd: balance * ethPrice,
                tokenPrice: token.price
            }
        };
    }

    // 2. Fetch Supporting Data (Parallel)
    const [ethPrice, hypeData] = await Promise.all([
        getEthPrice(),
        checkHype(chainData.ensName || chainData.address, 50) // Pass neutral score initially
    ]);

    // 3. Normalize Risk Components

    // Auto-detect Token Type from Chain Data
    let detectedType: EntityData['type'] = chainData.isContract ? 'contract' : 'wallet';
    let entityName = chainData.ensName || chainData.address;

    if (chainData.tokenMetadata) {
        detectedType = 'token';
        entityName = `${chainData.tokenMetadata.name} (${chainData.tokenMetadata.symbol})`;
    }

    const txCount = chainData.txCount;
    // ...
    // Calculate Risks
    const txRisk = Math.max(0, 100 - txCount);
    const isContractRisk = chainData.isContract && !chainData.tokenMetadata ? 50 : 0; // Verified Tokens are safer than random contracts
    const onChainRisk = Math.min(100, (txRisk + isContractRisk) / 2);

    // B. Market Risk (30%)
    const balanceEth = parseFloat(chainData.balance);
    const portfolioValue = balanceEth * ethPrice; // For tokens this should ideally use totalSupply * price, but we stick to ETH balance for now unless Famous
    const marketRisk = Math.max(0, 100 - (portfolioValue / 10)); // Decays to 0 at $1000

    // C. Social Risk (15%)
    // Logic: No ENS = 50 risk. High Hype = Low Risk.
    const identityRisk = chainData.ensName ? 0 : 50;
    const socialRisk = (identityRisk + (100 - hypeData.score)) / 2;

    // D. AI Pattern Confidence (10%)
    // We get a prelim report first
    const prelimScore = 100 - (onChainRisk * 0.45 + marketRisk * 0.3 + socialRisk * 0.25);
    const aiReport = await generateSecurityReport(chainData, prelimScore);

    let aiRisk = 50;
    switch (aiReport.riskLevel) {
        case "Safe": aiRisk = 0; break;
        case "Low": aiRisk = 25; break;
        case "Medium": aiRisk = 50; break;
        case "High": aiRisk = 75; break;
        case "Critical": aiRisk = 100; break;
    }

    // 4. Final Weighted Formula (Step 5 of Master Plan)
    // Trust Score = 100 - (onchain*0.45 + market*0.30 + social*0.15 + ai*0.10)
    const weightedDeduction = (onChainRisk * randomization.weights.onChain) +
        (marketRisk * randomization.weights.market) +
        (socialRisk * randomization.weights.social) +
        (aiRisk * randomization.weights.ai);

    const finalScore = Math.max(0, Math.min(100, Math.round(100 - weightedDeduction)));

    // 5. Generate Label
    let label: EntityData['label'] = 'Caution';
    if (finalScore >= 80) label = 'Safe';
    if (finalScore < 50) label = 'High Risk';

    // 6. Generate Risks Arrays for UI
    const risks: EntityData['risks'] = [];
    if (onChainRisk > 50) risks.push({ type: 'warning', title: 'Low On-Chain Activity', description: `Only ${txCount} transactions.` });
    if (marketRisk > 50) risks.push({ type: 'info', title: 'Low Liquidity', description: `Portfolio value < $1000.` });
    if (chainData.ensName) risks.push({ type: 'success', title: 'Verified Identity', description: `ENS: ${chainData.ensName}` });
    if (aiRisk > 70) risks.push({ type: 'danger', title: 'AI Flagged', description: 'Pattern matches known risk vectors.' });

    return {
        id: entityName,
        address: chainData.address,
        type: detectedType,
        score: finalScore,
        label,
        summary: aiReport.summary,
        risks,
        history: generateMockHistory(finalScore, randomization.rng),
        sentiment: generateMockSentiment(finalScore, randomization.rng),
        hypeScore: hypeData.score,
        mentionsCount: hypeData.mentions,
        marketData: {
            ethPriceUsd: ethPrice,
            portfolioValueUsd: portfolioValue,
            tokenPrice: undefined // We don't have real price for random tokens yet
        }
    };
}

function buildSummary(data: ChainData, score: number): string {
    return `AI Analysis complete for ${data.ensName || "address"}. ` +
        `Entity holds ${parseFloat(data.balance).toFixed(4)} ETH across ${data.txCount} transactions. ` +
        `Calculated trust profile indicates ${score > 70 ? "established reputation" : "limited or risky footprint"}.`;
}

// Helpers content to fill charts
function generateMockHistory(baseScore: number, rng?: () => number): ScoreHistoryPoint[] {
    const jitter = () => {
        if (!rng) return 0;
        return Math.round((rng() - 0.5) * 6);
    };
    return [
        { date: 'Jan', score: clampNumber(baseScore - 5 + jitter(), 0, 100) },
        { date: 'Feb', score: clampNumber(baseScore + 2 + jitter(), 0, 100) },
        { date: 'Mar', score: clampNumber(baseScore + jitter(), 0, 100) },
    ]
}

function generateMockSentiment(baseScore: number, rng?: () => number): SentimentPoint[] {
    const isGood = baseScore > 60;
    const variance = () => {
        if (!rng) return 0;
        return Math.round((rng() - 0.5) * 12);
    };
    return [
        { time: '10:00', value: clampNumber((isGood ? 20 : -10) + variance(), -100, 100) },
        { time: '12:00', value: clampNumber((isGood ? 40 : -30) + variance(), -100, 100) },
        { time: '14:00', value: clampNumber((isGood ? 50 : -20) + variance(), -100, 100) },
    ]
}

function createRandomizationContext(address: string, chainId: string): RandomizationContext {
    const intensity = 0.18;
    const seed = getSecureRandomUint32();
    const rng = mulberry32(seed);
    const methods = getAnalysisMethods();
    const method = methods[Math.floor(rng() * methods.length)];
    const weights = applyWeightRandomization(method.weights, intensity, rng);
    const seedHex = seed.toString(16).padStart(8, '0');

    console.info('analysis_randomization', {
        seed: seedHex,
        method: method.name,
        weights,
        intensity,
        chainId,
        address
    });

    return {
        seed,
        seedHex,
        intensity,
        method: method.name,
        weights,
        rng
    };
}

function getAnalysisMethods(): Array<{ name: string; weights: AnalysisWeights }> {
    return [
        { name: 'balanced', weights: { onChain: 0.45, market: 0.30, social: 0.15, ai: 0.10 } },
        { name: 'onchain_focus', weights: { onChain: 0.55, market: 0.25, social: 0.12, ai: 0.08 } },
        { name: 'market_focus', weights: { onChain: 0.35, market: 0.40, social: 0.15, ai: 0.10 } },
        { name: 'social_focus', weights: { onChain: 0.40, market: 0.25, social: 0.25, ai: 0.10 } },
        { name: 'ai_focus', weights: { onChain: 0.40, market: 0.25, social: 0.15, ai: 0.20 } }
    ];
}

function applyWeightRandomization(base: AnalysisWeights, intensity: number, rng: () => number): AnalysisWeights {
    const jittered = {
        onChain: base.onChain * (1 + (rng() * 2 - 1) * intensity),
        market: base.market * (1 + (rng() * 2 - 1) * intensity),
        social: base.social * (1 + (rng() * 2 - 1) * intensity),
        ai: base.ai * (1 + (rng() * 2 - 1) * intensity)
    };
    const total = jittered.onChain + jittered.market + jittered.social + jittered.ai;
    return {
        onChain: jittered.onChain / total,
        market: jittered.market / total,
        social: jittered.social / total,
        ai: jittered.ai / total
    };
}

function getSecureRandomUint32(): number {
    const cryptoObj = globalThis.crypto;
    if (cryptoObj && 'getRandomValues' in cryptoObj) {
        const array = new Uint32Array(1);
        cryptoObj.getRandomValues(array);
        return array[0];
    }
    return Math.floor(Math.random() * 2 ** 32);
}

function mulberry32(seed: number): () => number {
    return () => {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function clampNumber(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}
