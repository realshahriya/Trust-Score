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
}

export async function fetchChainData(input: string, chainId: string = '1'): Promise<ChainData | null> {
    const client = getClient(chainId);
    let address = input;
    let ensName = null;

    // 1. Resolve ENS if input is not an address (Only on Mainnet usually)
    // We can try resolving ENS on mainnet even if searching on other chains, 
    // but for simplicity we'll assume ENS only works if likely mainnet or just resolve via mainnet always.
    const mainnetClient = getClient('1');

    if (!viemIsAddress(input)) {
        if (input.endsWith('.eth')) {
            // Always use mainnet for ENS resolution
            const resolved = await mainnetClient.getEnsAddress({ name: input });
            if (resolved) {
                address = resolved;
                ensName = input;
            } else {
                return null; // Invalid ENS
            }
        } else {
            return null; // Not an address and not an ENS
        }
    } else {
        // Reverse resolve (Mainnet only)
        try {
            ensName = await mainnetClient.getEnsName({ address: input as `0x${string}` });
        } catch (e) { /* ignore */ }
    }

    // 2. Fetch Data from Selected Chain
    const [balance, txCount, code] = await Promise.all([
        client.getBalance({ address: address as `0x${string}` }),
        client.getTransactionCount({ address: address as `0x${string}` }),
        client.getBytecode({ address: address as `0x${string}` })
    ]);

    return {
        address,
        ensName,
        balance: formatEther(balance),
        txCount,
        isContract: code !== undefined && code !== undefined && code.length > 2,
        codeSize: code ? code.length : 0
    };
}
