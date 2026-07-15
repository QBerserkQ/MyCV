import {useState} from "react";
import { useUser } from "@/hooks/useUser";
import { useCrud } from "@/hooks/useCRUD";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "../components/LoginForm";
import { ExperiencePanel } from "../components/panels/ExperiencePanel";
import { ProfilePanel } from "../components/panels/ProfilePanel";
import { Panel } from "../components/Panel";
import { SectionLabel } from "../components/SectionLabel";
import { EducationPanel } from "../components/panels/EducationPanel";
import { SkillsPanel } from "../components/panels/SkillsPanel";
import QuotePanel from "../components/panels/QuotePanel";

import {
    ArrowLeft, ArrowRight, Award, BookOpen, BriefcaseBusiness, ChevronRight, Code2, Database, ExternalLink, Globe2,
    Shield, Sparkles, Terminal, Trophy,
} from "lucide-react";

import {SiGithub} from "@icons-pack/react-simple-icons";

const projects = [
    { name: "Atlas Command", type: "Platform architecture", text: "A real-time operations cockpit that turns complex data into decisive action.", tags: ["React", "Spring Boot", "PostgreSQL"], tone: "from-[#102c3c] via-[#1d6383] to-[#07131e]", glyph: "⌬" },
    { name: "Obsidian Ledger", type: "Fintech product", text: "A calm, secure financial workspace for teams that need to see the whole picture.", tags: ["Java", "Docker", "Redis"], tone: "from-[#24213b] via-[#4d3b75] to-[#11111e]", glyph: "◈" },
    { name: "Warden OS", type: "Developer tooling", text: "A focused release control center for shipping better software with confidence.", tags: ["TypeScript", "Go", "AWS"], tone: "from-[#14362f] via-[#277a69] to-[#071d1a]", glyph: "✦" },
];

