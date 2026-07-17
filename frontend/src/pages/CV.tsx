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
import { ProjectsPanel } from "../components/panels/ProjectsPanel";
import { useGithubStats } from "../hooks/useGithubStats";
import { useLeetcodeStats } from "../hooks/useLeetcodeStats";
import { GithubPanel } from "../components/panels/GithubPanel";
import { LeetCodePanel } from "../components/panels/LeetCodePanel";
import { useState, useEffect } from "react";

import {
    ChevronRight, ExternalLink, Shield, Sparkles, Trophy,
} from "lucide-react";



export default function Index() {
    const { user, updateUser, error: userError } = useUser();
    const { isLoggedIn } = useAuth();
    const [editingUser, setEditingUser] = useState(false);
    const [userForm, setUserForm] = useState(null);

    useEffect(() => {
        if (user) setUserForm(user);
    }, [user]);

    const handleUserSave = (e) => {
        e.preventDefault();
        updateUser(userForm);
        setEditingUser(false);
    };

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

    const { items: projects, error: projectsError, addItem: addProject, deleteItem: deleteProject } = useCrud("/api/project/");

    const [newProject, setNewProject] = useState({
        theme: "",
        title: "",
        description: "",
        gitUrl: "",
        imageUrl: "",
        skillsInput: "", // временное поле для ввода через запятую
    });

    const handleAddProject = (e) => {
        e.preventDefault();
        const skills = newProject.skillsInput
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

        addProject({
            theme: newProject.theme,
            title: newProject.title,
            description: newProject.description,
            gitUrl: newProject.gitUrl,
            imageUrl: newProject.imageUrl,
            skills,
        });

        setNewProject({ theme: "", title: "", description: "", gitUrl: "", imageUrl: "", skillsInput: "" });
    };

    const { stats: githubStats, loading: githubLoading, error: githubError } = useGithubStats();
    const { stats: leetcodeStats, loading: leetcodeLoading, error: leetcodeError } = useLeetcodeStats();

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-white/20">
            <div
                className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-20 blur-[3px]"
                style={{ backgroundImage: "url('/mount1.jpg')" }}
            />
            <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-4 sm:px-6 lg:px-10 lg:py-8">
                <header className="mb-5 flex items-center justify-between border-b border-slate-700/40 pb-4">
                    <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center border border-slate-300/60 bg-white/10 text-sm text-white shadow-[0_0_18px_rgba(56,189,248,.15)]">VC</span><div><p className="font-serif text-lg tracking-wide text-white">{user?.displayName}</p><p className="text-[9px] uppercase tracking-[0.3em] text-slate-500">The Java Developer</p></div></div>
                    <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 md:flex"><a href="#experience" className="transition hover:text-slate-200">Experience</a><a href="#arsenal" className="transition hover:text-slate-200">Arsenal</a><a href="#projects" className="transition hover:text-slate-200">Projects</a></nav>
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
                            <div className="rune-mark">{''}</div>
                            <div className="absolute right-8 top-8 hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_#7dd3fc]" /> Available for collaboration</div>
                            <SectionLabel icon={Sparkles}>Profile / 204</SectionLabel><div className="max-w-3xl"><h2 className="font-serif text-5xl leading-[0.95] tracking-wide text-white sm:text-7xl lg:text-8xl">Software<br /><span className="text-slate-200">engineer.</span></h2>
                            <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">I design and build resilient digital products where considered architecture meets beautiful, intuitive interfaces. Seven years of turning hard problems into elegant systems.</p></div>
                            <div className="mt-10 flex flex-wrap gap-3"><a href="#projects" className="inline-flex items-center gap-2 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#07131e] transition hover:bg-slate-200">View my work <ChevronRight className="h-4 w-4" /></a>
                                <a href="mailto:alex.kim.dev@example.com" className="inline-flex items-center gap-2 border border-slate-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-300 transition hover:border-slate-300/60 hover:text-slate-200">Start a conversation <ExternalLink className="h-3.5 w-3.5" /></a>
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
                            <LeetCodePanel stats={leetcodeStats} loading={leetcodeLoading} error={leetcodeError} />
                            <GithubPanel stats={githubStats} loading={githubLoading} error={githubError} />
                        </div>

                        <ProjectsPanel
                            projects={projects}
                            projectsError={projectsError}
                            isLoggedIn={isLoggedIn}
                            deleteProject={deleteProject}
                            newProject={newProject}
                            setNewProject={setNewProject}
                            handleAddProject={handleAddProject}
                        />
                    </div>
                </div>

                <footer className="flex flex-col gap-3 px-2 pb-3 pt-8 text-[10px] uppercase tracking-[0.2em] text-slate-600 sm:flex-row sm:justify-between">
                    <span>© 2026 {user?.displayName} · Built </span>
                    <span>Anastasia♡</span>
                    <span className="flex items-center gap-2"><Shield className="h-3 w-3" /> Only Good Vibes!</span>
                </footer>

            </div>
        </main>
    );
}
