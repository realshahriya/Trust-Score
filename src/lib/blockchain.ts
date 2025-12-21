import { createPublicClient, http, formatEther, isAddress as viemIsAddress } from 'viem';
import { mainnet, polygon, arbitrum, optimism, base } from 'viem/chains';

// Chain Configuration
const CHAINS: Record<string, any> = {
    '1': mainnet,
    '137': polygon,
    '42161': arbitrum,
    '10': optimism,
    '8453': base
};

// Client Cache
const clients: Record<string, any> = {};

function getClient(chainId: string = '1') {
    if (clients[chainId]) return clients[chainId];

    const chain = CHAINS[chainId] || mainnet;
    const client = createPublicClient({
        chain,
        transport: http()
    });

    clients[chainId] = client;
    return client;
}

export interface ChainData {
    address: string;
    ensName: string | null;
    balance: string;
    txCount: number;
    isContract: boolean;
    codeSize: number;
    tokenMetadata?: TokenMetadata;
}

export interface TokenMetadata {
    name?: string;
    symbol?: string;
    decimals?: number;
    totalSupply?: string;
}

const ERC20_ABI = [
    { inputs: [], name: 'name', outputs: [{ type: 'string' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'symbol', outputs: [{ type: 'string' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'decimals', outputs: [{ type: 'uint8' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'totalSupply', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
] as const;

export async function fetchChainData(input: string, chainId: string = '1'): Promise<ChainData | null> {
    const client = getClient(chainId);
    let address = input;
    let ensName = null;

    // 1. Resolve ENS
    const mainnetClient = getClient('1');
    if (!viemIsAddress(input)) {
        if (input.endsWith('.eth')) {
            const resolved = await mainnetClient.getEnsAddress({ name: input });
            if (resolved) {
                address = resolved;
                ensName = input;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } else {
        try {
            ensName = await mainnetClient.getEnsName({ address: input as `0x${string}` });
        } catch (e) { /* ignore */ }
    }

    const addr = address as `0x${string}`;

    // 2. Fetch Data
    const [balance, txCount, code] = await Promise.all([
        client.getBalance({ address: addr }),
        client.getTransactionCount({ address: addr }),
        client.getBytecode({ address: addr })
    ]);

    const isContract = code !== undefined && code !== undefined && code.length > 2;
    let tokenMetadata: TokenMetadata | undefined;

    if (isContract) {
        try {
            const [name, symbol, decimals, totalSupply] = await Promise.all([
                client.readContract({ address: addr, abi: ERC20_ABI, functionName: 'name' }).catch(() => undefined),
                client.readContract({ address: addr, abi: ERC20_ABI, functionName: 'symbol' }).catch(() => undefined),
                client.readContract({ address: addr, abi: ERC20_ABI, functionName: 'decimals' }).catch(() => undefined),
                client.readContract({ address: addr, abi: ERC20_ABI, functionName: 'totalSupply' }).catch(() => undefined),
            ]);

            if (name || symbol) {
                tokenMetadata = {
                    name: name as string,
                    symbol: symbol as string,
                    decimals: decimals as number,
                    totalSupply: totalSupply ? formatEther(totalSupply as bigint) : undefined
                };
            }
        } catch (e) {
            // Not a token or read failed
        }
    }

    return {
        address,
        ensName,
        balance: formatEther(balance),
        txCount,
        isContract,
        codeSize: code ? code.length : 0,
        tokenMetadata
    };
}

export interface SimulationResponse {
    success: boolean;
    gasUsed: number;
    gasPrice: string;
    error?: string;
}

export async function simulateTransaction(to: string, chainId: string = '1', value: string = '0'): Promise<SimulationResponse> {
    const client = getClient(chainId);

    try {
        const [gas, gasPrice] = await Promise.all([
            client.estimateGas({
                account: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Simulate as Vitalik 
                to: to as `0x${string}`,
                value: BigInt(value)
            }),
            client.getGasPrice()
        ]);

        return {
            success: true,
            gasUsed: Number(gas),
            gasPrice: formatEther(gasPrice)
        };
    } catch (e: any) {
        const msg = e.details || e.shortMessage || "Execution Reverted";
        return {
            success: false,
            gasUsed: 0,
            gasPrice: "0",
            error: msg
        };
    }
}
