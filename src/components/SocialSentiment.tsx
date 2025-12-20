"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SentimentPoint } from "@/lib/mockData";

export function SocialSentiment({ data }: { data: SentimentPoint[] }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="w-full h-[200px] bg-cyber-card/50 rounded-xl border border-cyber-border p-4">
            <h3 className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wide">Social Sentiment 24h</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis
                        dataKey="time"
                        stroke="#666"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#666"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        domain={[-100, 100]}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                        cursor={{ stroke: '#fff', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#00ff9d"
                        strokeWidth={2}
                        dot={{ fill: '#00ff9d', r: 3 }}
                        activeDot={{ r: 6, fill: '#fff' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
