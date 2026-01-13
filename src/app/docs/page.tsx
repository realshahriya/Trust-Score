import { Shield, Zap, Eye, Lock, Code, BookOpen, Wallet, ArrowDownUp, ShieldCheck, Activity, ExternalLink, ChevronRight, Terminal, GitBranch, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
    return (
        <div className="p-6 space-y-12 max-w-6xl mx-auto">
            {/* Warning Banner */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-4 py-2 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Notice: Mock data is currently being used for demonstration purposes.</span>
            </div>

            {/* Hero Section - Cyan Primary */}
            <div className="text-center space-y-4 py-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon/10 border border-neon/20 rounded-full mb-4">
                    <BookOpen className="w-4 h-4 text-neon" />
                    <span className="text-sm font-medium text-neon">Documentation</span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-4 font-sans">CENCERA Platform</h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                    The Universal Trust Score Layer for Web3. Real-time blockchain intelligence and threat detection.
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Trust Score Accuracy", value: "99.7%", icon: ShieldCheck },
                    { label: "Chains Supported", value: "15+", icon: GitBranch },
                    { label: "Daily Scans", value: "2.4M+", icon: Activity },
                    { label: "API Latency", value: "<50ms", icon: Zap }
                ].map((stat, i) => (
                    <div key={i} className="bg-zinc-900/50 border border-neon/10 rounded-xl p-6 text-center hover:border-neon/20 transition-all">
                        <stat.icon className="w-6 h-6 text-neon mx-auto mb-3" />
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-xs text-zinc-500">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Introduction */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 bg-neon/10 rounded-xl flex items-center justify-center">
                        <Shield className="w-5 h-5 text-neon" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">What is CENCERA?</h2>
                </div>
                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8 space-y-4">
                    <p className="text-zinc-300 leading-relaxed">
                        CENCERA is a comprehensive blockchain security platform that provides real-time trust scoring and threat detection for wallets, tokens, and smart contracts. Our advanced AI-powered analysis engine evaluates on-chain and off-chain data to generate accurate reputation scores.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-white font-medium">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Real-time Analysis
                            </div>
                            <p className="text-sm text-zinc-500 pl-4">
                                Instant trust scores updated with every transaction
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-white font-medium">
                                <div className="w-2 h-2 bg-neon rounded-full"></div>
                                Multi-Chain Support
                            </div>
                            <p className="text-sm text-zinc-500 pl-4">
                                Coverage across Ethereum, BSC, Polygon, and more
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-white font-medium">
                                <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                                AI-Powered Detection
                            </div>
                            <p className="text-sm text-zinc-500 pl-4">
                                Machine learning models trained on millions of transactions
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Features */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 bg-neon/10 rounded-xl flex items-center justify-center">
                        <Zap className="w-5 h-5 text-neon" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Core Features</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Wallet Analysis - Cyan */}
                    <div className="bg-zinc-900/50 border border-neon/10 rounded-2xl p-6 hover:border-neon/20 transition-all group">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-neon/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <Wallet className="w-6 h-6 text-neon" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">Wallet Analysis</h3>
                                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                                    Comprehensive wallet profiling with transaction history analysis, token holdings evaluation, and interaction patterns assessment. Get instant trust scores for any wallet address.
                                </p>
                                <ul className="space-y-2 text-sm text-zinc-500">
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-neon" />
                                        Transaction history analysis
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-neon" />
                                        Token portfolio assessment
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-neon" />
                                        Behavioral pattern detection
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* DEX Integration - Pink Accent */}
                    <div className="bg-zinc-900/50 border border-brand-pink/10 rounded-2xl p-6 hover:border-brand-pink/20 transition-all group">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-brand-pink/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <ArrowDownUp className="w-6 h-6 text-brand-pink" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">DEX Integration</h3>
                                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                                    Trust scoring for decentralized exchanges and swap protocols. Analyze liquidity pools, token pairs, and smart contract security before executing trades.
                                </p>
                                <ul className="space-y-2 text-sm text-zinc-500">
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-brand-pink" />
                                        Protocol trust scores
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-brand-pink" />
                                        Liquidity pool analysis
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-brand-pink" />
                                        Slippage & fee optimization
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Interceptor */}
                    <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-6 h-6 text-red-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">Transaction Interceptor</h3>
                                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                                    Real-time threat detection that analyzes transactions before they're signed. Prevents interaction with malicious contracts and phishing sites automatically.
                                </p>
                                <ul className="space-y-2 text-sm text-zinc-500">
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-red-400" />
                                        Pre-execution threat scanning
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-red-400" />
                                        Malicious contract detection
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-red-400" />
                                        Phishing site blocking
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Real-time Monitoring - Green Accent */}
                    <div className="bg-zinc-900/50 border border-brand-green/10 rounded-2xl p-6 hover:border-brand-green/20 transition-all group">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <Eye className="w-6 h-6 text-brand-green" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">Real-time Monitoring</h3>
                                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                                    Continuous surveillance of the blockchain landscape. Track threats, monitor wallet activity, and receive instant alerts for suspicious behavior.
                                </p>
                                <ul className="space-y-2 text-sm text-zinc-500">
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-brand-green" />
                                        Live threat intelligence
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-brand-green" />
                                        Activity alerts & notifications
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-brand-green" />
                                        Global threat mapping
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Demos */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 bg-neon/10 rounded-xl flex items-center justify-center">
                        <Terminal className="w-5 h-5 text-neon" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Interactive Playground</h2>
                </div>

                <div className="bg-gradient-to-br from-neon/5 via-brand-purple/5 to-brand-pink/5 border border-neon/10 rounded-2xl p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-3">Try CENCERA Live</h3>
                            <p className="text-zinc-300 mb-4 leading-relaxed">
                                Experience our platform with interactive demos showcasing wallet analysis, DEX swaps, and transaction interception in action.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white font-medium">Wallet Demo</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white font-medium">DEX Demo</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white font-medium">Interceptor Demo</span>
                            </div>
                        </div>
                        <Link
                            href="/playground"
                            className="px-8 py-4 bg-neon/10 hover:bg-neon/20 border border-neon/20 hover:border-neon/30 text-neon font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
                        >
                            Open Playground
                            <ExternalLink className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* API Documentation */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center">
                        <Code className="w-5 h-5 text-brand-orange" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">API Reference</h2>
                </div>

                <div className="space-y-4">
                    {/* Wallet Analysis Endpoint */}
                    <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-neon/20 border border-neon/30 rounded text-xs font-bold text-neon font-mono">POST</span>
                            <code className="text-sm text-zinc-300 font-mono">/api/v1/wallet/analyze</code>
                        </div>
                        <p className="text-sm text-zinc-400 mb-4">Analyze a wallet address and return comprehensive trust score and risk assessment.</p>
                        <div className="bg-black/40 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                            <pre className="text-zinc-300">{`{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f4cB7",
  "chain": "ethereum",
  "includeHistory": true
}`}</pre>
                        </div>
                    </div>

                    {/* Token Scoring Endpoint */}
                    <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-brand-green/20 border border-brand-green/30 rounded text-xs font-bold text-brand-green font-mono">GET</span>
                            <code className="text-sm text-zinc-300 font-mono">/api/v1/token/score/:address</code>
                        </div>
                        <p className="text-sm text-zinc-400 mb-4">Get trust score and security analysis for any ERC-20 token contract.</p>
                        <div className="bg-black/40 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                            <pre className="text-zinc-300">{`// Response
{
  "trustScore": 92,
  "contractVerified": true,
  "liquidityScore": 88,
  "holderDistribution": "healthy",
  "riskLevel": "low"
}`}</pre>
                        </div>
                    </div>

                    {/* Transaction Validation */}
                    <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-brand-purple/20 border border-brand-purple/30 rounded text-xs font-bold text-brand-purple font-mono">POST</span>
                            <code className="text-sm text-zinc-300 font-mono">/api/v1/transaction/validate</code>
                        </div>
                        <p className="text-sm text-zinc-400 mb-4">Validate a transaction before signing to detect potential threats and scams.</p>
                        <div className="bg-black/40 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                            <pre className="text-zinc-300">{`{
  "from": "0x...",
  "to": "0x...",
  "data": "0x...",
  "value": "1000000000000000000"
}`}</pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integration Guide */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 bg-neon/10 rounded-xl flex items-center justify-center">
                        <Lock className="w-5 h-5 text-neon" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Quick Start</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6">
                        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 font-bold text-white">1</div>
                        <h3 className="text-lg font-bold text-white mb-2">Get API Key</h3>
                        <p className="text-sm text-zinc-400 mb-4">
                            Sign up for a CENCERA account and generate your API key from the dashboard.
                        </p>
                        <code className="text-xs bg-black/40 px-3 py-2 rounded text-green-400 font-mono block">
                            API_KEY=cen_xxx...
                        </code>
                    </div>

                    <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6">
                        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 font-bold text-white">2</div>
                        <h3 className="text-lg font-bold text-white mb-2">Install SDK</h3>
                        <p className="text-sm text-zinc-400 mb-4">
                            Install the CENCERA SDK using your preferred package manager.
                        </p>
                        <code className="text-xs bg-black/40 px-3 py-2 rounded text-blue-400 font-mono block">
                            npm install @cencera/sdk
                        </code>
                    </div>

                    <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6">
                        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 font-bold text-white">3</div>
                        <h3 className="text-lg font-bold text-white mb-2">Start Building</h3>
                        <p className="text-sm text-zinc-400 mb-4">
                            Initialize the client and start making API calls.
                        </p>
                        <code className="text-xs bg-black/40 px-3 py-2 rounded text-purple-400 font-mono block">
                            cencera.analyze(...)
                        </code>
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Example Integration</h3>
                    <div className="bg-black/40 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-zinc-300">{`import { CenceraClient } from '@cencera/sdk';

const cencera = new CenceraClient({
  apiKey: process.env.CENCERA_API_KEY
});

// Analyze a wallet
const result = await cencera.wallet.analyze({
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f4cB7',
  chain: 'ethereum'
});

console.log(\`Trust Score: \${result.trustScore}\`);
// Trust Score: 92`}</pre>
                    </div>
                </div>
            </section>

            {/* Support & Resources */}
            <section className="border-t border-white/10 pt-12">
                <div className="text-center space-y-6">
                    <h2 className="text-2xl font-bold text-white">Need Help?</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Join our community, explore documentation, or reach out to our support team for assistance with integration.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="px-6 py-3 bg-neon/10 hover:bg-neon/20 border border-neon/20 hover:border-neon/30 text-neon font-medium rounded-lg transition-all">
                            Contact Support
                        </button>
                        <button className="px-6 py-3 border border-white/10 text-white font-medium rounded-lg hover:bg-white/5 transition-colors">
                            View API Docs
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
