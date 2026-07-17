import { Sparkles, Trophy } from "lucide-react";
import { Panel } from "../Panel";
import { SectionLabel } from "../SectionLabel";

function opacityForCount(count) {
    if (count === 0) return 0.15;
    if (count === 1) return 0.4;
    if (count <= 3) return 0.65;
    return 0.9;
}

export function LeetCodePanel({ stats, loading, error }) {
    if (loading) {
        return (
            <Panel className="p-6">
                <SectionLabel icon={Trophy}>LeetCode / challenge log</SectionLabel>
                <p className="text-xs text-slate-500">Загрузка...</p>
            </Panel>
        );
    }

    if (error || !stats) {
        return (
            <Panel className="p-6">
                <SectionLabel icon={Trophy}>LeetCode / challenge log</SectionLabel>
                <p className="text-xs text-red-400">{error || "Нет данных"}</p>
            </Panel>
        );
    }

    return (
        <Panel className="p-6">
            <SectionLabel icon={Trophy}>LeetCode / challenge log</SectionLabel>
            <div className="flex items-end justify-between">
                <div>
                    <p className="font-serif text-5xl text-white">{stats.totalSolved}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">problems solved</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-semibold text-emerald-300">{stats.streak}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">day streak</p>
                </div>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-wider">
                <div className="rounded border border-emerald-300/20 bg-emerald-300/5 py-3 text-emerald-300">
                    <strong className="block text-lg">{stats.easy}</strong>Easy
                </div>
                <div className="rounded border border-amber-300/20 bg-amber-300/5 py-3 text-amber-200">
                    <strong className="block text-lg">{stats.medium}</strong>Medium
                </div>
                <div className="rounded border border-rose-300/20 bg-rose-300/5 py-3 text-rose-300">
                    <strong className="block text-lg">{stats.hard}</strong>Hard
                </div>
            </div>

            <div
                className="activity-grid mt-7"
                style={{ gridTemplateColumns: "repeat(10, 1fr)" }}
            >
                {stats.days.map((day) => (
                    <span
                        key={day.date}
                        title={`${day.date}: ${day.count} submissions`}
                        style={{ opacity: opacityForCount(day.count) }}
                    />
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-700/60 pt-4 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-300" /> {stats.streak} day streak
                </span>
                <span>submissions last 30 days</span>
            </div>
        </Panel>
    );
}