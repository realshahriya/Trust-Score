
import { EthereumEngine } from './ethereum/agent';
import { ArbitrumEngine } from './arb/agent';
import { BscEngine } from './bsc/agent';
import { BaseChainEngine } from './base/agent';
import { BaseEvmEngine } from './BaseEvmEngine';
import { ChainEngine, AnalysisResult } from './interface';
import { Chain } from 'viem';
import { mainnet, optimism, polygon, avalanche, fantom, zksync } from 'viem/chains';
import { ChainData, fetchChainData } from '@/lib/blockchain';

class GenericEvmEngine extends BaseEvmEngine {
    constructor(chain: Chain, name: string) {
        super(chain, name);
    }
}

class NonEvmEngine implements ChainEngine {
    chainId: string;
    name: string;

    constructor(chainId: string, name: string) {
        this.chainId = chainId;
        this.name = name;
    }

    async fetchData(address: string): Promise<ChainData | null> {
        return fetchChainData(address, this.chainId);
    }

    async analyze(address: string): Promise<AnalysisResult> {
        const data = await this.fetchData(address);
        if (!data) throw new Error("Entity not found");

        let score = 50;
        const flags: string[] = [];

        if (data.txCount > 500) {
            score += 20;
            flags.push("High Activity");
        } else if (data.txCount < 5) {
            score -= 10;
            flags.push("Low Activity");
        }

        const bal = parseFloat(data.balance);
        if (bal > 1.0) {
            score += 15;
            flags.push("Significant Balance");
        } else if (bal === 0) {
            score -= 5;
        }

        if (data.isContract) {
            score -= 10;
            if (data.tokenMetadata) {
                score += 30;
                flags.push("Token Contract");
            } else {
                flags.push("Unverified Contract");
            }
        } else {
            score += 10;
        }

        score = Math.min(100, Math.max(0, score));

        let riskLevel: AnalysisResult['riskLevel'] = 'Caution';
        if (score >= 80) riskLevel = 'Safe';
        if (score < 40) riskLevel = 'High Risk';

        return {
            score,
            riskLevel,
            details: data,
            flags
        };
    }
}

export function getEngine(chainIdStr: string): ChainEngine {
    const normalized = chainIdStr.toLowerCase();
    const nonEvmChains: Record<string, string> = {
        solana: "Solana",
        sui: "Sui",
        aptos: "Aptos",
        ton: "TON",
        cosmos: "Cosmos Hub",
        polkadot: "Polkadot"
    };

    if (nonEvmChains[normalized]) {
        return new NonEvmEngine(normalized, nonEvmChains[normalized]);
    }

    const chainId = parseInt(chainIdStr);

    switch (chainId) {
        case 1: return new EthereumEngine();
        case 10: return new GenericEvmEngine(optimism, "Optimism");
        case 42161: return new ArbitrumEngine();
        case 56: return new BscEngine();
        case 137: return new GenericEvmEngine(polygon, "Polygon");
        case 250: return new GenericEvmEngine(fantom, "Fantom");
        case 324: return new GenericEvmEngine(zksync, "zkSync Era");
        case 43114: return new GenericEvmEngine(avalanche, "Avalanche");
        case 8453: return new BaseChainEngine();
        default: return new GenericEvmEngine(mainnet, "Ethereum");
    }
}
