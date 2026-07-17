import { SiGithub } from "@icons-pack/react-simple-icons";
import { Panel } from "../Panel";
import { SectionLabel } from "../SectionLabel";

function opacityForCount(count) {
    if (count === 0) return 0.15;
    if (count <= 2) return 0.4;
    if (count <= 5) return 0.65;
    return 0.9;
}

export function GithubPanel({ stats, loading, error }) {
    if (loading) {
        return (
            <Panel className="p-6">
                <SectionLabel icon={SiGithub}>GitHub / activity</SectionLabel>
                <p className="text-xs text-slate-500">Загрузка...</p>
            </Panel>
        );
    }

    if (error || !stats) {
        return (
            <Panel className="p-6">
                <SectionLabel icon={SiGithub}>GitHub / activity</SectionLabel>
                <p className="text-xs text-red-400">{error || "Нет данных"}</p>
            </Panel>
        );
    }

    return (
        <Panel className="p-6">
            <SectionLabel icon={SiGithub}>GitHub / activity</SectionLabel>
            <div className="flex items-end justify-between">
                <div>
                    <p className="font-serif text-5xl text-white">{stats.totalContributions}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">contributions last 30 days</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-semibold text-slate-200">{stats.repositoryCount}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">repositories</p>
                </div>
            </div>

            <div
                className="activity-grid mt-7"
                style={{ gridTemplateColumns: "repeat(10, 1fr)" }}
            >
                {stats.days.map((day) => (
                    <span
                        key={day.date}
                        title={`${day.date}: ${day.count} contributions`}
                        style={{ opacity: opacityForCount(day.count) }}
                    />
                ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Less</span>
                <div className="flex gap-1">
                    <i className="level l1" />
                    <i className="level l2" />
                    <i className="level l3" />
                    <i className="level l4" />
                </div>
                <span>More</span>
                <span className="ml-auto text-slate-400">last 30 days</span>
            </div>
        </Panel>
    );
}