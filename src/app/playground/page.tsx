"use client";

import { useState } from "react";
import {
    Wallet, Coins, ArrowDownUp, Settings, Copy, Send, Download,
    History, Layers, Eye, EyeOff, QrCode, ArrowUpRight, Clock,
    Shield, ExternalLink, AlertCircle, X, CheckCircle, AlertTriangle, ShieldAlert, Zap,
    Info
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

            {/* Info Banner - Cyan Primary */}
            <div className="bg-neon/10 border border-neon/20 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                    <div>
                        <div className="text-sm font-bold text-neon mb-1 font-sans">Interactive Demo Mode</div>
                        <div className="text-xs text-zinc-400 font-sans leading-relaxed">
                            You can test how CENCERA analyzes DEX & SWAP interactions. Paste any wallet address in the send section to verify trust scores.
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 border-b border-white/10 overflow-x-auto px-6">
                <button onClick={() => setActiveTab("wallet")} className={`flex items-center gap-2 py-4 font-sans font-medium transition-all relative text-sm ${activeTab === "wallet" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}>
                    <Wallet className={`w-4 h-4 ${activeTab === "wallet" ? "text-neon" : "text-zinc-500"}`} /><span className="hidden sm:inline">Wallet Demo</span><span className="sm:hidden">Wallet</span>
                    {activeTab === "wallet" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon" />}
                </button>
                <button onClick={() => setActiveTab("defi")} className={`flex items-center gap-2 py-4 font-sans font-medium transition-all relative text-sm ${activeTab === "defi" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}>
                    <Coins className={`w-4 h-4 ${activeTab === "defi" ? "text-brand-pink" : "text-zinc-500"}`} /><span className="hidden sm:inline">DEX Demo</span><span className="sm:hidden">DEX</span>
                    {activeTab === "defi" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-pink" />}
                </button>
                <button onClick={() => setActiveTab("interceptor")} className={`flex items-center gap-2 py-4 font-sans font-medium transition-all relative text-sm ${activeTab === "interceptor" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}>
                    <Shield className={`w-4 h-4 ${activeTab === "interceptor" ? "text-red-400" : "text-zinc-500"}`} /><span className="hidden sm:inline">Interceptor Demo</span><span className="sm:hidden">Interceptor</span>
                    {activeTab === "interceptor" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400" />}
                </button>
            </div>

            <div className="min-h-[600px]">
                {activeTab === "wallet" && (
                    <div className="max-w-4xl mx-auto py-8">
                        {/* Main Wallet Card */}
                        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8 mb-8">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-neon/10 flex items-center justify-center">
                                        <Wallet className="w-6 h-6 text-neon" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-medium text-lg">0x742d...4cB7</span>
                                            <button className="text-zinc-500 hover:text-white transition-colors">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-sm text-zinc-500">vitalik.eth</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className={`flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded-full border border-white/5`}>
                                        <Shield className={`w-4 h-4 ${getTrustColor(walletTrustScore)}`} />
                                        <span className={`text-sm font-medium ${getTrustColor(walletTrustScore)}`}>
                                            Trust Score: {walletTrustScore}
                                        </span>
                                    </div>
                                    <button onClick={() => setShowBalance(!showBalance)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-500 hover:text-white">
                                        {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col items-center md:items-start space-y-2">
                                <span className="text-sm text-zinc-500">Total Balance</span>
                                <div className="text-5xl font-bold text-white tracking-tight">{showBalance ? "$127,458.32" : "••••••"}</div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-green-400 font-medium">+12.4%</span>
                                    <span className="text-zinc-600">past 24h</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        {!selectedToken && (
                            <div className="flex items-center gap-1 mb-8 p-1 bg-zinc-900/50 rounded-xl border border-white/5 w-fit mx-auto md:mx-0">
                                {[
                                    { tab: "tokens", icon: Layers, label: "Assets" },
                                    { tab: "send", icon: Send, label: "Send" },
                                    { tab: "receive", icon: Download, label: "Receive" },
                                    { tab: "history", icon: History, label: "History" }
                                ].map(({ tab, icon: Icon, label }) => (
                                    <button
                                        key={tab}
                                        onClick={() => setWalletTab(tab as WalletTab)}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${walletTab === tab ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="min-h-[400px]">
                            {/* Token List */}
                            {walletTab === "tokens" && !selectedToken && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                        <span>Asset</span>
                                        <span>Balance</span>
                                    </div>
                                    <div className="space-y-2">
                                        {tokens.map((token) => (
                                            <div key={token.symbol} onClick={() => setSelectedToken(token)} className="group flex items-center justify-between p-4 bg-transparent hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-all cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-xl">
                                                        {token.icon}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-bold text-white text-base">{token.name}</span>
                                                            {token.trustScore > 90 && (
                                                                <Shield className="w-3 h-3 text-green-400" />
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-zinc-500">{token.amount} {token.symbol}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-white text-base mb-1">{showBalance ? token.value : "••••••"}</div>
                                                    <div className={`text-xs font-medium ${token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                                        {token.change}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedToken && (
                                <div className="space-y-6">
                                    <button onClick={() => setSelectedToken(null)} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium">
                                        <ArrowUpRight className="w-4 h-4 rotate-180" />Back to Assets
                                    </button>

                                    <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-3xl">
                                                    {selectedToken.icon}
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-white mb-1">{selectedToken.name}</h2>
                                                    <span className="text-zinc-500 font-medium">{selectedToken.symbol}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-bold text-white tracking-tight">${selectedToken.priceUsd}</div>
                                                <div className={`text-sm font-medium ${selectedToken.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{selectedToken.change} (24h)</div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 mb-8">
                                            <div className={`flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded-full border border-white/5`}>
                                                <Shield className={`w-4 h-4 ${getTrustColor(selectedToken.trustScore)}`} />
                                                <span className={`text-sm font-medium ${getTrustColor(selectedToken.trustScore)}`}>
                                                    Trust Score: {selectedToken.trustScore}
                                                </span>
                                            </div>
                                            <div className="px-3 py-1.5 bg-black/30 rounded-full border border-white/5 text-sm font-medium text-zinc-400">
                                                Contract Verified
                                            </div>
                                        </div>

                                        <div className="p-6 bg-black/20 rounded-xl mb-8">
                                            <div className="text-sm text-zinc-500 mb-2">Your Holdings</div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-2xl font-bold text-white">{selectedToken.amount}</span>
                                                <span className="text-zinc-400">{selectedToken.symbol}</span>
                                            </div>
                                            <div className="text-sm text-zinc-600 mt-1">≈ {selectedToken.value}</div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <button onClick={() => { setWalletTab("send"); setSendToken(selectedToken.symbol); setSelectedToken(null); }} className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-colors">
                                                <Send className="w-5 h-5" />Send
                                            </button>
                                            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-zinc-800 text-white font-medium rounded-xl hover:bg-zinc-700 transition-colors">
                                                <ArrowDownUp className="w-5 h-5" />Swap
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {walletTab === "send" && (
                                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8">
                                    <h3 className="text-xl font-bold text-white mb-6">Send Tokens</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-sm text-zinc-500 font-medium mb-2 block">Select Token</label>
                                            <select value={sendToken} onChange={(e) => setSendToken(e.target.value)} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-blue-500 transition-colors">
                                                <option value="ETH">Ethereum (ETH)</option>
                                                <option value="USDC">USD Coin (USDC)</option>
                                                <option value="UNI">Uniswap (UNI)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-sm text-zinc-500 font-medium mb-2 block">Recipient Address</label>
                                            <input
                                                type="text"
                                                value={sendAddress}
                                                onChange={(e) => handleAddressChange(e.target.value)}
                                                placeholder="0x... or ENS name"
                                                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                                            />
                                            {recipientTrustScore !== null && (
                                                <div className={`mt-3 flex items-start gap-3 p-4 bg-black/20 border border-white/5 rounded-xl`}>
                                                    <Shield className={`w-5 h-5 ${getTrustColor(recipientTrustScore)} mt-0.5`} />
                                                    <div className="flex-1">
                                                        <div className={`text-sm font-bold ${getTrustColor(recipientTrustScore)}`}>
                                                            Recipient Trust Score: {recipientTrustScore}/100
                                                        </div>
                                                        <div className="text-xs text-zinc-500 mt-1">
                                                            This address is {recipientTrustScore >= 80 ? 'verified and safe' : 'potentially suspicious'}.
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-sm text-zinc-500 font-medium">Amount</label>
                                                <span className="text-xs text-zinc-500">Balance: 42.5 {sendToken}</span>
                                            </div>
                                            <div className="relative">
                                                <input type="text" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} placeholder="0.0" className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors font-mono " />
                                                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-400 hover:text-blue-300 font-bold px-2 py-1 rounded hover:bg-blue-500/10 transition-colors">MAX</button>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleSendClick}
                                            disabled={!sendAddress || !sendAmount}
                                            className="w-full px-6 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                        >
                                            <Send className="w-5 h-5" />Send {sendAmount} {sendToken}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {walletTab === "receive" && (
                                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8">
                                    <h3 className="text-xl font-bold text-white mb-8 text-center">Receive Tokens</h3>
                                    <div className="flex flex-col items-center space-y-8">
                                        <div className="p-4 bg-white rounded-2xl shadow-xl">
                                            <QrCode className="w-48 h-48 text-black" />
                                        </div>

                                        <div className="w-full max-w-sm space-y-4">
                                            <div className="text-center">
                                                <p className="text-sm text-zinc-500 font-medium mb-2">Your Wallet Address</p>
                                                <button className="w-full flex items-center justify-center gap-2 p-4 bg-black/20 rounded-xl border border-white/10 hover:border-white/20 transition-all group">
                                                    <span className="font-mono text-zinc-300 text-sm">0x742d...4cB7</span>
                                                    <Copy className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                                                </button>
                                            </div>

                                            <div className="p-4 bg-neon/5 border border-neon/10 rounded-xl flex items-center gap-3">
                                                <Shield className="w-5 h-5 text-neon" />
                                                <div className="text-xs text-neon/80">
                                                    Your wallet has a <span className="font-bold">Trust Score of {walletTrustScore}</span>. It is safe to interact with.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {walletTab === "history" && (
                                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8">
                                    <h3 className="text-xl font-bold text-white mb-6">Transaction History</h3>
                                    <div className="space-y-1">
                                        {[
                                            { type: 'receive', token: 'ETH', amount: '+2.5 ETH', time: '2 hours ago', from: '0x1234...5678', trustScore: 85 },
                                            { type: 'swap', token: 'ETH', amount: '1 ETH → 2,300 USDC', time: '5 hours ago', from: 'Uniswap V3', trustScore: 98 },
                                            { type: 'send', token: 'USDC', amount: '-5,000 USDC', time: '1 day ago', from: '0xabcd...ef01', trustScore: 72 },
                                            { type: 'receive', token: 'UNI', amount: '+100 UNI', time: '2 days ago', from: '0x9999...1111', trustScore: 91 }
                                        ].map((tx, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer border-b border-white/5 last:border-0">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === 'receive' ? 'bg-green-500/10 text-green-400' :
                                                    tx.type === 'send' ? 'bg-red-500/10 text-red-400' :
                                                        'bg-blue-500/10 text-blue-400'
                                                    }`}>
                                                    {tx.type === 'receive' ? <Download className="w-5 h-5" /> : tx.type === 'send' ? <Send className="w-5 h-5" /> : <ArrowDownUp className="w-5 h-5" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-white font-medium text-sm">
                                                            {tx.type === 'receive' ? 'Received' : tx.type === 'send' ? 'Sent' : 'Swapped'} {tx.token}
                                                        </span>
                                                        <span className={`font-medium text-sm ${tx.type === 'receive' ? 'text-green-400' : tx.type === 'send' ? 'text-red-400' : 'text-zinc-400'}`}>{tx.amount}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs text-zinc-500">
                                                        <span className="font-medium">{tx.time}</span>
                                                        <div className="flex items-center gap-1">
                                                            <span>Trust Score: {tx.trustScore}</span>
                                                            <div className={`w-2 h-2 rounded-full ${tx.trustScore > 80 ? 'bg-green-500' : tx.trustScore > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "interceptor" && (
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Header Section */}
                        <div className="flex items-start justify-between gap-6 pb-6 border-b border-white/5">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Interceptor System</h2>
                                <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
                                    Real-time threat detection engine that analyzes transactions before they are signed.
                                    The system assigns risk scores and prevents interaction with malicious contracts.
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-medium text-green-500">System Active</span>
                                </div>
                            </div>
                        </div>

                        {/* Test Scenarios Grid */}
                        <div>
                            <h3 className="text-sm font-medium text-zinc-500 mb-4">Simulate Threats</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Scenario 1: Phishing */}
                                <div className="group bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                            <AlertCircle className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div className="px-2 py-1 bg-orange-500/10 rounded-lg border border-orange-500/10">
                                            <span className="text-xs font-medium text-orange-400">Risk: 72/100</span>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2">Phishing Site</h4>
                                    <p className="text-sm text-zinc-400 mb-6 min-h-[40px] leading-relaxed">
                                        Simulate a connection to a known phishing domain masquerading as a DeFi protocol.
                                    </p>
                                    <button
                                        onClick={() => setShowRiskySiteInterceptor(true)}
                                        className="w-full py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <AlertTriangle className="w-4 h-4" /> Simulate Attack
                                    </button>
                                </div>

                                {/* Scenario 2: Suspicious Tx */}
                                <div className="group bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                                        </div>
                                        <div className="px-2 py-1 bg-yellow-500/10 rounded-lg border border-yellow-500/10">
                                            <span className="text-xs font-medium text-yellow-400">Risk: 55/100</span>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2">Suspicious Transfer</h4>
                                    <p className="text-sm text-zinc-400 mb-6 min-h-[40px] leading-relaxed">
                                        Test a high-value transfer to a freshly created wallet with no history.
                                    </p>
                                    <button
                                        onClick={() => setShowSuspiciousTxInterceptor(true)}
                                        className="w-full py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Zap className="w-4 h-4" /> Simulate Transfer
                                    </button>
                                </div>

                                {/* Scenario 3: Malicious Contract */}
                                <div className="group bg-zinc-900/50 hover:bg-zinc-900 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                            <ShieldAlert className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div className="px-2 py-1 bg-red-500/10 rounded-lg border border-red-500/10">
                                            <span className="text-xs font-medium text-red-400">Risk: 88/100</span>
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2">Malicious Contract</h4>
                                    <p className="text-sm text-zinc-400 mb-6 min-h-[40px] leading-relaxed">
                                        Interact with a verified drainer contract that attempts to steal assets.
                                    </p>
                                    <button
                                        onClick={() => setShowMaliciousContractInterceptor(true)}
                                        className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShieldAlert className="w-4 h-4" /> Simulate Interaction
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Advanced Scenario */}
                        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <ShieldAlert className="w-32 h-32" />
                            </div>
                            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Multi-Vector Attack Simulation</h3>
                                    <p className="text-zinc-400 text-sm max-w-xl mb-4 leading-relaxed">
                                        Simulates a complex attack involving a phishing frontend connected to a malicious backend contract with spoofed approvals.
                                    </p>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-zinc-400 font-medium">Phishing</span>
                                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-zinc-400 font-medium">Malicious Contract</span>
                                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-zinc-400 font-medium">Spoofing</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowCombinationThreatInterceptor(true)}
                                    className="whitespace-nowrap px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5"
                                >
                                    Start Simulation
                                </button>
                            </div>
                        </div>

                        {/* How It Works (Simplified) */}
                        <div className="pt-8 border-t border-white/5">
                            <h3 className="text-sm font-medium text-zinc-500 mb-6 text-center">Protection Workflow</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                                {[
                                    { icon: "👀", title: "Monitor", desc: "Real-time interaction tracking" },
                                    { icon: "🧠", title: "Analyze", desc: "AI risk scoring engine" },
                                    { icon: "🛡️", title: "Intercept", desc: "Pre-execution blocking" },
                                    { icon: "🔒", title: "Protect", desc: "Asset security ensured" }
                                ].map((step, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-zinc-900/30 border border-white/5">
                                        <div className="text-2xl mb-2">{step.icon}</div>
                                        <div className="font-bold text-white text-sm mb-1">{i + 1}. {step.title}</div>
                                        <div className="text-xs text-zinc-500">{step.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "defi" && (
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Swap Interface */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-bold text-white">Swap Tokens</h3>
                                        <button
                                            onClick={() => setShowSlippageSettings(true)}
                                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white"
                                        >
                                            <Settings className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {/* From Token */}
                                        <div className="bg-black/20 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs text-zinc-500 font-medium">From</span>
                                                <span className="text-xs text-zinc-500">Balance: 42.5</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="0.0"
                                                    value={swapAmount}
                                                    onChange={(e) => setSwapAmount(e.target.value)}
                                                    className="flex-1 bg-transparent text-3xl text-white font-bold outline-none placeholder-zinc-700"
                                                />
                                                <select
                                                    value={fromToken}
                                                    onChange={(e) => setFromToken(e.target.value)}
                                                    className="px-4 py-2 bg-zinc-800 border border-white/10 rounded-xl transition-colors text-white font-medium cursor-pointer focus:outline-none focus:border-blue-500"
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
                                                <div className="mt-3 flex items-center gap-2">
                                                    <Shield className={`w-3 h-3 ${getTrustColor(swapableTokens.find(t => t.symbol === fromToken)!.trustScore)}`} />
                                                    <span className={`text-xs font-medium ${getTrustColor(swapableTokens.find(t => t.symbol === fromToken)!.trustScore)}`}>
                                                        Trust: {swapableTokens.find(t => t.symbol === fromToken)!.trustScore}/100
                                                    </span>
                                                    <span className="text-xs text-zinc-600">
                                                        • Liquidity: {swapableTokens.find(t => t.symbol === fromToken)!.liquidity}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Swap Arrow */}
                                        <div className="flex justify-center -my-5 relative z-10">
                                            <button
                                                onClick={() => {
                                                    const temp = fromToken;
                                                    setFromToken(toToken);
                                                    setToToken(temp);
                                                }}
                                                className="w-10 h-10 bg-zinc-900 border-2 border-white/10 rounded-xl flex items-center justify-center hover:border-white/20 transition-colors shadow-xl"
                                            >
                                                <ArrowDownUp className="w-5 h-5 text-neon" />
                                            </button>
                                        </div>

                                        {/* To Token */}
                                        <div className="bg-black/20 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs text-zinc-500 font-medium">To (estimated)</span>
                                                <span className="text-xs text-zinc-500">Balance: 25,000</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 text-3xl text-white font-bold">
                                                    {swapAmount ? (parseFloat(swapAmount) * 2315.5).toFixed(2) : "0.0"}
                                                </div>
                                                <select
                                                    value={toToken}
                                                    onChange={(e) => setToToken(e.target.value)}
                                                    className="px-4 py-2 bg-zinc-800 border border-white/10 rounded-xl transition-colors text-white font-medium cursor-pointer focus:outline-none focus:border-blue-500"
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
                                                <div className="mt-3 flex items-center gap-2">
                                                    <Shield className={`w-3 h-3 ${getTrustColor(swapableTokens.find(t => t.symbol === toToken)!.trustScore)}`} />
                                                    <span className={`text-xs font-medium ${getTrustColor(swapableTokens.find(t => t.symbol === toToken)!.trustScore)}`}>
                                                        Trust: {swapableTokens.find(t => t.symbol === toToken)!.trustScore}/100
                                                    </span>
                                                    <span className="text-xs text-zinc-600">
                                                        • Liquidity: {swapableTokens.find(t => t.symbol === toToken)!.liquidity}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Route Info - Cyan Primary */}
                                    <div className="mt-6 p-4 bg-neon/5 border border-neon/10 rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Shield className="w-4 h-4 text-neon" />
                                                <span className="text-sm font-medium text-neon">Optimal Route via Uniswap V3</span>
                                            </div>
                                            <span className={`px-2 py-0.5 ${getTrustBgColor(98)} border rounded text-xs font-medium ${getTrustColor(98)}`}>
                                                Trust: 98
                                            </span>
                                        </div>
                                        <div className="text-xs text-zinc-500">
                                            {fromToken} → {toToken} (Direct swap • Lowest fees)
                                        </div>
                                    </div>

                                    {/* Swap Details */}
                                    <div className="mt-4 p-4 bg-transparent rounded-xl space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-zinc-500 font-medium">Rate</span>
                                            <span className="text-white font-medium">1 {fromToken} = 2,315.5 {toToken}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-zinc-500 font-medium">Slippage Tolerance</span>
                                            <span className="text-white font-medium">{slippage}%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-zinc-500 font-medium">Price Impact</span>
                                            <span className="text-green-400 font-medium">&lt;0.01%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-zinc-500 font-medium">Network Fee</span>
                                            <span className="text-white font-medium">~$5.20</span>
                                        </div>
                                        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-sm text-zinc-500 font-medium">Minimum Received</span>
                                            <span className="text-white font-bold">
                                                {swapAmount ? ((parseFloat(swapAmount) * 2315.5) * (1 - parseFloat(slippage) / 100)).toFixed(2) : "0.0"} {toToken}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSwapClick}
                                        disabled={!swapAmount}
                                        className="w-full mt-6 px-6 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/5"
                                    >
                                        Swap Tokens
                                    </button>
                                </div>

                                {/* DEX Protocol Comparison */}
                                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-white mb-4">DEX Comparison</h3>
                                    <div className="space-y-3">
                                        {dexProtocols.map((dex, idx) => (
                                            <div
                                                key={dex.name}
                                                className={`p-4 rounded-xl border transition-colors ${idx === 0
                                                    ? 'bg-neon/10 border-neon/20'
                                                    : 'bg-transparent border-white/5 hover:bg-white/5'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-white">{dex.name}</span>
                                                                <span className={`px-2 py-0.5 ${getTrustBgColor(dex.trustScore)} border rounded text-xs font-medium ${getTrustColor(dex.trustScore)}`}>
                                                                    {dex.trustScore}
                                                                </span>
                                                                {idx === 0 && (
                                                                    <span className="px-2 py-0.5 bg-neon/20 border border-neon/30 rounded text-xs font-bold text-neon">
                                                                        BEST
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="text-xs text-zinc-500 mt-1">
                                                                Route: {dex.route} • Fee: {dex.fee}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-white font-bold text-lg">
                                                            {swapAmount ? (parseFloat(swapAmount) * (2315.5 - idx * 5)).toFixed(2) : "0.0"}
                                                        </div>
                                                        <div className="text-xs text-zinc-500">{toToken}</div>
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
                                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-white mb-4">Pool Statistics</h3>
                                    <div className="space-y-3">
                                        {[
                                            { label: "24h Volume", value: "$1.2B" },
                                            { label: "TVL", value: "$450M" },
                                            { label: "Liquidity", value: "$340M" },
                                            { label: "APY", value: "12.4%", color: "green" }
                                        ].map((stat) => (
                                            <div key={stat.label} className="p-3 bg-white/5 rounded-xl border border-white/5">
                                                <div className="text-xs text-zinc-500 font-medium mb-1">{stat.label}</div>
                                                <div className={`text-xl font-bold ${stat.color === 'green' ? 'text-green-400' : 'text-white'}`}>
                                                    {stat.value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Swaps */}
                                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                                    <div className="space-y-3">
                                        {[
                                            { from: "ETH", to: "USDC", amount: "5.2", time: "2m ago", trustScore: 95 },
                                            { from: "USDT", to: "DAI", amount: "10K", time: "5m ago", trustScore: 93 },
                                            { from: "WBTC", to: "ETH", amount: "0.8", time: "12m ago", trustScore: 96 },
                                        ].map((swap, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 bg-transparent hover:bg-white/5 rounded-xl border-b border-white/5 last:border-0 transition-colors">
                                                <ArrowDownUp className="w-4 h-4 text-purple-400 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-medium text-white">
                                                        {swap.amount} {swap.from} → {swap.to}
                                                    </div>
                                                    <div className="text-xs text-zinc-500">{swap.time}</div>
                                                </div>
                                                <span className={`px-2 py-0.5 ${getTrustBgColor(swap.trustScore)} border rounded text-xs font-medium ${getTrustColor(swap.trustScore)}`}>
                                                    {swap.trustScore}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


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
                        className="bg-zinc-900 border border-red-500/30 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl shadow-red-900/20 max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowRiskySiteInterceptor(false)}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                                <AlertCircle className="w-6 h-6 text-red-500" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                                    Phishing Site Detected
                                </h2>
                                <p className="text-sm text-zinc-500">Analysis of fake-uniswap-swap.xyz</p>
                            </div>
                            <div className="px-3 py-1 bg-red-500/10 rounded-lg border border-red-500/10">
                                <span className="text-sm font-bold text-red-400">Risk: 28/100</span>
                            </div>
                        </div>

                        <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10 mb-6">
                            <div className="text-sm font-medium text-red-400 mb-1">High Risk Alert</div>
                            <div className="text-sm text-zinc-400">
                                This domain has been identified as a potential phishing site mimicking a legitimate protocol.
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="text-sm font-bold text-white mb-3">Security Findings</div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 text-sm">
                                    <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                    <span className="text-zinc-400">Domain registered recently (3 days ago)</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm">
                                    <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                    <span className="text-zinc-400">Visual imitation of DeFi protocol interface</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm">
                                    <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                    <span className="text-zinc-400">Smart contracts unverified</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowRiskySiteInterceptor(false)}
                                className="flex-1 px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <Shield className="w-4 h-4" /> Block Connection
                            </button>
                            <button
                                onClick={() => setShowRiskySiteInterceptor(false)}
                                className="px-6 py-3 bg-white/5 border border-white/5 text-zinc-400 font-medium text-sm rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                            >
                                Proceed Riskily
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
                        className="bg-zinc-900 border border-yellow-500/30 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl shadow-yellow-900/10 max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowSuspiciousTxInterceptor(false)}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                                    Suspicious Transaction
                                </h2>
                                <p className="text-sm text-zinc-500">0x1a2b...9f3c • 5.0 ETH</p>
                            </div>
                            <div className="px-3 py-1 bg-yellow-500/10 rounded-lg border border-yellow-500/10">
                                <span className="text-sm font-bold text-yellow-500">Risk: 45/100</span>
                            </div>
                        </div>

                        <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl mb-6">
                            <div className="text-sm font-medium text-yellow-500 mb-1">Caution Advised</div>
                            <div className="text-sm text-zinc-400">
                                This is a high-value transfer to a freshly created wallet with no prior history.
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="text-sm font-bold text-white mb-3">Risk Factors</div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 text-sm">
                                    <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                                    <span className="text-zinc-400">Recipient wallet has limited transaction history</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm">
                                    <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                                    <span className="text-zinc-400">Address flagged in community reports</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowSuspiciousTxInterceptor(false)}
                                className="flex-1 px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors"
                            >
                                Review Transaction
                            </button>
                            <button
                                onClick={() => setShowSuspiciousTxInterceptor(false)}
                                className="px-6 py-3 bg-white/5 border border-white/5 text-zinc-400 font-medium text-sm rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                            >
                                Ignore
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
                        className="bg-zinc-900 border border-red-500/30 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl shadow-red-900/20 max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowMaliciousContractInterceptor(false)}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                                <ShieldAlert className="w-6 h-6 text-red-500" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                                    Critical Threat Detected
                                </h2>
                                <p className="text-sm text-zinc-500">Contract Interaction: 0xdead...beef</p>
                            </div>
                            <div className="px-3 py-1 bg-red-500/10 rounded-lg border border-red-500/10">
                                <span className="text-sm font-bold text-red-400">Risk: 12/100</span>
                            </div>
                        </div>

                        <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl mb-6">
                            <div className="text-sm font-medium text-red-400 mb-1">Malicious Drainer Identified</div>
                            <div className="text-sm text-zinc-400">
                                This contract contains code patterns known to drain user wallets. Interaction is extremely dangerous.
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="text-sm font-bold text-white mb-3">Critical Issues</div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 text-sm">
                                    <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                    <span className="text-zinc-400">Contract source code not verified</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm">
                                    <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                    <span className="text-zinc-400">Contains known drainer function signatures</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm">
                                    <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                    <span className="text-zinc-400">Multiple victim reports in the last 24h</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowMaliciousContractInterceptor(false)}
                            className="w-full px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <Shield className="w-4 h-4" /> Block & Close
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
                        className="bg-zinc-900 border border-red-500/30 rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl shadow-red-900/20 max-h-[85vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowCombinationThreatInterceptor(false)}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                                <ShieldAlert className="w-8 h-8 text-red-500" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white mb-2">Critical: Multi-Vector Attack</h2>
                                <p className="text-zinc-500">CENCERA Advanced Threat Analysis</p>
                            </div>
                            <div className="px-4 py-2 bg-red-500/10 rounded-xl border border-red-500/20">
                                <span className="text-xl font-bold text-red-400">Risk: 8/100</span>
                            </div>
                        </div>

                        <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl mb-8">
                            <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
                                <AlertTriangle className="w-5 h-5" />
                                Extremely High Risk Detected
                            </div>
                            <div className="text-sm text-zinc-400 leading-relaxed">
                                A coordinated multi-vector attack has been identified. This transaction involves a phishing site, a malicious contract, and a suspicious recipient address.
                            </div>
                        </div>

                        {/* All Threats - Flat List */}
                        <div className="mb-8">
                            <div className="text-sm font-bold text-white mb-4">Detected Threats</div>
                            <div className="grid gap-3">
                                {/* Threat 1 */}
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-sm font-bold text-red-500">1</div>
                                        <div>
                                            <div className="font-bold text-white text-sm">Phishing Site</div>
                                            <div className="text-xs text-zinc-500">fake-uniswap-swap.xyz</div>
                                        </div>
                                    </div>
                                    <div className="text-xs font-bold text-red-400 px-2 py-1 bg-red-500/10 rounded">Risk: High</div>
                                </div>

                                {/* Threat 2 */}
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-sm font-bold text-orange-500">2</div>
                                        <div>
                                            <div className="font-bold text-white text-sm">Malicious Contract</div>
                                            <div className="text-xs text-zinc-500">Drainer function identified</div>
                                        </div>
                                    </div>
                                    <div className="text-xs font-bold text-orange-400 px-2 py-1 bg-orange-500/10 rounded">Risk: High</div>
                                </div>

                                {/* Threat 3 */}
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-sm font-bold text-yellow-500">3</div>
                                        <div>
                                            <div className="font-bold text-white text-sm">Suspicious Recipient</div>
                                            <div className="text-xs text-zinc-500">Known scammer address</div>
                                        </div>
                                    </div>
                                    <div className="text-xs font-bold text-yellow-400 px-2 py-1 bg-yellow-500/10 rounded">Risk: Medium</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowCombinationThreatInterceptor(false)}
                                className="flex-1 px-8 py-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                            >
                                Block All Threats
                            </button>
                            <button
                                onClick={() => {
                                    setShowCombinationThreatInterceptor(false);
                                    setShowReportSuccess(true);
                                }}
                                className="px-8 py-4 bg-white/5 border border-white/10 text-zinc-300 font-bold rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                            >
                                Report
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
                        className="bg-zinc-900 border border-green-500/30 rounded-2xl max-w-sm w-full p-8 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowReportSuccess(false)}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>

                            <h2 className="text-xl font-bold text-white mb-2">Report Submitted</h2>
                            <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                                Thank you for your contribution. This threat has been logged and CENCERA's global defense network has been updated.
                            </p>

                            <button
                                onClick={() => setShowReportSuccess(false)}
                                className="w-full px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
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
