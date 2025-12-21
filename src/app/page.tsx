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
          title="Global Trust Score"
          value="84/100"
          trend="-1.2%"
          trendUp={false}
          icon={ShieldCheck}
          description="Network average health"
        />
        <StatsCard
          title="Active Scans"
          value="452,190"
          trend="+8.5%"
          trendUp={true}
          icon={Activity}
          description="Entities analyzed last 24h"
        />
        <StatsCard
          title="Risky Entities"
          value="12,832"
          trend="+124"
          trendUp={false}
          icon={AlertTriangle}
          description="High risk alerts pending"
        />
        <StatsCard
          title="Verified Protocol"
          value="$82.4B"
          icon={Wallet}
          description="Total TVL monitored"
        />
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Chart / Search Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Hero */}
          <div className="bg-gradient-to-br from-cyber-card to-black border border-cyber-border rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-trust-100/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10 max-w-lg w-full space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Deep Scan Analysis</h2>
                <p className="text-zinc-400">Enter a wallet address, ENS domain, or contract to generate a comprehensive trust report.</p>
              </div>

              <SearchInput className="shadow-2xl shadow-trust-100/10" />

              <div className="flex flex-wrap justify-center gap-2 text-xs text-zinc-500">
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10">vitalik.eth</span>
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10">0x742d...44e</span>
                <span className="px-2 py-1 bg-white/5 rounded border border-white/10">uniswap</span>
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
