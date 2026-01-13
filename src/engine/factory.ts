
import { EthereumEngine } from './ethereum/agent';
import { ArbitrumEngine } from './arb/agent';
import { BscEngine } from './bsc/agent';
import { BaseChainEngine } from './base/agent';
import { ChainEngine } from './interface';

export function getEngine(chainIdStr: string): ChainEngine {
    const chainId = parseInt(chainIdStr);

    switch (chainId) {
        case 1: return new EthereumEngine();
        case 42161: return new ArbitrumEngine();
        case 56: return new BscEngine();
        case 8453: return new BaseChainEngine();
        default: return new EthereumEngine(); // Fallback to Mainnet
    }
}
