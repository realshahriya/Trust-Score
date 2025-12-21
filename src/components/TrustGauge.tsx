"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TrustGaugeProps {
    score: number; // 0 to 100
    size?: number;
    showLabel?: boolean;
}

export function TrustGauge({ score, size = 200, showLabel = true }: TrustGaugeProps) {
    const [displayScore, setDisplayScore] = useState(0);

    // Animate the number counting up
    useEffect(() => {
        const duration = 1500; // ms
        const steps = 60;
        const stepTime = duration / steps;
        const increment = score / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= score) {
                setDisplayScore(score);
                clearInterval(timer);
            } else {
                setDisplayScore(Math.floor(current));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [score]);

    // Determine color based on score
    const getColor = (s: number) => {
        if (s >= 80) return "text-trust-100"; // Green
        if (s >= 50) return "text-yellow-500"; // Amber
        return "text-red-500"; // Red
    };

    const strokeColor = score >= 80 ? "#00ff9d" : score >= 50 ? "#eab308" : "#ef4444";

    // SVG Config
    const strokeWidth = size < 100 ? 5 : 15; // Thinner stroke for small sizes
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
            {/* Background Circle */}
            <svg className="absolute transform -rotate-90 w-full h-full">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-white/5"
                />
                {/* Progress Circle */}
                <motion.circle
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_10px_rgba(0,255,157,0.3)]"
                />
            </svg>

            {/* Score Text */}
            <div className="flex flex-col items-center z-10" style={{ transform: `scale(${size / 200})` }}>
                {/* 
                    Using a scale transform is smoother for arbitrary sizes than breakpoints 
                    Base size is 200px, so we scale relative to that.
                 */}
                <div className="flex flex-col items-center justify-center">
                    <span className={`text-5xl font-bold tracking-tighter ${getColor(score)} drop-shadow-md`}>
                        {displayScore}
                    </span>
                    {showLabel && (
                        <span className="text-xs text-zinc-500 uppercase tracking-widest mt-1 whitespace-nowrap">Trust Score</span>
                    )}
                </div>
            </div>

            {/* Decorative pulse ring for high scores */}
            {score >= 80 && size > 60 && (
                <div className="absolute inset-0 rounded-full border border-trust-100/20 animate-ping opacity-20" />
            )}
        </div>
    );
}
