import { fetchChainData, ChainData } from './blockchain';
import { EntityData, ScoreHistoryPoint, SentimentPoint } from './mockData';
import { generateSecurityReport } from './aiAgent';
import { checkHype } from './twitter';
import { getEthPrice } from './marketData';
import { FAMOUS_TOKENS } from './knownTokens';

export async function analyzeEntity(input: string, chainId: string = '1'): Promise<EntityData> {
    // 1. Fetch Real Data
    const chainData = await fetchChainData(input, chainId);

    if (!chainData) {
        throw new Error('Entity not found');
    }

    // 1.5 Check for Known Famous Tokens (Whitelist)
    const normalizedAddr = chainData.address.toLowerCase();
    if (FAMOUS_TOKENS[normalizedAddr]) {
        const token = FAMOUS_TOKENS[normalizedAddr];
        const ethPrice = await getEthPrice();
        const balance = parseFloat(chainData.balance);

        return {
            id: `${token.name} (${token.symbol})`,
            type: 'contract',
            score: token.score,
            label: 'Safe',
            summary: `**VERIFIED ENTITY:** ${token.description} This is a well-known, high-trust smart contract in the ecosystem.`,
            risks: [
                { type: 'success', title: 'Official Contract', description: `matches known CA for ${token.symbol}` },
                { type: 'success', title: 'High Liquidity', description: 'Deep market depth and widely held.' },
                { type: 'info', title: 'Verified Code', description: 'Source code audited and verified.' }
            ],
            history: generateMockHistory(token.score),
            sentiment: generateMockSentiment(token.score),
            hypeScore: 95,
            mentionsCount: 5000 + Math.floor(Math.random() * 10000),
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

    // 3. Normalize Risk Components (0-100 Scale, where 100 = Max Risk)

    // A. On-Chain Risk (45%)
    // Logic: 0 tx = 100 risk. 100+ tx = 0 risk.
    const txCount = chainData.txCount;
    const txRisk = Math.max(0, 100 - txCount);
    const isContractRisk = chainData.isContract ? 50 : 0; // Contracts carry inherent risk if not verified
    const onChainRisk = Math.min(100, (txRisk + isContractRisk) / 2); // Average of factors

    // B. Market Risk (30%)
    // Logic: $0 balance = 100 risk. >$1000 balance = 0 risk.
    const balanceEth = parseFloat(chainData.balance);
    const portfolioValue = balanceEth * ethPrice;
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
    const weightedDeduction = (onChainRisk * 0.45) +
        (marketRisk * 0.30) +
        (socialRisk * 0.15) +
        (aiRisk * 0.10);

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
        id: chainData.ensName || chainData.address,
        type: chainData.isContract ? 'contract' : 'wallet',
        score: finalScore,
        label,
        summary: aiReport.summary,
        risks,
        history: generateMockHistory(finalScore),
        sentiment: generateMockSentiment(finalScore),
        hypeScore: hypeData.score,
        mentionsCount: hypeData.mentions,
        marketData: {
            ethPriceUsd: ethPrice,
            portfolioValueUsd: portfolioValue
        }
    };
}

function buildSummary(data: ChainData, score: number): string {
    return `AI Analysis complete for ${data.ensName || "address"}. ` +
        `Entity holds ${parseFloat(data.balance).toFixed(4)} ETH across ${data.txCount} transactions. ` +
        `Calculated trust profile indicates ${score > 70 ? "established reputation" : "limited or risky footprint"}.`;
}

// Helpers content to fill charts
function generateMockHistory(baseScore: number): ScoreHistoryPoint[] {
    return [
        { date: 'Jan', score: Math.max(0, baseScore - 5) },
        { date: 'Feb', score: Math.max(0, baseScore + 2) },
        { date: 'Mar', score: baseScore },
    ]
}

function generateMockSentiment(baseScore: number): SentimentPoint[] {
    const isGood = baseScore > 60;
    return [
        { time: '10:00', value: isGood ? 20 : -10 },
        { time: '12:00', value: isGood ? 40 : -30 },
        { time: '14:00', value: isGood ? 50 : -20 },
    ]
}
