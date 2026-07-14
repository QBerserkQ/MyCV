import {useEffect, useState} from "react";
import {
    ArrowLeft, ArrowRight, Award, BookOpen, BriefcaseBusiness, Check,
    ChevronRight, Code2, Database, Download, ExternalLink, Globe2,
    Mail, MapPin, Menu, Shield, Sparkles, Terminal, Trophy, UserRound,
} from "lucide-react";

import { SiGithub, SiTelegram } from "@icons-pack/react-simple-icons";

const experience = [
    { year: "2022 — now", company: "Northstar Labs", role: "Senior Full Stack Engineer", text: "Architecting resilient services and expressive interfaces for a collaborative analytics platform." },
    { year: "2020 — 2022", company: "Horizon Systems", role: "Software Engineer", text: "Delivered core product features across the stack, from data modeling to polished React workflows." },
    { year: "2018 — 2020", company: "Fieldwork Studio", role: "Frontend Developer", text: "Translated ambitious product ideas into accessible, performant web experiences." },
];

const projects = [
    { name: "Atlas Command", type: "Platform architecture", text: "A real-time operations cockpit that turns complex data into decisive action.", tags: ["React", "Spring Boot", "PostgreSQL"], tone: "from-[#102c3c] via-[#1d6383] to-[#07131e]", glyph: "⌬" },
    { name: "Obsidian Ledger", type: "Fintech product", text: "A calm, secure financial workspace for teams that need to see the whole picture.", tags: ["Java", "Docker", "Redis"], tone: "from-[#24213b] via-[#4d3b75] to-[#11111e]", glyph: "◈" },
    { name: "Warden OS", type: "Developer tooling", text: "A focused release control center for shipping better software with confidence.", tags: ["TypeScript", "Go", "AWS"], tone: "from-[#14362f] via-[#277a69] to-[#071d1a]", glyph: "✦" },
];

const tech = ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker", "Git", "JavaScript", "AWS", "Redis"];

