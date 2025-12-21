"use client";

import { Check, Copy, Shield, AlertTriangle, Blocks, Lock } from "lucide-react";
import { useState } from "react";

export default function ApiDocsPage() {
    const [copied, setCopied] = useState(false);

    const copyCode = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-8 relative z-10 overflow-y-auto h-full max-w-6xl mx-auto space-y-16">

            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold text-white">Developer API</h1>
                    <span className="px-3 py-1 rounded-full bg-trust-100/10 border border-trust-100/30 text-trust-100 text-xs font-bold uppercase tracking-wider">
                        Production Ready
                    </span>
                </div>
                <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
                    The enterprise standard for on-chain reputation. Protect your users from honeypots, drainers, and malicious contracts with a single API call.
                </p>
                <div className="flex gap-4 pt-4">
                    <button className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors">
                        Get API Key
                    </button>
                    <button className="px-6 py-2 bg-white/5 text-white font-bold rounded border border-white/10 hover:bg-white/10 transition-colors">
                        Read Full Docs
                    </button>
                </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                    icon={Shield}
                    title="Real-Time Scoring"
                    desc="Sub-second analysis of any EVM address using heuristics and AI."
                />
                <FeatureCard
                    icon={AlertTriangle}
                    title="SoftBlock Technology"
                    desc="Intelligent warning system that alerts users without breaking flow."
                />
                <FeatureCard
                    icon={Blocks}
                    title="Multi-Chain Support"
                    desc="Native support for Ethereum, Polygon, Arbitrum, Optimism, and Base."
                />
            </div>

            {/* endpoints */}
            <div className="space-y-12">
                <div className="border-b border-cyber-border pb-4 mb-8">
                    <h2 className="text-2xl font-bold text-white">Endpoints</h2>
                </div>

                {/* GET /analyze */}
                <section className="space-y-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                            <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded font-mono text-sm font-bold border border-green-500/20">GET</span>
                            <code className="text-2xl font-mono text-white">/v1/analyze</code>
                        </div>
                        <p className="text-zinc-400 text-lg">
                            Returns a comprehensive trust profile for a given entity, including simulated execution results and SoftBlock status.
                        </p>
                    </div>

                    {/* Request Example */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Request</h3>
                            <CodeBlock
                                onCopy={() => copyCode('curl "https://api.trustlayer.io/v1/analyze?target=0x123...&chain=1"')}
                                code={`curl -X GET "https://api.trustlayer.io/v1/analyze?target=0xdac17...&chain=1&min_score=70" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                            />

                            <div>
                                <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-4">Configuration Parameters</h3>
                                <div className="border border-cyber-border rounded-lg overflow-hidden">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-white/5 text-zinc-400 font-medium">
                                            <tr>
                                                <th className="px-4 py-3">Param</th>
                                                <th className="px-4 py-3">Type</th>
                                                <th className="px-4 py-3">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 text-zinc-300">
                                            <tr>
                                                <td className="px-4 py-3 font-mono text-trust-100">target</td>
                                                <td className="px-4 py-3 font-mono text-xs">string</td>
                                                <td className="px-4 py-3">Address, ENS, or Contract to analyze.</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-mono text-trust-100">chain</td>
                                                <td className="px-4 py-3 font-mono text-xs">integer</td>
                                                <td className="px-4 py-3">Chain ID. Default: 1.</td>
                                            </tr>
                                            <tr className="bg-trust-100/5">
                                                <td className="px-4 py-3 font-mono text-trust-100">min_score</td>
                                                <td className="px-4 py-3 font-mono text-xs">0-100</td>
                                                <td className="px-4 py-3">Custom threshold for SOFTBLOCK. Default: 50.</td>
                                            </tr>
                                            <tr className="bg-trust-100/5">
                                                <td className="px-4 py-3 font-mono text-trust-100">strict</td>
                                                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                                                <td className="px-4 py-3">If true, SOFTBLOCKs become BLOCKs.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Response Example */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Response with Custom Config</h3>
                            <CodeBlock
                                onCopy={() => copyCode('{...}')}
                                code={`{
  "id": "0xdac17...",
  "score": 65,
  "config": {
    "min_score_threshold": 70,
    "strict_mode": false
  },
  "softblock": {
    "status": "SOFTBLOCK",
    "reason": "Score 65 is below threshold 70",
    "triggers": [
      "LOW_LIQUIDITY",
      "RECENTLY_DEPLOYED"
    ]
  }
}`}
                            />
                            <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-sm text-zinc-400">
                                <p>
                                    In this example, the entity scored <span className="text-white font-bold">65</span>.
                                    Because you set <code className="text-trust-100">min_score=70</code>, this entity is returned as a <span className="text-yellow-400 font-bold">SOFTBLOCK</span>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SoftBlock Detail */}
                    <div className="bg-gradient-to-r from-trust-100/5 to-transparent rounded-xl border-l-4 border-trust-100 p-6 space-y-4">
                        <h4 className="font-bold text-white text-lg flex items-center gap-2">
                            <Lock className="w-5 h-5 text-trust-100" />
                            Implementing SoftBlock™ Middleware
                        </h4>
                        <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
                            SoftBlock allows you to maintain high conversion rates while protecting users. Instead of blocking transaction execution flow, inspect the
                            <code className="mx-1 px-1 bg-white/10 rounded text-trust-100 font-mono text-xs">softblock.status</code> field.
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="flex gap-3 items-start p-3 bg-black/40 rounded border border-cyber-border">
                                <span className="mt-1 w-2 h-2 rounded-full bg-green-500 shrink-0" />
                                <div>
                                    <div className="font-mono text-green-400 font-bold text-xs">ALLOW</div>
                                    <div className="text-xs text-zinc-500 mt-1">Entity is safe. Proceed silently.</div>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start p-3 bg-black/40 rounded border border-cyber-border">
                                <span className="mt-1 w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
                                <div>
                                    <div className="font-mono text-yellow-400 font-bold text-xs">SOFTBLOCK</div>
                                    <div className="text-xs text-zinc-500 mt-1">Suspicious. Show "Proceed with Caution" modal.</div>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start p-3 bg-black/40 rounded border border-cyber-border">
                                <span className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                                <div>
                                    <div className="font-mono text-red-400 font-bold text-xs">BLOCK</div>
                                    <div className="text-xs text-zinc-500 mt-1">Confirmed Malicious. Disable submission.</div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Rate Limits & Errors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-cyber-border">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Rate Limits</h3>
                            <div className="p-4 bg-cyber-card rounded-lg border border-cyber-border space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Free Tier</span>
                                    <span className="text-white font-mono">1,000 req/min</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Pro Tier</span>
                                    <span className="text-white font-mono">10,000 req/min</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Enterprise</span>
                                    <span className="text-trust-100 font-mono">Unlimited</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Error Codes</h3>
                            <table className="w-full text-left text-sm">
                                <tbody className="divide-y divide-white/5 text-zinc-400">
                                    <tr>
                                        <td className="py-2 font-mono text-red-400">400</td>
                                        <td className="py-2">Invalid Address Format</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 font-mono text-red-400">401</td>
                                        <td className="py-2">Invalid API Key</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 font-mono text-red-400">429</td>
                                        <td className="py-2">Rate Limit Exceeded</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* UX Integration & Popups */}
                    <div className="space-y-8 pt-8 border-t border-cyber-border">
                        <h3 className="text-2xl font-bold text-white mb-4">UI Integration & Popups</h3>
                        <p className="text-zinc-400">
                            We recommend implementing standardized modal patterns for <span className="text-yellow-400 font-mono">SOFTBLOCK</span> and <span className="text-red-500 font-mono">BLOCK</span> responses.
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Example Code */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">React Implementation</h4>
                                <CodeBlock
                                    onCopy={() => copyCode('')}
                                    code={`// Example: Protecting a Transaction Button
if (score.softblock.status === 'SOFTBLOCK') {
  setShowWarningModal(true);
  return; 
}

if (score.softblock.status === 'BLOCK') {
  toast.error("Transaction blocked due to high risk");
  return;
}

// Proceed if ALLOW
sendTransaction();`}
                                />
                            </div>

                            {/* Visual Preview */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Recommended UI Pattern</h4>

                                {/* Mock Modal */}
                                <div className="bg-black/80 rounded-xl border border-white/10 p-6 relative overflow-hidden backdrop-blur-sm">
                                    <div className="absolute inset-0 bg-yellow-500/5 mix-blend-overlay" />

                                    <div className="relative z-10 text-center space-y-4">
                                        <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <AlertTriangle className="w-6 h-6 text-yellow-500" />
                                        </div>
                                        <h5 className="text-lg font-bold text-white">Security Warning</h5>
                                        <p className="text-sm text-zinc-400">
                                            The recipient 0x123...abc has been flagged for suspicious activity (Phishing Reports).
                                        </p>
                                        <div className="flex gap-3 justify-center pt-2">
                                            <button className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold">Cancel</button>
                                            <button className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold">I understand the risk</button>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-center text-zinc-500 mt-2">Example "SoftBlock" Modal</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="p-6 bg-cyber-card border border-cyber-border rounded-xl hover:border-trust-100/30 transition-colors group">
            <div className="w-10 h-10 bg-trust-100/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-trust-100/20 transition-colors">
                <Icon className="w-5 h-5 text-trust-100" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-zinc-400">{desc}</p>
        </div>
    );
}

function CodeBlock({ code, onCopy }: { code: string, onCopy: () => void }) {
    const [copied, setCopied] = useState(false);
    return (
        <div className="bg-[#0D0D11] border border-cyber-border rounded-xl overflow-hidden group">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-cyber-border">
                <span className="text-xs text-zinc-500 font-mono">BASH</span>
                <button
                    onClick={() => { onCopy(); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                    className="text-zinc-500 hover:text-white transition-colors"
                >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-sm text-zinc-300">
                    {code}
                </pre>
            </div>
        </div>
    );
}
