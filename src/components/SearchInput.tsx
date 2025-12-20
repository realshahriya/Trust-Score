"use client";

import { Search, ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function SearchInput({
    className,
    placeholder = "Search wallet, contract, or NFT...",
    onSearch
}: {
    className?: string;
    placeholder?: string;
    onSearch?: (term: string) => void;
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
            <div className="absolute -inset-0.5 bg-gradient-to-r from-trust-100 to-blue-600 rounded-lg blur opacity-30 group-focus-within:opacity-75 transition duration-500"></div>
            <div className="relative flex items-center bg-cyber-card rounded-lg border border-cyber-border ring-1 ring-white/10 group-focus-within:ring-trust-100/50">
                {/* Chain Selector */}
                <div className="pl-2 border-r border-white/10">
                    <select
                        value={chain}
                        onChange={(e) => setChain(e.target.value)}
                        className="bg-transparent text-sm font-medium text-zinc-300 focus:outline-none py-4 px-2 cursor-pointer hover:text-white"
                    >
                        <option value="1" className="bg-cyber-card text-zinc-300">Ethereum</option>
                        <option value="137" className="bg-cyber-card text-zinc-300">Polygon</option>
                        <option value="42161" className="bg-cyber-card text-zinc-300">Arbitrum</option>
                        <option value="10" className="bg-cyber-card text-zinc-300">Optimism</option>
                        <option value="8453" className="bg-cyber-card text-zinc-300">Base</option>
                    </select>
                </div>

                <div className="pl-3 text-zinc-400">
                    <Search className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="w-full bg-transparent border-none py-4 px-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-0 text-lg"
                    placeholder={placeholder}
                />
                <button
                    type="submit"
                    disabled={!term.trim() || isLoading}
                    className="mr-2 p-2 rounded-md bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <ArrowRight className="w-5 h-5 text-trust-100" />
                    )}
                </button>
            </div>
        </form>
    );
}