function Panel({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
    return <section id={id} className={`knight-panel ${className}`}>{children}</section>;
}

function SectionLabel({ icon: Icon, children }: { icon: typeof Shield; children: React.ReactNode }) {
    return <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300/75"><Icon className="h-4 w-4 text-sky-300" /> {children}</div>;
}

export default function Index() {
    const [projectIndex, setProjectIndex] = useState(0);
    const project = projects[projectIndex];
    const previous = () => setProjectIndex((projectIndex + projects.length - 1) % projects.length);
    const next = () => setProjectIndex((projectIndex + 1) % projects.length);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/user/")
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Ошибка загрузки:", err);
                setLoading(false);
            });
    }, []);

    return (
        <main className="min-h-screen bg-[#070b10] text-slate-200 selection:bg-sky-400/30">
            <div className="pointer-events-none fixed inset-0 z-0 opacity-30 [background-image:radial-gradient(#8ea4b5_0.6px,transparent_0.6px)] [background-size:32px_32px]" />
            <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-4 sm:px-6 lg:px-10 lg:py-8">
                <header className="mb-5 flex items-center justify-between border-b border-slate-700/40 pb-4">
                    <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center border border-sky-300/60 bg-sky-300/10 text-sm text-sky-200 shadow-[0_0_18px_rgba(56,189,248,.15)]">AK</span><div><p className="font-serif text-lg tracking-wide text-white">{user?.displayName}</p><p className="text-[9px] uppercase tracking-[0.3em] text-slate-500">The Java Developer</p></div></div>
                    <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 md:flex"><a href="#experience" className="transition hover:text-sky-300">Experience</a><a href="#arsenal" className="transition hover:text-sky-300">Arsenal</a><a href="#projects" className="transition hover:text-sky-300">Projects</a></nav>
                    <a href="mailto:alex.kim.dev@example.com" className="hidden items-center gap-2 border border-sky-300/35 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-sky-200 transition hover:bg-sky-300/10 sm:flex">Contact <Mail className="h-3.5 w-3.5" /></a><Menu className="h-5 w-5 text-slate-400 sm:hidden" />
                </header>

                <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
                    <Panel className="flex flex-col p-5 sm:p-6 lg:sticky lg:top-8 lg:h-fit">
                        <div className="portrait-frame mb-6"><div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_50%_35%,#52718b_0,#1d2a35_32%,#0b1118_72%)]"><div className="relative mt-5 text-center"><Shield className="mx-auto h-28 w-28 text-slate-300/50" strokeWidth={1} /><span className="absolute inset-0 flex items-center justify-center pt-4 font-serif text-5xl text-sky-200/80">AK</span></div></div><span className="absolute bottom-3 left-3 border border-sky-300/35 bg-[#081119]/90 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-sky-200">Portrait placeholder</span></div>
                        <div className="mb-6"><h1 className="font-serif text-3xl tracking-wide text-white">{user?.displayName}</h1><p className="mt-1 text-sm font-medium text-sky-300">Java Developer</p><p className="mt-3 text-xs leading-relaxed text-slate-400">It always seems impossible until it's done.</p></div>
                        <div className="space-y-3 border-y border-slate-700/60 py-5 text-xs text-slate-400"><p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-sky-300/80" />{user?.country}</p>
                            <a href="mailto:vk4935391@gmail.com" className="flex items-center gap-3 transition hover:text-sky-300"><Mail className="h-4 w-4 text-sky-300/80" />{user?.email}</a>
                            <a href="https://t.me/v_pelmen_v" target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-sky-300"><SiTelegram className="h-4 w-4 text-sky-300/80" />@v_pelmen_v</a>
                            <a href="https://github.com/QBerserkQ" target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-sky-300"><SiGithub className="h-4 w-4 text-sky-300/80" />github.com/QBerserkQ</a></div>
                        <div className="mt-6 flex items-center justify-between"><span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-300"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" /> Open to quests</span><button onClick={() => window.print()} className="text-slate-500 transition hover:text-sky-300" title="Print CV"><Download className="h-4 w-4" /></button></div>
                    </Panel>

                    <div className="space-y-5">
                        <Panel className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
                            <div className="rune-mark">✧</div>
                            <div className="absolute right-8 top-8 hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_#7dd3fc]" /> Available for collaboration</div>
                            <SectionLabel icon={Sparkles}>Profile / 204</SectionLabel><div className="max-w-3xl"><h2 className="font-serif text-5xl leading-[0.95] tracking-wide text-white sm:text-7xl lg:text-8xl">Software<br /><span className="text-sky-300">engineer.</span></h2>
                            <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">I design and build resilient digital products where considered architecture meets beautiful, intuitive interfaces. Seven years of turning hard problems into elegant systems.</p></div>
                            <div className="mt-10 flex flex-wrap gap-3"><a href="#projects" className="inline-flex items-center gap-2 bg-sky-300 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#07131e] transition hover:bg-sky-200">View my work <ChevronRight className="h-4 w-4" /></a>
                                <a href="mailto:alex.kim.dev@example.com" className="inline-flex items-center gap-2 border border-slate-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-300 transition hover:border-sky-300/60 hover:text-sky-300">Start a conversation <ExternalLink className="h-3.5 w-3.5" /></a>
                            </div>
                        </Panel>

                        <div id="experience" className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
                            <Panel className="p-6"><SectionLabel icon={BriefcaseBusiness}>Professional experience</SectionLabel>
                                <div className="space-y-0">{experience.map((item) => <article key={item.company} className="grid gap-3 border-t border-slate-700/60 py-5 sm:grid-cols-[105px_1fr]"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.year}</p><div><h3 className="font-serif text-xl text-white">{item.company}</h3><p className="mt-0.5 text-xs font-semibold text-sky-300">{item.role}</p>
                                    <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate-400">{item.text}</p></div></article>)}
                                </div>
                            </Panel>
                            <Panel className="p-6"><SectionLabel icon={BookOpen}>Education & focus</SectionLabel>
                                <div className="border-t border-slate-700/60 py-5"><p className="font-serif text-xl text-white">B.S. Computer Science</p>
                                <p className="mt-1 text-xs text-sky-300">Technical University of Moldova · current</p><p className="mt-5 text-xs leading-relaxed text-slate-400">Distributed systems, human-computer interaction, and the craft of making software last.</p>
                                </div>
                                <div className="mt-2 border-t border-slate-700/60 pt-5">
                                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Current focus</p>
                                    <div className="mt-3 flex flex-wrap gap-2"><span className="badge"><Code2 className="h-3 w-3" />Spring Boot</span><span className="badge">
                                        <Database className="h-3 w-3" /> Data systems</span>
                                    </div>
                                </div>
                            </Panel>
                        </div>

                        <div id="arsenal" className="grid gap-5 md:grid-cols-[.85fr_1.15fr]">
                            <Panel className="p-6"><SectionLabel icon={Terminal}>Technical skills</SectionLabel><div className="grid grid-cols-2 gap-2">{tech.map((item) => <span key={item} className="badge justify-center py-2.5 text-center">{item}</span>)}</div></Panel>
                            <Panel className="p-6"><SectionLabel icon={Award}>The arsenal</SectionLabel><div className="grid gap-5 sm:grid-cols-2"><div><p className="mb-2 flex justify-between text-xs text-slate-300">
                                <span>Backend architecture</span><span className="text-sky-300">92%</span></p>
                                <div className="stat-bar"><span className="w-[92%]" /></div></div><div><p className="mb-2 flex justify-between text-xs text-slate-300"><span>Frontend craft</span><span className="text-sky-300">88%</span></p><div className="stat-bar"><span className="w-[88%]" /></div></div><div><p className="mb-2 flex justify-between text-xs text-slate-300"><span>Cloud & DevOps</span><span className="text-sky-300">84%</span></p><div className="stat-bar"><span className="w-[84%]" /></div></div><div><p className="mb-2 flex justify-between text-xs text-slate-300"><span>System design</span><span className="text-sky-300">90%</span></p><div className="stat-bar"><span className="w-[90%]" /></div></div></div></Panel></div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <Panel className="p-6"><SectionLabel icon={Trophy}>LeetCode / challenge log</SectionLabel>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="font-serif text-5xl text-white">247</p>
                                        <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">problems solved</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-semibold text-emerald-300">Top 8%</p>
                                        <p className="text-[10px] uppercase tracking-wider text-slate-500">global ranking</p>
                                    </div>
                                </div>
                                <div className="mt-7 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-wider">
                                    <div className="rounded border border-emerald-300/20 bg-emerald-300/5 py-3 text-emerald-300">
                                        <strong className="block text-lg">118</strong>Easy
                                    </div>
                                    <div className="rounded border border-amber-300/20 bg-amber-300/5 py-3 text-amber-200">
                                        <strong className="block text-lg">96</strong>Medium
                                    </div>
                                    <div className="rounded border border-rose-300/20 bg-rose-300/5 py-3 text-rose-300">
                                        <strong className="block text-lg">33</strong>Hard
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-between border-t border-slate-700/60 pt-4 text-xs text-slate-400">
                                    <span className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-emerald-300" /> 42 day streak</span>
                                    <span>Last solved today</span>
                                </div>
                            </Panel>
                            <Panel className="p-6"><SectionLabel icon={SiGithub}>GitHub / activity</SectionLabel><div className="flex items-end justify-between">
                                <div>
                                    <p className="font-serif text-5xl text-white">1,428</p>
                                    <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">contributions this year</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-semibold text-sky-300">26</p>
                                    <p className="text-[10px] uppercase tracking-wider text-slate-500">repositories</p>
                                </div>
                            </div>
                                <div className="activity-grid mt-7">{
                                    Array.from({ length: 84 }, (_, i) => <span key={i} style={{ opacity: [0.2, 0.4, 0.65, 0.9][(i * 7) % 4] }} />)}
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                                    <span>Less</span>
                                    <div className="flex gap-1"><i className="level l1" /><i className="level l2" /><i className="level l3" /><i className="level l4" />
                                    </div>
                                    <span>More</span>
                                    <span className="ml-auto text-slate-400">128 commits / 2024</span></div>
                            </Panel>
                        </div>

                        <Panel id="projects" className="overflow-hidden p-6 sm:p-8">
                            <div className="flex items-end justify-between">
                                <div><SectionLabel icon={Globe2}>Project gallery / field notes</SectionLabel>
                                    <h2 className="font-serif text-3xl text-white sm:text-4xl">Proof of craft.</h2>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={previous} className="metal-button" aria-label="Previous project">
                                        <ArrowLeft className="h-4 w-4" />
                                    </button>
                                    <button onClick={next} className="metal-button" aria-label="Next project">
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-8 grid gap-7 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
                                <div className={`project-art bg-gradient-to-br ${project.tone}`}>
                                    <div className="scanlines" />
                                    <span className="project-glyph">{project.glyph}</span>
                                    <span className="absolute bottom-4 left-5 text-[9px] uppercase tracking-[0.28em] text-white/60">Project {String(projectIndex + 1).padStart(2, "0")} / 03
                                    </span>
                                    <span className="absolute right-5 top-4 flex items-center gap-2 text-[9px] uppercase tracking-widest text-emerald-300">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Online
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">{project.type}</p>
                                    <h3 className="mt-3 font-serif text-4xl text-white">{project.name}</h3>
                                    <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">{project.text}</p>
                                    <div className="mt-6 flex flex-wrap gap-2">{project.tags.map((tag) =>
                                        <span key={tag} className="badge">{tag}</span>)}
                                    </div>
                                    <a href="https://github.com" target="_blank" rel="noreferrer"
                                       className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-300 transition hover:text-white">View repository
                                        <SiGithub className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                            <div className="mt-8 flex gap-1.5">{projects.map((item, index) =>
                                <button key={item.name} onClick={() => setProjectIndex(index)} aria-label={`Show ${item.name}`} className={`h-1 transition-all ${index === projectIndex ? "w-10 bg-sky-300" : "w-5 bg-slate-700 hover:bg-slate-500"}`} />)}
                            </div>
                        </Panel>
                    </div>
                </div>

                <footer className="flex flex-col gap-3 px-2 pb-3 pt-8 text-[10px] uppercase tracking-[0.2em] text-slate-600 sm:flex-row sm:justify-between">
                    <span>© 2026 {user?.displayName} · Built </span>
                    <span className="flex items-center gap-2"><Shield className="h-3 w-3" /> Only Good Vibes!</span>
                </footer>

            </div>
        </main>
    );
}
