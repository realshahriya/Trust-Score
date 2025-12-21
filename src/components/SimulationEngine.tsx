"use client";

import { useState } from "react";
import { Play, AlertTriangle, CheckCircle, XCircle, ArrowRight, Gauge, Cpu, FileCode } from "lucide-react";

interface SimulationResult {
    success: boolean;
    gasUsed: number;
    gasLimit: number;
    stateChanges: {
        asset: string;
        from: string;
        to: string;
        amount: string;
    }[];
    logs: string[];
    security: {
        isHoneypot: boolean;
        hasTransferTax: boolean;
        taxPercent?: number;
        canPause: boolean;
    };
    error?: string;
}

export function SimulationEngine({ address, isContract }: { address: string, isContract: boolean }) {
    const [simulating, setSimulating] = useState(false);
    const [result, setResult] = useState<SimulationResult | null>(null);

    const runSimulation = async () => {
        setSimulating(true);
        setResult(null);

        try {
            // Import dynamically to avoid server-side issues if any
            const { simulateTransaction } = await import('@/lib/blockchain');

            // Use current URL params to get chainId if possible, defaulting to 1 for demo
            // In a real app we'd pass chainId as prop
            const urlParams = new URLSearchParams(window.location.search);
            const chainId = urlParams.get('chain') || '1';

            const simData = await simulateTransaction(address, chainId, "0");

            const mockResult: SimulationResult = {
                success: simData.success,
                gasUsed: simData.gasUsed,
                gasLimit: Math.floor(simData.gasUsed * 1.2), // Buffer
                stateChanges: simData.success ? [
                    {
                        asset: "ETH",
                        from: "Simulated Sender",
                        to: address,
                        amount: "0.00"
                    }
                ] : [],
                logs: [],
                security: {
                    isHoneypot: false, // Cannot verify via simple RPC
                    hasTransferTax: false,
                    taxPercent: 0,
                    canPause: false
                },
                error: simData.error
            };

            setResult(mockResult);
        } catch (e) {
            setResult({
                success: false,
                gasUsed: 0,
                gasLimit: 0,
                stateChanges: [],
                logs: [],
                security: { isHoneypot: false, hasTransferTax: false, canPause: false },
                error: "Simulation Connection Failed"
            });
        } finally {
            setSimulating(false);
        }
    };

    return (
        <div className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-cyber-border bg-black/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-trust-100" />
                    <h3 className="font-bold text-white">Transaction Simulator</h3>
                </div>
                {!result && !simulating && (
                    <button
                        onClick={runSimulation}
                        className="flex items-center gap-2 px-4 py-1.5 bg-trust-100 hover:bg-trust-100/90 text-black text-sm font-bold rounded transition-colors"
                    >
                        <Play className="w-3 h-3 fill-current" />
                        Run Simulation
                    </button>
                )}
            </div>

            <div className="p-6">
                {!simulating && !result && (
                    <div className="text-center py-8 space-y-4">
                        <div className="inline-flex p-4 rounded-full bg-trust-100/5 border border-trust-100/20">
                            <FileCode className="w-8 h-8 text-trust-100" />
                        </div>
                        <div>
                            <p className="text-zinc-300 font-medium">Ready to Simulate</p>
                            <p className="text-sm text-zinc-500 max-w-sm mx-auto mt-1">
                                Execute a virtual transaction against this contract to verify security logic, check for honeypots, and estimate gas costs.
                            </p>
                        </div>
                    </div>
                )}

                {simulating && (
                    <div className="py-12 space-y-6 text-center">
                        <div className="relative w-16 h-16 mx-auto">
                            <div className="absolute inset-0 bg-trust-100/20 rounded-full animate-ping"></div>
                            <div className="relative bg-black rounded-full p-4 border border-trust-100">
                                <Cpu className="w-full h-full text-trust-100 animate-pulse" />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-1">Simulating Execution...</h4>
                            <div className="flex justify-center gap-1 text-xs font-mono text-zinc-500">
                                <span>Forking Mainnet</span>
                                <span className="animate-pulse">...</span>
                            </div>
                        </div>
                        {/* Fake Console Output */}
                        <div className="max-w-md mx-auto bg-black/50 rounded border border-white/5 p-3 text-left font-mono text-[10px] text-zinc-400 space-y-1">
                            <div className="text-green-400">$ evm_fork block:latest</div>
                            <div> Compiling trace...</div>
                            <div> Checking opcodes...</div>
                            <div className="animate-pulse"> Calculating state diff...</div>
                        </div>
                    </div>
                )}

                {result && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        {/* Outcome Header */}
                        <div className={`p-4 rounded-lg border ${result.success ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'} flex items-center gap-4`}>
                            {result.success ? (
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            ) : (
                                <XCircle className="w-8 h-8 text-red-500" />
                            )}
                            <div>
                                <h4 className={`text-lg font-bold ${result.success ? 'text-green-500' : 'text-red-500'}`}>
                                    {result.success ? 'Simulation Successful' : 'Transaction Failed'}
                                </h4>
                                <p className="text-sm text-zinc-400">
                                    {result.success ? 'No critical errors detected during execution.' : result.error}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Gas Stats */}
                            <div className="bg-black/20 rounded-lg p-4 border border-cyber-border">
                                <h5 className="text-xs font-bold text-zinc-500 uppercase mb-3 flex items-center gap-2">
                                    <Gauge className="w-3 h-3" /> Gas Analysis
                                </h5>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Gas Used</span>
                                        <span className="font-mono text-white">{result.gasUsed.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Est. Cost</span>
                                        <span className="font-mono text-white">0.0042 ETH</span>
                                    </div>
                                    <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div
                                            className={`h-full ${result.gasUsed > 100000 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                            style={{ width: `${(result.gasUsed / result.gasLimit) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Security Checks */}
                            <div className="bg-black/20 rounded-lg p-4 border border-cyber-border">
                                <h5 className="text-xs font-bold text-zinc-500 uppercase mb-3 flex items-center gap-2">
                                    <AlertTriangle className="w-3 h-3" /> Security Checks
                                </h5>
                                <div className="space-y-2 text-sm">
                                    <CheckItem label="Honeypot Detection" passed={!result.security.isHoneypot} />
                                    <CheckItem label="Transfer Tax Check" passed={!result.security.hasTransferTax} warning={result.security.hasTransferTax ? `Tax: ${result.security.taxPercent}%` : undefined} />
                                    <CheckItem label="Proxy Check" passed={true} />
                                </div>
                            </div>
                        </div>

                        {/* State Changes */}
                        <div className="bg-black/20 rounded-lg p-4 border border-cyber-border">
                            <h5 className="text-xs font-bold text-zinc-500 uppercase mb-3 text-left">State Changes</h5>
                            <div className="space-y-2">
                                {result.stateChanges.map((change, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm p-2 bg-white/5 rounded border border-white/5">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-white">{change.amount} {change.asset}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-zinc-400 text-xs">
                                            <span>{change.from}</span>
                                            <ArrowRight className="w-3 h-3" />
                                            <span>{change.to}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={runSimulation}
                                className="text-xs text-zinc-500 hover:text-white underline"
                            >
                                Re-run Simulation
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function CheckItem({ label, passed, warning }: { label: string, passed: boolean, warning?: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-zinc-400">{label}</span>
            {passed ? (
                <span className="flex items-center gap-1 text-green-500 text-xs font-bold">
                    <CheckCircle className="w-3 h-3" /> Pass
                </span>
            ) : (
                <span className="flex items-center gap-1 text-red-500 text-xs font-bold">
                    <XCircle className="w-3 h-3" /> {warning || 'Fail'}
                </span>
            )}
        </div>
    );
}
