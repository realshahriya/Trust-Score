"use client";

import { Search, ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export function SearchInput({
    className,
    placeholder = "Enter wallet address to test API...",
    onSearch,
    compact = false
}: {
    className?: string;
    placeholder?: string;
    onSearch?: (term: string) => void;
    compact?: boolean;
}) {
    const router = useRouter();
    const [term, setTerm] = useState('');
    const [chain, setChain] = useState('1'); // Default ETH
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!term.trim()) return;

        setIsLoading(true);
        // Simulate API delay for effect or just route
        if (onSearch) {
            onSearch(term);
        } else {
            setTimeout(() => {
                router.push(`/analysis?q=${encodeURIComponent(term)}&chain=${chain}`);
                setIsLoading(false);
            }, 500);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={twMerge("relative group", className)}>
            {!compact && <div className="absolute -inset-0.5 bg-gradient-to-r from-neon to-blue-600 rounded-lg blur opacity-30 group-focus-within:opacity-75 transition duration-500"></div>}
            <div className={twMerge(
                "relative flex items-center bg-surface rounded-lg border border-white/10 ring-1 ring-white/10 group-focus-within:ring-neon/50",
                compact ? "py-0 bg-transparent border-transparent ring-0" : ""
            )}>
                {/* Chain Selector */}
                {!compact && (
                    <div className="pl-2 border-r border-white/10">
                        <select
                            value={chain}
                            onChange={(e) => setChain(e.target.value)}
                            className="bg-transparent text-sm font-medium text-zinc-300 focus:outline-none py-4 px-2 cursor-pointer hover:text-white max-w-[140px] truncate"
                        >
                            <option value="1" className="bg-surface text-zinc-300">Ethereum</option>
                            <option value="10" className="bg-surface text-zinc-300">Optimism</option>
                            <option value="56" className="bg-surface text-zinc-300">BNB Smart Chain</option>
                            <option value="137" className="bg-surface text-zinc-300">Polygon</option>
                            <option value="250" className="bg-surface text-zinc-300">Fantom</option>
                            <option value="324" className="bg-surface text-zinc-300">zkSync Era</option>
                            <option value="8453" className="bg-surface text-zinc-300">Base</option>
                            <option value="42161" className="bg-surface text-zinc-300">Arbitrum One</option>
                            <option value="43114" className="bg-surface text-zinc-300">Avalanche</option>

                            {/* Non-EVM Chains */}
                            <option disabled className="bg-surface text-zinc-500 font-bold max-[400px]:hidden">──────────────</option>
                            <option value="solana" className="bg-surface text-zinc-300">Solana</option>
                            <option value="sui" className="bg-surface text-zinc-300">Sui</option>
                            <option value="aptos" className="bg-surface text-zinc-300">Aptos</option>
                            <option value="ton" className="bg-surface text-zinc-300">The Open Network</option>

                            {/* Future Integrations */}
                            <option value="cosmos" className="bg-surface text-zinc-300">Cosmos Hub</option>
                            <option value="polkadot" className="bg-surface text-zinc-300">Polkadot</option>
                        </select>
                    </div>
                )}

                <div className={twMerge("pl-3 text-zinc-400", compact ? "pl-2" : "")}>
                    <Search className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className={twMerge(
                        "w-full bg-transparent border-none text-white placeholder-zinc-500 focus:outline-none focus:ring-0",
                        compact ? "py-2 px-3 text-sm" : "py-4 px-4 text-lg"
                    )}
                    placeholder={placeholder}
                />
                {!compact && (
                    <button
                        type="submit"
                        disabled={!term.trim() || isLoading}
                        className="mr-2 p-2 rounded-md bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <ArrowRight className="w-5 h-5 text-neon" />
                        )}
                    </button>
                )}
            </div>
        </form>
    );
}
