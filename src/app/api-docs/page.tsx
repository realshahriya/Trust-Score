"use client";

import { Navbar } from "@/components/Navbar";
import { Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";

export default function ApiDocsPage() {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText('curl -X GET "https://api.trustlayer.io/v1/score?address=0x123..."');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-cyber-bg text-white">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 pt-24 pb-12">
                <h1 className="text-4xl font-bold mb-4">Trust API <span className="text-trust-100 uppercase text-lg tracking-widest border border-trust-100/30 px-2 py-1 rounded-md ml-2 bg-trust-100/10">v1.0 Beta</span></h1>
                <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
                    Integrate the Universal Trust Score into your dApp, wallet, or exchange.
                    Real-time risk scoring for any EVM address or NFT collection.
                </p>

                {/* Endpoints */}
                <div className="space-y-12">

                    {/* GET /score */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-md font-mono text-sm border border-blue-500/20">GET</span>
                            <h2 className="text-2xl font-semibold">/v1/score</h2>
                        </div>
                        <p className="text-zinc-400 mb-6">Retrieve the aggregated trust score and risk break-down for a specific entity.</p>

                        {/* Code Block */}
                        <div className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-cyber-border">
                                <span className="text-xs text-zinc-500 font-mono">Example Request</span>
                                <button onClick={copyCode} className="text-zinc-500 hover:text-white transition-colors">
                                    {copied ? <Check className="w-4 h-4 text-trust-100" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="p-6 font-mono text-sm overflow-x-auto">
                                <div className="flex gap-2 text-zinc-300">
                                    <span className="text-pink-500">$</span>
                                    <span className="text-trust-80">curl</span>
                                    <span>-X GET "https://api.trustlayer.io/v1/score?address=0xAb5...123"</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide">Query Parameters</h3>
                            <div className="grid grid-cols-[1fr_2fr] gap-4 text-sm border-t border-cyber-border pt-4">
                                <div className="font-mono text-trust-100">address</div>
                                <div className="text-zinc-400">The wallet address, ENS domain, or contract address to analyze.</div>

                                <div className="font-mono text-trust-100">network</div>
                                <div className="text-zinc-400">Optional. Chain ID (e.g. 1 for Ethereum, 137 for Polygon). Default: 1.</div>
                            </div>
                        </div>
                    </section>

                    {/* Response */}
                    <section>
                        <div className="bg-cyber-card border border-cyber-border rounded-xl p-6">
                            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-4">Example Response</h3>
                            <pre className="font-mono text-xs md:text-sm text-zinc-400 overflow-x-auto leading-relaxed">
                                {`{
  "status": "success",
  "data": {
    "address": "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    "score": 98,
    "label": "Safe",
    "risk_factors": [
      {
        "severity": "low",
        "code": "WHALE_ACTIVITY",
        "message": "High volume transactions detected."
      }
    ],
    "last_updated": "2023-10-27T10:30:00Z"
  }
}`}
                            </pre>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}
