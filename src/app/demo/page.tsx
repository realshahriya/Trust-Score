"use client";

import { useState } from "react";
import {
    Wallet, Coins, ArrowDownUp, Settings, Copy, Send, Download,
    History, Layers, Eye, EyeOff, QrCode, ArrowUpRight, Clock,
    Shield, ExternalLink, AlertCircle, X, CheckCircle, AlertTriangle, ShieldAlert, Zap
} from "lucide-react";

type AnalysisType = "wallet" | "defi" | "interceptor";
type WalletTab = "tokens" | "send" | "receive" | "history";
type TokenData = {
    symbol: string;
    name: string;
    amount: string;
    value: string;
    change: string;
    priceUsd: string;
    icon: string;
    trustScore: number;
};

export default function PlaygroundPage() {
    const [activeTab, setActiveTab] = useState<AnalysisType>("wallet");
    const [walletTab, setWalletTab] = useState<WalletTab>("tokens");
    const [showBalance, setShowBalance] = useState(true);
    const [sendAddress, setSendAddress] = useState("");
    const [sendAmount, setSendAmount] = useState("");
    const [sendToken, setSendToken] = useState("ETH");
    const [swapAmount, setSwapAmount] = useState("");
    const [selectedToken, setSelectedToken] = useState<TokenData | null>(null);
    const [recipientTrustScore, setRecipientTrustScore] = useState<number | null>(null);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [showWalletModal, setShowWalletModal] = useState(false);
    const [showSendConfirm, setShowSendConfirm] = useState(false);
    const [showSwapConfirm, setShowSwapConfirm] = useState(false);
    const [showSlippageSettings, setShowSlippageSettings] = useState(false);
    const [fromToken, setFromToken] = useState("ETH");
    const [toToken, setToToken] = useState("USDC");
    const [slippage, setSlippage] = useState("0.5");
    const [showRiskySiteInterceptor, setShowRiskySiteInterceptor] = useState(false);
    const [showSuspiciousTxInterceptor, setShowSuspiciousTxInterceptor] = useState(false);
    const [showMaliciousContractInterceptor, setShowMaliciousContractInterceptor] = useState(false);
    const [showCombinationThreatInterceptor, setShowCombinationThreatInterceptor] = useState(false);
    const [showReportSuccess, setShowReportSuccess] = useState(false);

    const walletTrustScore = 92;

    const tokens: TokenData[] = [
        { symbol: "ETH", name: "Ethereum", amount: "42.5", value: "$98,425.00", change: "+5.2%", priceUsd: "2,315.88", icon: "Ξ", trustScore: 98 },
        { symbol: "USDC", name: "USD Coin", amount: "25,000", value: "$25,000.00", change: "0.0%", priceUsd: "1.00", icon: "$", trustScore: 95 },
        { symbol: "UNI", name: "Uniswap", amount: "750", value: "$4,033.32", change: "-2.1%", priceUsd: "5.38", icon: "🦄", trustScore: 88 }
    ];

    const swapableTokens = [
        { symbol: "ETH", name: "Ethereum", icon: "Ξ", trustScore: 98, liquidity: "$450M" },
        { symbol: "USDC", name: "USD Coin", icon: "$", trustScore: 95, liquidity: "$340M" },
        { symbol: "USDT", name: "Tether", icon: "₮", trustScore: 93, liquidity: "$280M" },
        { symbol: "DAI", name: "Dai", icon: "◈", trustScore: 94, liquidity: "$120M" }, { symbol: "WBTC", name: "Wrapped Bitcoin", icon: "₿", trustScore: 96, liquidity: "$210M" },
        { symbol: "UNI", name: "Uniswap", icon: "🦄", trustScore: 88, liquidity: "$85M" },
    ];

    const dexProtocols = [
        { name: "Uniswap V3", trustScore: 98, fee: "0.3%", route: "Direct" },
        { name: "Curve", trustScore: 96, fee: "0.04%", route: "via USDT" },
        { name: "Balancer", trustScore: 92, fee: "0.25%", route: "Direct" },
    ];

    const walletOptions = [
        { name: "MetaMask", icon: "🦊", description: "Connect to your MetaMask Wallet", trustScore: 95 },
        { name: "WalletConnect", icon: "🔗", description: "Scan with WalletConnect", trustScore: 92 },
        { name: "Coinbase Wallet", icon: "💼", description: "Connect to Coinbase Wallet", trustScore: 94 },
        { name: "Ledger", icon: "🔐", description: "Connect your Ledger hardware wallet", trustScore: 98 },
    ];

    const getTrustColor = (score: number) => {
        if (score >= 80) return "text-green-400";
        if (score >= 60) return "text-yellow-400";
        if (score >= 40) return "text-orange-400";
        return "text-red-400";
    };

    const getTrustBgColor = (score: number) => {
        if (score >= 80) return "bg-green-500/10 border-green-500/30";
        if (score >= 60) return "bg-yellow-500/10 border-yellow-500/30";
        if (score >= 40) return "bg-orange-500/10 border-orange-500/30";
        return "bg-red-500/10 border-red-500/30";
    };

    const getTrustLabel = (score: number) => {
        if (score >= 80) return "Trusted";
        if (score >= 60) return "Caution";
        if (score >= 40) return "Risky";
        return "High Risk";
    };

    const handleAddressChange = (address: string) => {
        setSendAddress(address);
        if (address.length > 10) {
            const mockScore = Math.floor(Math.random() * 40) + 60;
            setRecipientTrustScore(mockScore);
        } else {
            setRecipientTrustScore(null);
        }
    };

    const handleWalletConnect = (walletName: string) => {
        setIsWalletConnected(true);
        setShowWalletModal(false);
    };

    const handleSendClick = () => {
        if (!sendAddress || !sendAmount) return;
        setShowSendConfirm(true);
    };

    const handleSwapClick = () => {
        if (!swapAmount) return;
        setShowSwapConfirm(true);
    };

    const confirmTransaction = (type: 'send' | 'swap') => {
        if (type === 'send') {
            setShowSendConfirm(false);
            setSendAddress("");
            setSendAmount("");
            setRecipientTrustScore(null);
        } else {
            setShowSwapConfirm(false);
            setSwapAmount("");
        }
        // Show success message (could add toast notification here)
    };

    return (
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-sans">Playground</h1>
                <p className="text-zinc-400 font-mono text-xs sm:text-sm">Interactive demos with CENCERA trust intelligence.</p>
            </div>

            {/* Info Banner */}
            <div className="bg-neon/10 border border-neon/30 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                    <div>
                        <div className="text-sm font-mono font-bold text-neon mb-1">Interactive Demo (Mock Only)</div>
                        <div className="text-xs text-zinc-300 font-mono">
                            This entire demo page is a mock demonstration with no real wallet connections or transactions. Explore how CENCERA's trust scores will be usable for everyone across wallets, DeFi transactions, and real-time threat detection.
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b border-subtle overflow-x-auto">
                <button onClick={() => setActiveTab("wallet")} className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 font-mono font-semibold transition-all relative text-sm sm:text-base whitespace-nowrap ${activeTab === "wallet" ? "text-neon border-b-2 border-neon" : "text-zinc-400 hover:text-white"}`}>
                    <Wallet className="w-4 h-4 sm:w-5 sm:h-5" /><span className="hidden sm:inline">Wallet Demo</span><span className="sm:hidden">Wallet</span>
                    {activeTab === "wallet" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon shadow-[0_0_10px_rgba(0,240,255,0.5)]" />}
                </button>
                <button onClick={() => setActiveTab("defi")} className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 font-mono font-semibold transition-all relative text-sm sm:text-base whitespace-nowrap ${activeTab === "defi" ? "text-neon border-b-2 border-neon" : "text-zinc-400 hover:text-white"}`}>
                    <Coins className="w-4 h-4 sm:w-5 sm:h-5" /><span className="hidden sm:inline">DEX Demo</span><span className="sm:hidden">DEX</span>
                    {activeTab === "defi" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon shadow-[0_0_10px_rgba(0,240,255,0.5)]" />}
                </button>
                <button onClick={() => setActiveTab("interceptor")} className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 font-mono font-semibold transition-all relative text-sm sm:text-base whitespace-nowrap ${activeTab === "interceptor" ? "text-red-400 border-b-2 border-red-400" : "text-zinc-400 hover:text-white"}`}>
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5" /><span className="hidden sm:inline">Interceptor Demo</span><span className="sm:hidden">Interceptor</span>
                    {activeTab === "interceptor" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]" />}
                </button>
            </div>

            <div className="min-h-[600px]">
                {activeTab === "wallet" && (
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-surface via-surface to-neon/5 border border-subtle rounded-xl p-6 mb-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-neon/20 border border-neon flex items-center justify-center">
                                        <Wallet className="w-6 h-6 text-neon" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-white">0x742d...4cB7</span>
                                            <button className="text-zinc-400 hover:text-neon transition-colors">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-xs text-zinc-500 font-mono">vitalik.eth</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setShowBalance(!showBalance)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                        {showBalance ? <Eye className="w-5 h-5 text-zinc-400" /> : <EyeOff className="w-5 h-5 text-zinc-400" />}
                                    </button>
                                </div>
                            </div>

                            <div className={`inline-flex items-center gap-2 px-4 py-2 ${getTrustBgColor(walletTrustScore)} border rounded-lg mb-4`}>
                                <Shield className={`w-4 h-4 ${getTrustColor(walletTrustScore)}`} />
                                <span className={`font-mono text-sm font-bold ${getTrustColor(walletTrustScore)}`}>
                                    Trust Score: {walletTrustScore}/100
                                </span>
                                <span className="text-xs text-zinc-400 font-mono">({getTrustLabel(walletTrustScore)})</span>
                            </div>

                            <div className="space-y-2">
                                <span className="text-sm text-zinc-400 font-mono">Total Balance</span>
                                <div className="text-4xl font-bold text-white font-sans">{showBalance ? "$127,458.32" : "••••••"}</div>
                                <div className="text-sm text-green-400 font-mono">+12.4% (24h)</div>
                            </div>
                        </div>

                        {!selectedToken && (
                            <div className="flex gap-2 mb-6 p-1 bg-black/40 rounded-lg border border-subtle">
                                {[
                                    { tab: "tokens", icon: Layers, label: "Tokens" },
                                    { tab: "send", icon: Send, label: "Send" },
                                    { tab: "receive", icon: Download, label: "Receive" },
                                    { tab: "history", icon: History, label: "History" }
                                ].map(({ tab, icon: Icon, label }) => (
                                    <button
                                        key={tab}
                                        onClick={() => setWalletTab(tab as WalletTab)}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-mono text-sm transition-all ${walletTab === tab ? "bg-neon/10 text-neon border border-neon/20" : "text-zinc-400 hover:text-white"}`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="space-y-6">
                            {walletTab === "tokens" && !selectedToken && (
                                <div className="bg-surface border border-subtle rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-white mb-4 font-sans">Your Assets</h3>
                                    <div className="space-y-3">
                                        {tokens.map((token) => (
                                            <div key={token.symbol} onClick={() => setSelectedToken(token)} className="flex items-center justify-between p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors cursor-pointer group">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                                                        <span className="font-bold text-blue-400">{token.icon}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <div className="font-mono text-white">{token.name}</div>
                                                            <div className={`px-2 py-0.5 ${getTrustBgColor(token.trustScore)} border rounded text-xs font-mono ${getTrustColor(token.trustScore)}`}>
                                                                {token.trustScore}
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-zinc-500 font-mono">{token.amount} {token.symbol}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-mono text-white">{showBalance ? token.value : "••••••"}</div>
                                                    <div className={`text-xs font-mono ${token.change.startsWith('+') ? 'text-green-400' : token.change.startsWith('-') ? 'text-red-400' : 'text-zinc-400'}`}>{token.change}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedToken && (
                                <div className="space-y-6">
                                    <button onClick={() => setSelectedToken(null)} className="flex items-center gap-2 text-zinc-400 hover:text-neon transition-colors font-mono text-sm">
                                        <ArrowUpRight className="w-4 h-4 rotate-180" />Back to Assets
                                    </button>

                                    <div className="bg-gradient-to-br from-surface via-surface to-neon/5 border border-subtle rounded-xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center">
                                                    <span className="text-3xl">{selectedToken.icon}</span>
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-white font-sans">{selectedToken.name}</h2>
                                                    <span className="text-zinc-400 font-mono">{selectedToken.symbol}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-bold text-white font-mono">${selectedToken.priceUsd}</div>
                                                <div className={`text-sm font-mono ${selectedToken.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{selectedToken.change} (24h)</div>
                                            </div>
                                        </div>

                                        <div className={`flex items-center justify-between p-4 ${getTrustBgColor(selectedToken.trustScore)} border rounded-lg mb-4`}>
                                            <div className="flex items-center gap-3">
                                                <Shield className={`w-5 h-5 ${getTrustColor(selectedToken.trustScore)}`} />
                                                <div>
                                                    <div className={`font-mono font-bold ${getTrustColor(selectedToken.trustScore)}`}>
                                                        CENCERA Trust Score: {selectedToken.trustScore}/100
                                                    </div>
                                                    <div className="text-xs text-zinc-400 font-mono mt-0.5">
                                                        Contract verified • {getTrustLabel(selectedToken.trustScore)} entity
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1 ${getTrustBgColor(selectedToken.trustScore)} border rounded-lg`}>
                                                <span className={`text-sm font-mono font-bold ${getTrustColor(selectedToken.trustScore)}`}>
                                                    {getTrustLabel(selectedToken.trustScore).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-black/30 rounded-lg">
                                            <div className="text-sm text-zinc-400 mb-1">Your Holdings</div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-2xl font-bold text-white font-mono">{selectedToken.amount}</span>
                                                <span className="text-zinc-400 font-mono">{selectedToken.symbol}</span>
                                            </div>
                                            <div className="text-sm text-zinc-500 mt-1 font-mono">≈ {selectedToken.value}</div>
                                        </div>
                                    </div>

                                    <div className="bg-surface border border-subtle rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-white mb-4 font-sans">Price Chart</h3>
                                        <div className="h-64 bg-black/20 rounded-lg flex items-center justify-center">
                                            <div className="text-center text-zinc-500">
                                                <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                                <p className="font-mono text-sm">Price chart visualization</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-surface border border-subtle rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-white mb-4 font-sans">Token Statistics</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { label: "Market Cap", value: selectedToken.symbol === 'ETH' ? '$280B' : selectedToken.symbol === 'USDC' ? '$34B' : '$3.2B' },
                                                { label: "24h Volume", value: selectedToken.symbol === 'ETH' ? '$15B' : selectedToken.symbol === 'USDC' ? '$8B' : '$120M' },
                                                { label: "Circulating Supply", value: selectedToken.symbol === 'ETH' ? '120M' : selectedToken.symbol === 'USDC' ? '34B' : '753M' },
                                                { label: "All-Time High", value: selectedToken.symbol === 'ETH' ? '$4,878' : selectedToken.symbol === 'USDC' ? '$1.00' : '$44.92' }
                                            ].map((stat) => (
                                                <div key={stat.label} className="p-4 bg-black/20 rounded-lg">
                                                    <div className="text-xs text-zinc-400 font-mono mb-1">{stat.label}</div>
                                                    <div className="text-xl font-bold text-white font-mono">{stat.value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button onClick={() => { setWalletTab("send"); setSendToken(selectedToken.symbol); setSelectedToken(null); }} className="flex items-center justify-center gap-2 px-6 py-4 bg-neon text-black font-mono font-bold rounded-lg hover:bg-white transition-colors">
                                            <Send className="w-5 h-5" />Send {selectedToken.symbol}
                                        </button>
                                        <button className="flex items-center justify-center gap-2 px-6 py-4 bg-purple-500 text-white font-mono font-bold rounded-lg hover:bg-purple-400 transition-colors">
                                            <ArrowDownUp className="w-5 h-5" />Swap {selectedToken.symbol}
                                        </button>
                                    </div>

                                    <div className="bg-surface border border-subtle rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-white mb-4 font-sans">{selectedToken.symbol} Transactions</h3>
                                        <div className="space-y-3">
                                            {[
                                                { type: 'receive', amount: `+${selectedToken.symbol === 'ETH' ? '2.5' : selectedToken.symbol === 'USDC' ? '1,000' : '50'} ${selectedToken.symbol}`, color: 'green' },
                                                { type: 'send', amount: `-${selectedToken.symbol === 'ETH' ? '1.0' : selectedToken.symbol === 'USDC' ? '5,000' : '100'} ${selectedToken.symbol}`, color: 'red' }
                                            ].map((tx, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full bg-${tx.color}-500/20 flex items-center justify-center`}>
                                                            {tx.type === 'receive' ? <Download className={`w-4 h-4 text-${tx.color}-400`} /> : <Send className={`w-4 h-4 text-${tx.color}-400`} />}
                                                        </div>
                                                        <div>
                                                            <div className="font-mono text-white text-sm">{tx.type === 'receive' ? 'Received' : 'Sent'}</div>
                                                            <div className="text-xs text-zinc-500 font-mono">{i === 0 ? '2 hours ago' : '1 day ago'}</div>
                                                        </div>
                                                    </div>
                                                    <div className={`text-${tx.color}-400 font-mono text-sm`}>{tx.amount}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {walletTab === "send" && (
                                <div className="bg-surface border border-subtle rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-white mb-4 font-sans">Send Tokens</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-zinc-400 font-mono mb-2 block">Select Token</label>
                                            <select value={sendToken} onChange={(e) => setSendToken(e.target.value)} className="w-full px-4 py-3 bg-black/40 border border-subtle rounded-lg text-white font-mono focus:outline-none focus:border-neon">
                                                <option value="ETH">Ethereum (ETH)</option>
                                                <option value="USDC">USD Coin (USDC)</option>
                                                <option value="UNI">Uniswap (UNI)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-sm text-zinc-400 font-mono mb-2 block">Recipient Address</label>
                                            <input
                                                type="text"
                                                value={sendAddress}
                                                onChange={(e) => handleAddressChange(e.target.value)}
                                                placeholder="0x... or ENS name"
                                                className="w-full px-4 py-3 bg-black/40 border border-subtle rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-neon font-mono"
                                            />
                                            {recipientTrustScore !== null && (
                                                <div className={`mt-2 flex items-center gap-2 p-3 ${getTrustBgColor(recipientTrustScore)} border rounded-lg`}>
                                                    <Shield className={`w-4 h-4 ${getTrustColor(recipientTrustScore)}`} />
                                                    <div className="flex-1">
                                                        <div className={`text-sm font-mono font-bold ${getTrustColor(recipientTrustScore)}`}>
                                                            Recipient Trust Score: {recipientTrustScore}/100
                                                        </div>
                                                        <div className="text-xs text-zinc-400 font-mono">
                                                            {getTrustLabel(recipientTrustScore)} - {recipientTrustScore >= 80 ? 'Safe to send' : recipientTrustScore >= 60 ? 'Proceed with caution' : 'High risk recipient'}
                                                        </div>
                                                    </div>
                                                    {recipientTrustScore < 60 && (
                                                        <AlertCircle className="w-5 h-5 text-yellow-400" />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-sm text-zinc-400 font-mono">Amount</label>
                                                <span className="text-xs text-zinc-500 font-mono">Balance: 42.5 {sendToken}</span>
                                            </div>
                                            <div className="relative">
                                                <input type="text" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} placeholder="0.0" className="w-full px-4 py-3 bg-black/40 border border-subtle rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-neon font-mono" />
                                                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neon hover:text-white transition-colors font-mono font-bold">MAX</button>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-black/20 rounded-lg space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-zinc-400 font-mono">Network Fee</span>
                                                <span className="text-white font-mono">~$5.20</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-zinc-400 font-mono">Total</span>
                                                <span className="text-white font-mono font-bold">{sendAmount || "0.0"} {sendToken} + Fee</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleSendClick}
                                            disabled={!sendAddress || !sendAmount}
                                            className="w-full px-6 py-4 bg-neon text-black font-mono font-bold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Send className="w-5 h-5" />Send Tokens
                                        </button>
                                    </div>
                                </div>
                            )}

                            {walletTab === "receive" && (
                                <div className="bg-surface border border-subtle rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-white mb-4 font-sans">Receive Tokens</h3>
                                    <div className="flex flex-col items-center space-y-6">
                                        <div className="w-64 h-64 bg-white rounded-xl flex items-center justify-center">
                                            <QrCode className="w-32 h-32 text-black" />
                                        </div>

                                        <div className={`w-full p-4 ${getTrustBgColor(walletTrustScore)} border rounded-lg`}>
                                            <div className="flex items-center gap-3">
                                                <Shield className={`w-5 h-5 ${getTrustColor(walletTrustScore)}`} />
                                                <div className="flex-1">
                                                    <div className={`font-mono font-bold ${getTrustColor(walletTrustScore)}`}>
                                                        Your Wallet Trust Score: {walletTrustScore}/100
                                                    </div>
                                                    <div className="text-xs text-zinc-400 font-mono mt-0.5">
                                                        Share this with confidence - you're a {getTrustLabel(walletTrustScore).toLowerCase()} entity
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full space-y-3">
                                            <div className="text-center">
                                                <p className="text-sm text-zinc-400 font-mono mb-2">Your Wallet Address</p>
                                                <div className="flex items-center justify-center gap-2 p-4 bg-black/40 rounded-lg border border-subtle">
                                                    <span className="font-mono text-white">0x742d35Cc6634C0532925a3b844Bc9e7595f0f4cB7</span>
                                                    <button className="p-2 hover:bg-white/10 rounded transition-colors">
                                                        <Copy className="w-4 h-4 text-neon" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                                <p className="text-xs text-yellow-400 font-mono text-center">⚠️ Only send Ethereum (ERC-20) tokens to this address</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-mono text-sm transition-colors">Share Address</button>
                                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-mono text-sm transition-colors">Download QR</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {walletTab === "history" && (
                                <div className="bg-surface border border-subtle rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-white mb-4 font-sans">Transaction History</h3>
                                    <div className="space-y-3">
                                        {[
                                            { type: 'receive', token: 'ETH', amount: '+2.5 ETH', time: '2 hours ago', from: '0x1234...5678', trustScore: 85 },
                                            { type: 'swap', token: 'ETH', amount: '1 ETH → 2,300 USDC', time: '5 hours ago', from: 'Uniswap V3', trustScore: 98 },
                                            { type: 'send', token: 'USDC', amount: '-5,000 USDC', time: '1 day ago', from: '0xabcd...ef01', trustScore: 72 },
                                            { type: 'receive', token: 'UNI', amount: '+100 UNI', time: '2 days ago', from: '0x9999...1111', trustScore: 91 }
                                        ].map((tx, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-colors cursor-pointer">
                                                <div className={`w-10 h-10 rounded-full ${tx.type === 'receive' ? 'bg-green-500/20 border-green-500/50' : tx.type === 'send' ? 'bg-red-500/20 border-red-500/50' : 'bg-blue-500/20 border-blue-500/50'} border flex items-center justify-center flex-shrink-0`}>
                                                    {tx.type === 'receive' ? <Download className="w-5 h-5 text-green-400" /> : tx.type === 'send' ? <Send className="w-5 h-5 text-red-400" /> : <ArrowDownUp className="w-5 h-5 text-blue-400" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-mono text-white text-sm">{tx.type === 'receive' ? 'Received' : tx.type === 'send' ? 'Sent' : 'Swap on'} {tx.token}</span>
                                                            <span className={`px-2 py-0.5 ${getTrustBgColor(tx.trustScore)} border rounded text-xs font-mono ${getTrustColor(tx.trustScore)}`}>
                                                                {tx.trustScore}
                                                            </span>
                                                        </div>
                                                        <span className={`font-mono text-sm ${tx.type === 'receive' ? 'text-green-400' : tx.type === 'send' ? 'text-red-400' : 'text-zinc-400'}`}>{tx.amount}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs text-zinc-500">
                                                        <span className="font-mono">{tx.type === 'swap' ? 'Contract' : tx.type === 'receive' ? 'From' : 'To'}: {tx.from}</span>
                                                        <span className="font-mono">{tx.time}</span>
                                                    </div>
                                                </div>
                                                <button className="text-zinc-400 hover:text-neon transition-colors">
                                                    <ExternalLink className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "interceptor" && (
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-surface via-surface to-red-500/5 border border-subtle rounded-xl p-8 mb-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                                    <Shield className="w-8 h-8 text-red-400" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-white font-sans">CENCERA Interceptor System</h2>
                                    <p className="text-zinc-400 font-mono text-sm mt-1">Real-time AI-powered threat detection and prevention</p>
                                </div>
                            </div>
                            <p className="text-zinc-300 font-mono text-sm">
                                CENCERA's interceptor system monitors all blockchain interactions in real-time,
                                analyzing trust scores, detecting threats, and preventing malicious transactions before they execute.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {/* Risky Site Connection */}
                            <div className="bg-surface border-2 border-red-500/30 rounded-xl p-6 hover:border-red-500/50 transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
                                        <AlertCircle className="w-6 h-6 text-red-400 animate-pulse" />
                                    </div>
                                    <div className="px-3 py-1 bg-red-500/20 border border-red-500 rounded-lg">
                                        <span className="text-xl font-mono font-bold text-red-400">28/100</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white font-sans mb-2">Risky Site Connection</h3>
                                <p className="text-sm text-zinc-400 font-mono mb-4">
                                    Phishing attempt detected. Domain mimics legitimate DeFi protocol.
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-start gap-2 text-xs">
                                        <X className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-red-300 font-mono">Domain registered 3 days ago</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs">
                                        <X className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-red-300 font-mono">No verified smart contracts</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs">
                                        <X className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-red-300 font-mono">Unusual permission requests</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowRiskySiteInterceptor(true)}
                                    className="w-full px-4 py-3 bg-red-500 text-white font-mono font-bold rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    ⚠️ Trigger Alert
                                </button>
                            </div>

                            {/* Suspicious Transaction */}
                            <div className="bg-surface border-2 border-yellow-500/30 rounded-xl p-6 hover:border-yellow-500/50 transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500 flex items-center justify-center">
                                        <AlertCircle className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500 rounded-lg">
                                        <span className="text-xl font-mono font-bold text-yellow-400">45/100</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white font-sans mb-2">Suspicious Transaction</h3>
                                <p className="text-sm text-zinc-400 font-mono mb-4">
                                    High-value transfer to address with limited history.
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-start gap-2 text-xs">
                                        <AlertCircle className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-zinc-300 font-mono">Limited transaction history</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs">
                                        <AlertCircle className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-zinc-300 font-mono">First-time high-value transfer</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs">
                                        <AlertCircle className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-zinc-300 font-mono">Address flagged in 2 reports</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowSuspiciousTxInterceptor(true)}
                                    className="w-full px-4 py-3 bg-yellow-500 text-black font-mono font-bold rounded-lg hover:bg-yellow-400 transition-colors"
                                >
                                    ⚡ Trigger Warning
                                </button>
                            </div>

                            {/* Malicious Contract */}
                            <div className="bg-surface border-2 border-red-500/30 rounded-xl p-6 hover:border-red-500/50 transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center animate-pulse">
                                        <AlertCircle className="w-6 h-6 text-red-400" />
                                    </div>
                                    <div className="px-3 py-1 bg-red-500/20 border border-red-500 rounded-lg animate-pulse">
                                        <span className="text-xl font-mono font-bold text-red-400">12/100</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white font-sans mb-2">Malicious Contract</h3>
                                <p className="text-sm text-zinc-400 font-mono mb-4">
                                    CRITICAL: Drainer contract detected. DO NOT INTERACT.
                                </p>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-start gap-2 text-xs">
                                        <X className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-red-200 font-mono font-bold">Unverified source code</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs">
                                        <X className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-red-200 font-mono font-bold">Malicious drainer detected</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs">
                                        <X className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-red-200 font-mono font-bold">157 victim reports</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowMaliciousContractInterceptor(true)}
                                    className="w-full px-4 py-3 bg-red-500 text-white font-mono font-bold rounded-lg hover:bg-red-600 transition-colors animate-pulse"
                                >
                                    🚨 Trigger Block
                                </button>
                            </div>
                        </div>

                        {/* Combination Threat */}
                        <div className="mt-6 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10 border-2 border-red-500/50 rounded-xl p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center animate-pulse">
                                        <AlertCircle className="w-6 h-6 text-red-400" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 border-2 border-surface flex items-center justify-center">
                                        <span className="text-xs font-bold text-white">3</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg sm:text-xl font-bold text-white font-sans">Multiple Threats Detected</h3>
                                    <p className="text-xs sm:text-sm text-zinc-400 font-mono">Combination attack scenario</p>
                                </div>
                                <div className="px-3 py-1 bg-red-500/20 border-2 border-red-500 rounded-lg animate-pulse">
                                    <span className="text-xl sm:text-2xl font-mono font-bold text-red-400">8/100</span>
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm text-zinc-300 font-mono mb-4">
                                CENCERA detected a sophisticated multi-vector attack combining phishing site, suspicious contract, and malicious token approval.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                                <div className="p-3 bg-black/40 border border-red-500/30 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <X className="w-4 h-4 text-red-400" />
                                        <span className="text-xs font-mono font-bold text-red-400">Phishing Site</span>
                                    </div>
                                    <div className="text-xs text-zinc-400 font-mono">Fake DEX interface</div>
                                </div>
                                <div className="p-3 bg-black/40 border border-orange-500/30 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <X className="w-4 h-4 text-orange-400" />
                                        <span className="text-xs font-mono font-bold text-orange-400">Malicious Contract</span>
                                    </div>
                                    <div className="text-xs text-zinc-400 font-mono">Unlimited token drain</div>
                                </div>
                                <div className="p-3 bg-black/40 border border-yellow-500/30 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <X className="w-4 h-4 text-yellow-400" />
                                        <span className="text-xs font-mono font-bold text-yellow-400">Suspicious Recipient</span>
                                    </div>
                                    <div className="text-xs text-zinc-400 font-mono">Known scammer address</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowCombinationThreatInterceptor(true)}
                                className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-mono font-bold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all shadow-lg shadow-red-500/20"
                            >
                                🚨 Trigger Multi-Threat Alert
                            </button>
                        </div>

                        {/* How It Works */}
                        <div className="mt-8 bg-surface border border-subtle rounded-xl p-4 sm:p-6">
                            <h3 className="text-base sm:text-lg font-bold text-white mb-4 font-sans">How CENCERA Interceptor Works</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="p-4 bg-black/20 rounded-lg">
                                    <div className="text-neon font-mono font-bold mb-2">1. Monitor</div>
                                    <div className="text-xs text-zinc-400 font-mono">
                                        Track all blockchain interactions in real-time
                                    </div>
                                </div>
                                <div className="p-4 bg-black/20 rounded-lg">
                                    <div className="text-neon font-mono font-bold mb-2">2. Analyze</div>
                                    <div className="text-xs text-zinc-400 font-mono">
                                        AI evaluates trust scores and threat patterns
                                    </div>
                                </div>
                                <div className="p-4 bg-black/20 rounded-lg">
                                    <div className="text-neon font-mono font-bold mb-2">3. Intercept</div>
                                    <div className="text-xs text-zinc-400 font-mono">
                                        Block threats before transaction execution
                                    </div>
                                </div>
                                <div className="p-4 bg-black/20 rounded-lg">
                                    <div className="text-neon font-mono font-bold mb-2">4. Protect</div>
                                    <div className="text-xs text-zinc-400 font-mono">
                                        Prevent loss with actionable security insights
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "defi" && (
                    <div className="max-w-6xl mx-auto">
                        {!isWalletConnected ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="w-24 h-24 rounded-full bg-purple-500/10 border-2 border-purple-500 flex items-center justify-center mb-6">
                                    <Coins className="w-12 h-12 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2 font-sans">Connect Wallet to Trade</h2>
                                <p className="text-zinc-400 font-mono text-sm mb-8">Connect your wallet to access DeFi swaps</p>
                                <button
                                    onClick={() => setShowWalletModal(true)}
                                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-mono font-bold rounded-lg transition-all"
                                >
                                    Connect Wallet
                                </button>

                                {/* Mock Disclaimer */}
                                <div className="mt-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-xs text-yellow-300 font-mono">
                                            Mock demo only - No real wallet connection or transactions
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Main Swap Interface */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-gradient-to-br from-surface via-surface to-purple-500/5 border border-subtle rounded-xl p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-bold text-white font-sans">Swap Tokens</h3>
                                            <button
                                                onClick={() => setShowSlippageSettings(true)}
                                                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                                            >
                                                <Settings className="w-5 h-5 text-zinc-400" />
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            {/* From Token */}
                                            <div className="bg-black/40 border border-subtle rounded-xl p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs text-zinc-400 font-mono">From</span>
                                                    <span className="text-xs text-zinc-400 font-mono">Balance: 42.5</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="text"
                                                        placeholder="0.0"
                                                        value={swapAmount}
                                                        onChange={(e) => setSwapAmount(e.target.value)}
                                                        className="flex-1 bg-transparent text-2xl text-white font-bold outline-none"
                                                    />
                                                    <select
                                                        value={fromToken}
                                                        onChange={(e) => setFromToken(e.target.value)}
                                                        className="px-4 py-2 bg-black/60 border border-subtle hover:border-neon/50 rounded-lg transition-colors text-white font-mono font-bold cursor-pointer focus:outline-none focus:border-neon"
                                                    >
                                                        {swapableTokens.map((token) => (
                                                            <option key={token.symbol} value={token.symbol}>
                                                                {token.icon} {token.symbol}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* From Token Trust Score */}
                                                {swapableTokens.find(t => t.symbol === fromToken) && (
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <Shield className={`w-3 h-3 ${getTrustColor(swapableTokens.find(t => t.symbol === fromToken)!.trustScore)}`} />
                                                        <span className={`text-xs font-mono ${getTrustColor(swapableTokens.find(t => t.symbol === fromToken)!.trustScore)}`}>
                                                            Trust: {swapableTokens.find(t => t.symbol === fromToken)!.trustScore}/100
                                                        </span>
                                                        <span className="text-xs text-zinc-500 font-mono">
                                                            • Liquidity: {swapableTokens.find(t => t.symbol === fromToken)!.liquidity}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Swap Arrow */}
                                            <div className="flex justify-center -my-2 relative z-10">
                                                <button
                                                    onClick={() => {
                                                        const temp = fromToken;
                                                        setFromToken(toToken);
                                                        setToToken(temp);
                                                    }}
                                                    className="w-10 h-10 bg-surface border-2 border-subtle rounded-xl flex items-center justify-center hover:border-neon transition-colors"
                                                >
                                                    <ArrowDownUp className="w-5 h-5 text-neon" />
                                                </button>
                                            </div>

                                            {/* To Token */}
                                            <div className="bg-black/40 border border-subtle rounded-xl p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs text-zinc-400 font-mono">To (estimated)</span>
                                                    <span className="text-xs text-zinc-400 font-mono">Balance: 25,000</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 text-2xl text-white font-bold">
                                                        {swapAmount ? (parseFloat(swapAmount) * 2315.5).toFixed(2) : "0.0"}
                                                    </div>
                                                    <select
                                                        value={toToken}
                                                        onChange={(e) => setToToken(e.target.value)}
                                                        className="px-4 py-2 bg-black/60 border border-subtle hover:border-neon/50 rounded-lg transition-colors text-white font-mono font-bold cursor-pointer focus:outline-none focus:border-neon"
                                                    >
                                                        {swapableTokens.filter(t => t.symbol !== fromToken).map((token) => (
                                                            <option key={token.symbol} value={token.symbol}>
                                                                {token.icon} {token.symbol}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* To Token Trust Score */}
                                                {swapableTokens.find(t => t.symbol === toToken) && (
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <Shield className={`w-3 h-3 ${getTrustColor(swapableTokens.find(t => t.symbol === toToken)!.trustScore)}`} />
                                                        <span className={`text-xs font-mono ${getTrustColor(swapableTokens.find(t => t.symbol === toToken)!.trustScore)}`}>
                                                            Trust: {swapableTokens.find(t => t.symbol === toToken)!.trustScore}/100
                                                        </span>
                                                        <span className="text-xs text-zinc-500 font-mono">
                                                            • Liquidity: {swapableTokens.find(t => t.symbol === toToken)!.liquidity}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Route Info */}
                                        <div className="mt-4 p-4 bg-neon/5 border border-neon/20 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Shield className="w-4 h-4 text-neon" />
                                                <span className="text-sm font-mono font-bold text-neon">Optimal Route via Uniswap V3</span>
                                                <span className={`px-2 py-0.5 ${getTrustBgColor(98)} border rounded text-xs font-mono ${getTrustColor(98)}`}>
                                                    98
                                                </span>
                                            </div>
                                            <div className="text-xs text-zinc-400 font-mono">
                                                {fromToken} → {toToken} (Direct swap • Lowest fees)
                                            </div>
                                        </div>

                                        {/* Swap Details */}
                                        <div className="mt-4 p-4 bg-black/20 rounded-lg space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-zinc-400 font-mono">Rate</span>
                                                <span className="text-white font-mono">1 {fromToken} = 2,315.5 {toToken}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-zinc-400 font-mono">Slippage Tolerance</span>
                                                <span className="text-white font-mono">{slippage}%</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-zinc-400 font-mono">Price Impact</span>
                                                <span className="text-green-400 font-mono">&lt;0.01%</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-zinc-400 font-mono">Network Fee</span>
                                                <span className="text-white font-mono">~$5.20</span>
                                            </div>
                                            <div className="pt-2 border-t border-subtle flex items-center justify-between">
                                                <span className="text-sm text-zinc-400 font-mono">Minimum Received</span>
                                                <span className="text-white font-mono font-bold">
                                                    {swapAmount ? ((parseFloat(swapAmount) * 2315.5) * (1 - parseFloat(slippage) / 100)).toFixed(2) : "0.0"} {toToken}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleSwapClick}
                                            disabled={!swapAmount}
                                            className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-mono font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Swap Tokens
                                        </button>
                                    </div>

                                    {/* DEX Protocol Comparison */}
                                    <div className="bg-surface border border-subtle rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-white mb-4 font-sans">DEX Comparison</h3>
                                        <div className="space-y-3">
                                            {dexProtocols.map((dex, idx) => (
                                                <div
                                                    key={dex.name}
                                                    className={`p-4 rounded-lg border transition-colors ${idx === 0
                                                        ? 'bg-neon/5 border-neon/30'
                                                        : 'bg-black/20 border-subtle hover:border-neon/20'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex flex-col">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-mono font-bold text-white">{dex.name}</span>
                                                                    <span className={`px-2 py-0.5 ${getTrustBgColor(dex.trustScore)} border rounded text-xs font-mono ${getTrustColor(dex.trustScore)}`}>
                                                                        {dex.trustScore}
                                                                    </span>
                                                                    {idx === 0 && (
                                                                        <span className="px-2 py-0.5 bg-neon/20 border border-neon/50 rounded text-xs font-mono text-neon font-bold">
                                                                            BEST
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="text-xs text-zinc-500 font-mono mt-1">
                                                                    Route: {dex.route} • Fee: {dex.fee}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-white font-mono font-bold">
                                                                {swapAmount ? (parseFloat(swapAmount) * (2315.5 - idx * 5)).toFixed(2) : "0.0"}
                                                            </div>
                                                            <div className="text-xs text-zinc-500 font-mono">{toToken}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar Info */}
                                <div className="space-y-6">
                                    {/* Pool Stats */}
                                    <div className="bg-surface border border-subtle rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-white mb-4 font-sans">Pool Statistics</h3>
                                        <div className="space-y-3">
                                            {[
                                                { label: "24h Volume", value: "$1.2B" },
                                                { label: "TVL", value: "$450M" },
                                                { label: "Liquidity", value: "$340M" },
                                                { label: "APY", value: "12.4%", color: "green" }
                                            ].map((stat) => (
                                                <div key={stat.label} className="p-3 bg-black/20 rounded-lg">
                                                    <div className="text-xs text-zinc-400 font-mono mb-1">{stat.label}</div>
                                                    <div className={`text-xl font-bold font-mono ${stat.color === 'green' ? 'text-green-400' : 'text-white'}`}>
                                                        {stat.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Recent Swaps */}
                                    <div className="bg-surface border border-subtle rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-white mb-4 font-sans">Recent Activity</h3>
                                        <div className="space-y-3">
                                            {[
                                                { from: "ETH", to: "USDC", amount: "5.2", time: "2m ago", trustScore: 95 },
                                                { from: "USDT", to: "DAI", amount: "10K", time: "5m ago", trustScore: 93 },
                                                { from: "WBTC", to: "ETH", amount: "0.8", time: "12m ago", trustScore: 96 },
                                            ].map((swap, idx) => (
                                                <div key={idx} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg">
                                                    <ArrowDownUp className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-mono text-white">
                                                            {swap.amount} {swap.from} → {swap.to}
                                                        </div>
                                                        <div className="text-xs text-zinc-500 font-mono">{swap.time}</div>
                                                    </div>
                                                    <span className={`px-2 py-0.5 ${getTrustBgColor(swap.trustScore)} border rounded text-xs font-mono ${getTrustColor(swap.trustScore)}`}>
                                                        {swap.trustScore}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Wallet Connection Modal */}
            {showWalletModal && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
                    onClick={() => setShowWalletModal(false)}
                >
                    <div
                        className="bg-surface border border-subtle rounded-xl max-w-md w-full relative max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowWalletModal(false)}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Header */}
                        <div className="p-6 border-b border-subtle">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <Coins className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white font-sans">CENCERA Playground</h2>
                                    <p className="text-xs text-zinc-400 font-mono">playground.cencera.app</p>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-300 font-mono">Connect your wallet to access DeFi features</p>
                        </div>

                        {/* Trust Score for Protocol */}
                        <div className="px-6 py-4 bg-neon/5 border-b border-subtle">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-neon" />
                                    <div>
                                        <div className="text-sm font-mono font-bold text-neon">Platform Trust Score</div>
                                        <div className="text-xs text-zinc-400 font-mono">CENCERA verified protocol</div>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 ${getTrustBgColor(98)} border rounded-lg`}>
                                    <span className={`text-lg font-mono font-bold ${getTrustColor(98)}`}>98/100</span>
                                </div>
                            </div>
                        </div>

                        {/* Wallet Options */}
                        <div className="p-6">
                            <h3 className="text-sm font-mono font-bold text-white mb-3">Select Wallet</h3>
                            <div className="space-y-2 mb-4">
                                {walletOptions.map((wallet) => (
                                    <button
                                        key={wallet.name}
                                        onClick={() => handleWalletConnect(wallet.name)}
                                        className="w-full flex items-center gap-3 p-3 bg-black/20 hover:bg-black/30 border border-subtle hover:border-neon/50 rounded-lg transition-all group"
                                    >
                                        <div className="text-2xl">{wallet.icon}</div>
                                        <div className="flex-1 text-left">
                                            <div className="font-mono font-bold text-white group-hover:text-neon transition-colors text-sm">{wallet.name}</div>
                                            <div className="text-xs text-zinc-500 font-mono">{wallet.description}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`px-2 py-0.5 ${getTrustBgColor(wallet.trustScore)} border rounded text-xs font-mono ${getTrustColor(wallet.trustScore)}`}>
                                                {wallet.trustScore}
                                            </div>
                                            <CheckCircle className={`w-4 h-4 ${getTrustColor(wallet.trustScore)}`} />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Security Notice */}
                            <div className="p-4 bg-neon/10 border border-neon/30 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Shield className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-sm font-mono font-bold text-neon">Protected by CENCERA</div>
                                        <div className="text-xs text-zinc-400 font-mono mt-1">
                                            All connections are monitored for security.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Send Transaction Confirmation Modal */}
            {
                showSendConfirm && recipientTrustScore && (
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
                        onClick={() => setShowSendConfirm(false)}
                    >
                        <div
                            className="bg-surface border border-subtle rounded-xl max-w-lg w-full p-4 sm:p-6 relative max-h-[85vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowSendConfirm(false)}
                                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-neon/20 border border-neon flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-neon" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white font-sans">CENCERA Trust Analysis</h2>
                                    <p className="text-sm text-zinc-400 font-mono">Transaction Security Review</p>
                                </div>
                            </div>

                            {/* Trust Score Analysis */}
                            <div className={`p-5 ${getTrustBgColor(recipientTrustScore)} border rounded-xl mb-6`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-sm text-zinc-400 font-mono mb-1">Recipient Trust Score</div>
                                        <div className={`text-3xl font-bold font-mono ${getTrustColor(recipientTrustScore)}`}>
                                            {recipientTrustScore}/100
                                        </div>
                                    </div>
                                    <div className={`px-4 py-2 ${getTrustBgColor(recipientTrustScore)} border rounded-lg`}>
                                        <span className={`text-lg font-mono font-bold ${getTrustColor(recipientTrustScore)}`}>
                                            {getTrustLabel(recipientTrustScore).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className={`w-4 h-4 ${getTrustColor(recipientTrustScore)}`} />
                                        <span className="text-zinc-300 font-mono">Contract verification: Passed</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className={`w-4 h-4 ${getTrustColor(recipientTrustScore)}`} />
                                        <span className="text-zinc-300 font-mono">Transaction history: Clean</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {recipientTrustScore >= 80 ? (
                                            <CheckCircle className={`w-4 h-4 ${getTrustColor(recipientTrustScore)}`} />
                                        ) : (
                                            <AlertCircle className="w-4 h-4 text-yellow-400" />
                                        )}
                                        <span className="text-zinc-300 font-mono">
                                            Risk level: {recipientTrustScore >= 80 ? 'Low' : recipientTrustScore >= 60 ? 'Medium' : 'High'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Transaction Details */}
                            <div className="bg-black/30 rounded-xl p-4 mb-6 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400 font-mono">Sending</span>
                                    <span className="text-white font-mono font-bold">{sendAmount} {sendToken}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400 font-mono">To</span>
                                    <span className="text-white font-mono text-sm">{sendAddress.substring(0, 10)}...{sendAddress.substring(sendAddress.length - 8)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400 font-mono">Network Fee</span>
                                    <span className="text-white font-mono">~$5.20</span>
                                </div>
                                <div className="pt-3 border-t border-subtle flex items-center justify-between">
                                    <span className="text-sm text-zinc-400 font-mono">Total Cost</span>
                                    <span className="text-white font-mono font-bold">{sendAmount} {sendToken} + $5.20</span>
                                </div>
                            </div>

                            {recipientTrustScore < 60 && (
                                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-6">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-sm font-mono font-bold text-yellow-400">Caution Recommended</div>
                                            <div className="text-xs text-zinc-400 font-mono mt-1">
                                                This recipient has a lower trust score. Please verify the address carefully before proceeding.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowSendConfirm(false)}
                                    className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-mono font-bold rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => confirmTransaction('send')}
                                    className="flex-1 px-6 py-3 bg-neon text-black font-mono font-bold rounded-lg hover:bg-white transition-colors"
                                >
                                    Confirm Send
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Swap Transaction Confirmation Modal */}
            {
                showSwapConfirm && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-surface border border-subtle rounded-xl max-w-lg w-full p-6 relative">
                            <button
                                onClick={() => setShowSwapConfirm(false)}
                                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center">
                                    <ArrowDownUp className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white font-sans">Confirm Swap</h2>
                                    <p className="text-sm text-zinc-400 font-mono">Review your transaction</p>
                                </div>
                            </div>

                            {/* DEX Trust Score */}
                            <div className={`p-5 ${getTrustBgColor(98)} border rounded-xl mb-6`}>
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <div className="text-sm text-zinc-400 font-mono mb-1">Uniswap V3 Trust Score</div>
                                        <div className={`text-3xl font-bold font-mono ${getTrustColor(98)}`}>98/100</div>
                                    </div>
                                    <div className={`px-4 py-2 ${getTrustBgColor(98)} border rounded-lg`}>
                                        <span className={`text-lg font-mono font-bold ${getTrustColor(98)}`}>TRUSTED</span>
                                    </div>
                                </div>
                                <div className="text-xs text-zinc-400 font-mono">
                                    ✓ Verified DEX protocol • Safe to use
                                </div>
                            </div>

                            {/* Swap Details */}
                            <div className="bg-black/30 rounded-xl p-4 mb-6 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400 font-mono">From</span>
                                    <span className="text-white font-mono font-bold">{swapAmount} ETH</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400 font-mono">To (estimated)</span>
                                    <span className="text-white font-mono font-bold">{(parseFloat(swapAmount) * 2315.5).toFixed(2)} USDC</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400 font-mono">Rate</span>
                                    <span className="text-white font-mono">1 ETH = 2,315.5 USDC</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400 font-mono">Price Impact</span>
                                    <span className="text-green-400 font-mono">&lt;0.01%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400 font-mono">Network Fee</span>
                                    <span className="text-white font-mono">~$5.20</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowSwapConfirm(false)}
                                    className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-mono font-bold rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => confirmTransaction('swap')}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-mono font-bold rounded-lg transition-all"
                                >
                                    Confirm Swap
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Slippage Settings Modal */}
            {
                showSlippageSettings && (
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
                        onClick={() => setShowSlippageSettings(false)}
                    >
                        <div
                            className="bg-surface border border-subtle rounded-xl max-w-md w-full p-4 sm:p-6 relative max-h-[85vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowSlippageSettings(false)}
                                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-white mb-2 font-sans">Slippage Settings</h2>
                            <p className="text-sm text-zinc-400 font-mono mb-6">Set maximum slippage tolerance</p>

                            {/* Preset Options */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {['0.1', '0.5', '1.0'].map((value) => (
                                    <button
                                        key={value}
                                        onClick={() => setSlippage(value)}
                                        className={`px-4 py-3 rounded-lg font-mono font-bold transition-all ${slippage === value
                                            ? 'bg-neon text-black'
                                            : 'bg-black/20 text-white hover:bg-black/30'
                                            }`}
                                    >
                                        {value}%
                                    </button>
                                ))}
                            </div>

                            {/* Custom Input */}
                            <div className="mb-6">
                                <label className="text-sm text-zinc-400 font-mono mb-2 block">Custom Slippage</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={slippage}
                                        onChange={(e) => setSlippage(e.target.value)}
                                        placeholder="0.5"
                                        className="w-full px-4 py-3 bg-black/40 border border-subtle rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-neon font-mono"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 font-mono">%</span>
                                </div>
                            </div>

                            {/* Warning */}
                            {parseFloat(slippage) > 1 && (
                                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-6">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-sm font-mono font-bold text-yellow-400">High Slippage Warning</div>
                                            <div className="text-xs text-zinc-400 font-mono mt-1">
                                                Your transaction may be frontrun with slippage above 1%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => setShowSlippageSettings(false)}
                                className="w-full px-6 py-3 bg-neon text-black font-mono font-bold rounded-lg hover:bg-white transition-colors"
                            >
                                Save Settings
                                Save Settings
                            </button>
                        </div>
                    </div>
                )
            }

            {/* CENCERA Interceptor: Risky Site Connection */}
            {showRiskySiteInterceptor && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
                    onClick={() => setShowRiskySiteInterceptor(false)}
                >
                    <div
                        className="bg-surface border-2 border-red-500 rounded-xl max-w-lg w-full p-4 sm:p-6 relative max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowRiskySiteInterceptor(false)}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 animate-pulse" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg sm:text-xl font-bold text-red-400 font-sans flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5" />
                                    Phishing Site Detected
                                </h2>
                                <p className="text-xs text-zinc-500 font-mono">fake-uniswap-swap.xyz</p>
                            </div>
                            <div className="px-3 py-1 bg-red-500/20 border-2 border-red-500 rounded-lg">
                                <span className="text-2xl font-mono font-bold text-red-400">28/100</span>
                            </div>
                        </div>

                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg mb-4">
                            <div className="text-xs font-mono font-bold text-red-300">HIGH RISK - Potential phishing</div>
                        </div>

                        <div className="mb-4">
                            <div className="text-sm font-mono font-bold text-white mb-2">Key Issues:</div>
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-xs">
                                    <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                                    <span className="text-red-300 font-mono">Domain registered 3 days ago</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                                    <span className="text-red-300 font-mono">Mimics legitimate DeFi protocol</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                                    <span className="text-red-300 font-mono">No verified contracts</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowRiskySiteInterceptor(false)}
                                className="flex-1 px-6 py-3 bg-red-500 text-white font-mono font-bold rounded-lg hover:bg-red-600 transition-colors"
                            >
                                🛡️ Block Connection
                            </button>
                            <button
                                onClick={() => setShowRiskySiteInterceptor(false)}
                                className="px-6 py-3 bg-black/40 border border-subtle text-zinc-400 font-mono text-sm rounded-lg hover:bg-black/60 transition-colors"
                            >
                                Proceed Anyway
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CENCERA Interceptor: Suspicious Transaction */}
            {showSuspiciousTxInterceptor && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
                    onClick={() => setShowSuspiciousTxInterceptor(false)}
                >
                    <div
                        className="bg-surface border-2 border-yellow-500 rounded-xl max-w-lg w-full p-4 sm:p-6 relative max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowSuspiciousTxInterceptor(false)}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg sm:text-xl font-bold text-yellow-400 font-sans flex items-center gap-2">
                                    <Zap className="w-5 h-5" />
                                    Suspicious Transaction
                                </h2>
                                <p className="text-xs text-zinc-500 font-mono">0x1a2b...9f3c • 5.0 ETH (~$11,500)</p>
                            </div>
                            <div className="px-3 py-1 bg-yellow-500/20 border-2 border-yellow-500 rounded-lg">
                                <span className="text-2xl font-mono font-bold text-yellow-400">45/100</span>
                            </div>
                        </div>

                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-4">
                            <div className="text-xs font-mono font-bold text-yellow-300">WARNING - High-value first-time transfer</div>
                        </div>

                        <div className="mb-4">
                            <div className="text-sm font-mono font-bold text-white mb-2">Red Flags:</div>
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-xs">
                                    <AlertCircle className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                                    <span className="text-zinc-300 font-mono">Limited transaction history</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <AlertCircle className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                                    <span className="text-zinc-300 font-mono">Address flagged in 2 reports</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowSuspiciousTxInterceptor(false)}
                                className="flex-1 px-6 py-3 bg-yellow-500 text-black font-mono font-bold rounded-lg hover:bg-yellow-400 transition-colors"
                            >
                                Review Transaction
                            </button>
                            <button
                                onClick={() => setShowSuspiciousTxInterceptor(false)}
                                className="px-6 py-3 bg-black/40 border border-subtle text-zinc-400 font-mono text-sm rounded-lg hover:bg-black/60 transition-colors"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CENCERA Interceptor: Malicious Smart Contract */}
            {showMaliciousContractInterceptor && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
                    onClick={() => setShowMaliciousContractInterceptor(false)}
                >
                    <div
                        className="bg-surface border-2 border-red-500 rounded-xl max-w-lg w-full p-4 sm:p-6 relative max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowMaliciousContractInterceptor(false)}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center animate-pulse">
                                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg sm:text-xl font-bold text-red-400 font-sans flex items-center gap-2">
                                    <ShieldAlert className="w-5 h-5" />
                                    CRITICAL THREAT
                                </h2>
                                <p className="text-xs text-zinc-500 font-mono">0xdead...beef</p>
                            </div>
                            <div className="px-3 py-1 bg-red-500/20 border-2 border-red-500 rounded-lg animate-pulse">
                                <span className="text-2xl font-mono font-bold text-red-400">12/100</span>
                            </div>
                        </div>

                        <div className="p-3 bg-red-500/10 border-2 border-red-500/50 rounded-lg mb-4">
                            <div className="text-xs font-mono font-bold text-red-300">EXTREME RISK - Malicious drainer detected</div>
                        </div>

                        <div className="mb-4">
                            <div className="text-sm font-mono font-bold text-red-400 mb-2">Critical Issues:</div>
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-xs p-1.5 bg-red-500/10 rounded">
                                    <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                                    <span className="text-red-200 font-mono font-bold">Unverified contract</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs p-1.5 bg-red-500/10 rounded">
                                    <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                                    <span className="text-red-200 font-mono font-bold">Drainer function</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs p-1.5 bg-red-500/10 rounded">
                                    <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                                    <span className="text-red-200 font-mono font-bold">157 victims in 24h</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowMaliciousContractInterceptor(false)}
                            className="w-full px-6 py-3 bg-red-500 text-white font-mono font-bold rounded-lg hover:bg-red-600 transition-colors"
                        >
                            🛡️ BLOCK & CLOSE
                        </button>
                    </div>
                </div>
            )}

            {/* CENCERA Interceptor: Combination Threat */}
            {showCombinationThreatInterceptor && (
                <div
                    className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4"
                    onClick={() => setShowCombinationThreatInterceptor(false)}
                >
                    <div
                        className="bg-surface border-2 border-red-500 rounded-xl max-w-2xl w-full p-4 sm:p-6 relative shadow-2xl shadow-red-500/20 max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowCombinationThreatInterceptor(false)}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center animate-pulse">
                                    <AlertCircle className="w-8 h-8 text-red-400" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-orange-500 border-2 border-surface flex items-center justify-center">
                                    <span className="text-sm font-bold text-white">3</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-red-400 font-sans flex items-center gap-2">
                                    <ShieldAlert className="w-6 h-6" />
                                    CRITICAL: Multiple Threats
                                </h2>
                                <p className="text-sm text-zinc-400 font-mono">CENCERA Multi-Vector Attack Analysis</p>
                            </div>
                            <div className="px-4 py-2 bg-red-500/20 border-2 border-red-500 rounded-lg animate-pulse">
                                <span className="text-3xl font-mono font-bold text-red-400">8/100</span>
                            </div>
                        </div>

                        <div className="p-3 bg-red-500/10 border-2 border-red-500/50 rounded-lg mb-4">
                            <div className="text-xs font-mono font-bold text-red-300 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                EXTREMELY HIGH RISK - Multi-vector attack detected
                            </div>
                        </div>

                        {/* All Threats - Flat List */}
                        <div className="mb-4">
                            <div className="text-sm font-mono font-bold text-white mb-2">Threats Detected:</div>
                            <div className="space-y-2">
                                {/* Threat 1 */}
                                <div className="flex items-center justify-between py-1.5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold text-red-400">1</span>
                                        </div>
                                        <div>
                                            <div className="text-xs font-mono font-bold text-red-300">Phishing Site</div>
                                            <div className="text-xs text-zinc-500 font-mono">fake-uniswap-swap.xyz • Domain: 3 days</div>
                                        </div>
                                    </div>
                                    <div className="px-2 py-0.5 bg-red-500/20 border border-red-500 rounded text-xs font-mono text-red-400">
                                        28
                                    </div>
                                </div>

                                {/* Threat 2 */}
                                <div className="flex items-center justify-between py-1.5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold text-orange-400">2</span>
                                        </div>
                                        <div>
                                            <div className="text-xs font-mono font-bold text-orange-300">Malicious Contract</div>
                                            <div className="text-xs text-zinc-500 font-mono">0xdead...beef • Drainer function</div>
                                        </div>
                                    </div>
                                    <div className="px-2 py-0.5 bg-orange-500/20 border border-orange-500 rounded text-xs font-mono text-orange-400">
                                        12
                                    </div>
                                </div>

                                {/* Threat 3 */}
                                <div className="flex items-center justify-between py-1.5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold text-yellow-400">3</span>
                                        </div>
                                        <div>
                                            <div className="text-xs font-mono font-bold text-yellow-300">Suspicious Recipient</div>
                                            <div className="text-xs text-zinc-500 font-mono">0x1a2b...9f3c • Known scammer</div>
                                        </div>
                                    </div>
                                    <div className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500 rounded text-xs font-mono text-yellow-400">
                                        45
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Attack Vector - Simple List */}
                        <div className="mb-4">
                            <div className="text-sm font-mono font-bold text-red-400 mb-2 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Attack Flow:
                            </div>
                            <div className="space-y-1">
                                <div className="flex gap-2 items-start text-xs">
                                    <span className="text-red-400 font-mono">1.</span>
                                    <span className="text-zinc-400 font-mono">Phishing site gains trust</span>
                                </div>
                                <div className="flex gap-2 items-start text-xs">
                                    <span className="text-orange-400 font-mono">2.</span>
                                    <span className="text-zinc-400 font-mono">Contract requests unlimited approval</span>
                                </div>
                                <div className="flex gap-2 items-start text-xs">
                                    <span className="text-yellow-400 font-mono">3.</span>
                                    <span className="text-zinc-400 font-mono">Scammer receives drained funds</span>
                                </div>
                            </div>
                        </div>

                        {/* Critical Warning - Inline */}
                        <div className="mb-4 border-l-4 border-red-500 pl-3">
                            <div className="text-xs font-mono font-bold text-red-400 mb-1 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                CRITICAL WARNING
                            </div>
                            <div className="text-xs text-red-200 font-mono leading-relaxed">
                                DO NOT proceed. This coordinated attack will drain your entire wallet.
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCombinationThreatInterceptor(false)}
                                className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-mono font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition-colors shadow-lg flex items-center justify-center gap-2"
                            >
                                <Shield className="w-5 h-5" />
                                BLOCK ALL THREATS
                            </button>
                            <button
                                onClick={() => {
                                    setShowCombinationThreatInterceptor(false);
                                    setShowReportSuccess(true);
                                }}
                                className="px-6 py-4 bg-black/60 border-2 border-red-500/50 text-red-300 font-mono font-bold rounded-lg hover:bg-black/80 transition-colors flex items-center justify-center gap-2"
                            >
                                <AlertTriangle className="w-5 h-5" />
                                Report Attack
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Report Attack Success Modal */}
            {showReportSuccess && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
                    onClick={() => setShowReportSuccess(false)}
                >
                    <div
                        className="bg-surface border-2 border-neon rounded-xl max-w-md w-full p-4 sm:p-6 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowReportSuccess(false)}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-neon/20 border-2 border-neon flex items-center justify-center mb-4">
                                <CheckCircle className="w-8 h-8 text-neon" />
                            </div>

                            <h2 className="text-xl font-bold text-white mb-2 font-sans">Attack Reported</h2>
                            <p className="text-sm text-zinc-400 font-mono mb-6">
                                Thank you for helping keep the crypto community safe
                            </p>

                            <div className="w-full bg-black/40 rounded-lg p-4 mb-6 text-left">
                                <div className="text-xs font-mono font-bold text-neon mb-3">Report Details:</div>
                                <div className="space-y-2 text-xs font-mono text-zinc-400">
                                    <div className="flex justify-between">
                                        <span>Threat Type:</span>
                                        <span className="text-white">Multi-Vector Attack</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Trust Score:</span>
                                        <span className="text-red-400">8/100</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Report ID:</span>
                                        <span className="text-white">#CEN-{Math.floor(Math.random() * 10000)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Status:</span>
                                        <span className="text-neon">Submitted</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full p-3 bg-neon/10 border border-neon/30 rounded-lg mb-6">
                                <div className="flex items-start gap-2">
                                    <Shield className="w-4 h-4 text-neon flex-shrink-0 mt-0.5" />
                                    <div className="text-xs text-zinc-300 font-mono text-left">
                                        Your report helps CENCERA's AI improve threat detection for everyone
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowReportSuccess(false)}
                                className="w-full px-6 py-3 bg-neon text-black font-mono font-bold rounded-lg hover:bg-white transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}
