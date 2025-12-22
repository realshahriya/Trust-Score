"use client";

import { SearchInput } from "@/components/SearchInput";
import { RecentActivity } from "@/components/RecentActivity";
import { StatsCard } from "@/components/StatsCard";
import { ThreatMap } from "@/components/ThreatMap";
import { ShieldCheck, Activity, Globe, Wallet, AlertTriangle } from "lucide-react";

export default function Home() {
  return (
    <div className="p-6 space-y-8 relative z-10 overflow-y-auto">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Platform Overview</h1>
          <p className="text-zinc-400">Real-time surveillance of the decentralized web.</p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-trust-100 text-black font-bold rounded hover:bg-trust-100/90 transition-colors">
            New Analysis
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="System Uptime"
          value="99.99%"
          trend="Stable"
          trendUp={true}
          icon={ShieldCheck}
          description="Service availability"
        />
        <StatsCard
          title="API Requests"
          value="4.2M"
          trend="+12%"
          trendUp={true}
          icon={Activity}
          description="Your usage this month"
        />
        <StatsCard
          title="Active Keys"
          value="3/5"
          trend="Active"
          trendUp={true}
          icon={Globe}
          description="Provisioned endpoints"
        />
        <StatsCard
          title="Current Usage"
          value="$1,240"
          trend="+8%"
          trendUp={true}
          icon={Wallet}
          description="Month to date"
        />
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Chart / Search Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* API Test Console */}
          <div className="bg-gradient-to-br from-cyber-card to-black border border-cyber-border rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-trust-100/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10 max-w-lg w-full space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Integration Debugger</h2>
                <p className="text-zinc-400">Test your API keys and simulate trust score requests in real-time.</p>
              </div>

              <div className="space-y-2">
                <SearchInput className="shadow-2xl shadow-trust-100/10" placeholder="Enter endpoint or address to scan..." />
                <div className="flex justify-between text-xs text-zinc-500 font-mono">
                  <span>POST /v1/scan</span>
                  <span>Latency: 24ms</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 text-xs text-zinc-500">
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10 hover:border-trust-100/50 cursor-pointer transition-colors">Test: vitalik.eth</span>
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10 hover:border-trust-100/50 cursor-pointer transition-colors">Test: Malitious Contract</span>
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10 hover:border-trust-100/50 cursor-pointer transition-colors">Test: Uniswap V3</span>
              </div>
            </div>
          </div>

          {/* Network Status / Globe Map Placeholder */}
          <div className="h-64">
            <ThreatMap />
          </div>
        </div>

        {/* Right Sidebar: Activity Feed */}
        <div className="h-[600px]">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