export default function Index() {
    const { user, updateUser, error: userError } = useUser();
    const { isLoggedIn } = useAuth();
    const [editingUser, setEditingUser] = useState(false);
    const [userForm, setUserForm] = useState(null);

    const handleUserSave = (e) => {
        e.preventDefault();
        updateUser(userForm);
        setEditingUser(false);
    };

    const [projectIndex, setProjectIndex] = useState(0);
    const project = projects[projectIndex];
    const previous = () => setProjectIndex((projectIndex + projects.length - 1) % projects.length);
    const next = () => setProjectIndex((projectIndex + 1) % projects.length);

    const { items: skills, error: skillsError, addItem: addSkill, deleteItem: deleteSkill } = useCrud("/api/skill/");
    const [newSkillName, setNewSkillName] = useState("");
    const [newSkillLevel, setNewSkillLevel] = useState("");

    const handleAddSkill = (e) => {
        e.preventDefault();
        addSkill({ name: newSkillName, level: newSkillLevel });
        setNewSkillName("");
        setNewSkillLevel("");
    };

    const { items: experiences, error: experienceError, addItem: addExperience, deleteItem: deleteExperience } = useCrud("/api/exp/");
    const [newExperience, setNewExperience] = useState({
        position: ""
        , company: ""
        , startDate: ""
        , endDate: ""
        , description: ""
    });

    const handleAddExperience = (e) => {
        e.preventDefault();
        addExperience(newExperience);
        setNewExperience({
            position: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
        });
    };

    const { items: educations, error: educationError, addItem: addEducation, deleteItem: deleteEducation } = useCrud("/api/education/");

    const [newEducation, setNewEducation] = useState({
        institution: "",
        speciality: "",
        completedDate: "",
        description: "",
    });

    const handleAddEducation = (e) => {
        e.preventDefault();
        addEducation(newEducation);
        setNewEducation({ institution: "", speciality: "", completedDate: "", description: "" });
    };

    return (
        <main className="min-h-screen bg-[#070b10] text-slate-200 selection:bg-sky-400/30">
            <div className="pointer-events-none fixed inset-0 z-0 opacity-30 [background-image:radial-gradient(#8ea4b5_0.6px,transparent_0.6px)] [background-size:32px_32px]" />
            <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-4 sm:px-6 lg:px-10 lg:py-8">
                <header className="mb-5 flex items-center justify-between border-b border-slate-700/40 pb-4">
                    <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center border border-sky-300/60 bg-sky-300/10 text-sm text-sky-200 shadow-[0_0_18px_rgba(56,189,248,.15)]">AK</span><div><p className="font-serif text-lg tracking-wide text-white">{user?.displayName}</p><p className="text-[9px] uppercase tracking-[0.3em] text-slate-500">The Java Developer</p></div></div>
                    <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 md:flex"><a href="#experience" className="transition hover:text-sky-300">Experience</a><a href="#arsenal" className="transition hover:text-sky-300">Arsenal</a><a href="#projects" className="transition hover:text-sky-300">Projects</a></nav>
                    <div className="flex items-center gap-4">
                        <LoginForm />
                    </div>
                </header>

                <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
                    <ProfilePanel
                        user={user}
                        isLoggedIn={isLoggedIn}
                        editingUser={editingUser}
                        setEditingUser={setEditingUser}
                        userForm={userForm}
                        setUserForm={setUserForm}
                        handleUserSave={handleUserSave}
                    />

                    <div className="space-y-5">
                        <Panel className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
                            <div className="rune-mark">✧</div>
                            <div className="absolute right-8 top-8 hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_#7dd3fc]" /> Available for collaboration</div>
                            <SectionLabel icon={Sparkles}>Profile / 204</SectionLabel><div className="max-w-3xl"><h2 className="font-serif text-5xl leading-[0.95] tracking-wide text-white sm:text-7xl lg:text-8xl">Software<br /><span className="text-sky-300">engineer.</span></h2>
                            <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">I design and build resilient digital products where considered architecture meets beautiful, intuitive interfaces. Seven years of turning hard problems into elegant systems.</p></div>
                            <div className="mt-10 flex flex-wrap gap-3"><a href="#projects" className="inline-flex items-center gap-2 bg-sky-300 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#07131e] transition hover:bg-sky-200">View my work <ChevronRight className="h-4 w-4" /></a>
                                <a href="mailto:alex.kim.dev@example.com" className="inline-flex items-center gap-2 border border-slate-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-300 transition hover:border-sky-300/60 hover:text-sky-300">Start a conversation <ExternalLink className="h-3.5 w-3.5" /></a>
                            </div>
                            <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 lg:grid grid-cols-2 gap-4">

                                <div>
                                    <h3 className="text-4xl text-white">200+</h3>
                                    <p className="text-xs text-slate-500">Problems solved</p>
                                </div>

                                <div>
                                    <h3 className="text-4xl text-white">5+</h3>
                                    <p className="text-xs text-slate-500">Projects</p>
                                </div>

                            </div>
                        </Panel>

                        <div id="experience" className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
                            <ExperiencePanel
                                experiences={experiences}
                                experienceError={experienceError}
                                isLoggedIn={isLoggedIn}
                                deleteExperience={deleteExperience}
                                newExperience={newExperience}
                                setNewExperience={setNewExperience}
                                handleAddExperience={handleAddExperience}
                            />
                            <EducationPanel
                                educations={educations}
                                educationError={educationError}
                                isLoggedIn={isLoggedIn}
                                deleteEducation={deleteEducation}
                                newEducation={newEducation}
                                setNewEducation={setNewEducation}
                                handleAddEducation={handleAddEducation}
                            />
                        </div>

                        <div id="arsenal" className="grid gap-5 md:grid-cols-[.85fr_1.15fr]">
                            <SkillsPanel
                                skills={skills}
                                skillsError={skillsError}
                                isLoggedIn={isLoggedIn}
                                deleteSkill={deleteSkill}
                                newSkillName={newSkillName}
                                setNewSkillName={setNewSkillName}
                                newSkillLevel={newSkillLevel}
                                setNewSkillLevel={setNewSkillLevel}
                                handleAddSkill={handleAddSkill}
                            />
                            <QuotePanel />
                        </div>

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
