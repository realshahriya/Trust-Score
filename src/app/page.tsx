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
          <h1 className="text-3xl font-bold text-white mb-2 font-sans">Platform Overview</h1>
          <p className="text-zinc-400 font-mono text-sm">Real-time surveillance of the decentralized web.</p>
        </div>

        <div className="flex gap-3">
          <button className="group relative px-6 py-3 bg-neon text-black font-mono font-bold hover:bg-white transition-colors">
            <span className="relative z-10">New Analysis</span>
            <div className="absolute inset-0 bg-white translate-x-1 translate-y-1 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform border border-black"></div>
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
          <div className="bg-gradient-to-br from-surface via-surface to-neon/5 border border-subtle rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden group hover:border-neon/30 transition-colors">
            <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10 max-w-lg w-full space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2 font-sans">Integration Debugger</h2>
                <p className="text-zinc-400 font-mono text-sm">Test your API keys and simulate trust score requests in real-time.</p>
              </div>

              <div className="space-y-2">
                <SearchInput className="shadow-2xl shadow-neon/10" placeholder="Enter endpoint or address to scan..." />
                <div className="flex justify-between text-xs text-zinc-500 font-mono">
                  <span>POST /v1/scan</span>
                  <span>Latency: 24ms</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 text-xs text-zinc-500">
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10 hover:border-neon/50 cursor-pointer transition-colors">Test: vitalik.eth</span>
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10 hover:border-neon/50 cursor-pointer transition-colors">Test: Malitious Contract</span>
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10 hover:border-neon/50 cursor-pointer transition-colors">Test: Uniswap V3</span>
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
