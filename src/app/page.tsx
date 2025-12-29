import { SearchInput } from "@/components/SearchInput";
import { RecentActivity } from "@/components/RecentActivity";
import { StatsCard } from "@/components/StatsCard";
import { ThreatMap } from "@/components/ThreatMap";
import { ShieldCheck, Activity, Globe, Wallet, Plus, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="p-6 space-y-8 relative z-10 overflow-y-auto">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 font-sans">Platform Overview</h1>
          <p className="text-zinc-400 text-sm max-w-xl">
            Real-time surveillance of the decentralized web. Monitor active threats and API usage.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="group px-6 py-2.5 bg-white text-black font-medium text-sm rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-lg shadow-white/5">
            <Plus className="w-4 h-4" />
            <span>New Analysis</span>
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
          {/* Integration Debugger */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-6">
            <div className="max-w-lg w-full space-y-6">
              <div>
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/5">
                  <Zap className="w-6 h-6 text-zinc-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2 font-sans">Integration Debugger</h2>
                <p className="text-zinc-500 text-sm">Test your API keys and simulate trust score requests in real-time.</p>
              </div>

              <div className="space-y-2">
                <SearchInput className="shadow-none" placeholder="Enter endpoint or address to scan..." />
                <div className="flex justify-between text-xs text-zinc-600 font-mono px-1">
                  <span>POST /v1/scan</span>
                  <span>Latency: 24ms</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 text-xs text-zinc-500">
                <span className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 hover:text-zinc-300 cursor-pointer transition-colors">Test: vitalik.eth</span>
                <span className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 hover:text-zinc-300 cursor-pointer transition-colors">Test: Malicious Contract</span>
                <span className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 hover:text-zinc-300 cursor-pointer transition-colors">Test: Uniswap V3</span>
              </div>
            </div>
          </div>

          {/* Network Status / Globe Map Placeholder */}
          <div className="h-64 rounded-xl overflow-hidden border border-white/5 bg-zinc-900/30">
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
