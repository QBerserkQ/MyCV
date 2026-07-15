import { Terminal } from "lucide-react";
import { Panel } from "../Panel";
import { SectionLabel } from "../SectionLabel";

export function SkillsPanel({
                                skills,
                                skillsError,
                                isLoggedIn,
                                deleteSkill,
                                newSkillName,
                                setNewSkillName,
                                newSkillLevel,
                                setNewSkillLevel,
                                handleAddSkill,
                            }) {
    return (
        <Panel className="p-6">
            <SectionLabel icon={Terminal}>Technical skills</SectionLabel>
            {skillsError && <p className="text-red-400 text-xs mb-2">{skillsError}</p>}

            <div className="grid grid-cols-2 gap-2">
                {skills.map((skill) => (
                    <span
                        key={skill.id}
                        className="badge justify-center py-2.5 text-center relative group"
                    >
                        {skill.name}
                        {isLoggedIn && (
                            <button
                                onClick={() => deleteSkill(skill.id)}
                                className="ml-2 text-red-400 hover:text-red-300"
                                title="Удалить"
                            >
                                ×
                            </button>
                        )}
                    </span>
                ))}
            </div>

            {isLoggedIn && (
                <form onSubmit={handleAddSkill} className="mt-4 flex gap-2">
                    <input
                        placeholder="Название"
                        value={newSkillName}
                        onChange={(e) => setNewSkillName(e.target.value)}
                        className="flex-1 rounded bg-slate-800 px-2 py-1 text-sm text-slate-200"
                    />
                    <input
                        placeholder="Уровень"
                        value={newSkillLevel}
                        onChange={(e) => setNewSkillLevel(e.target.value)}
                        className="flex-1 rounded bg-slate-800 px-2 py-1 text-sm text-slate-200"
                    />
                    <button
                        type="submit"
                        className="rounded bg-sky-600 px-3 py-1 text-sm text-white hover:bg-sky-500"
                    >
                        +
                    </button>
                </form>
            )}
        </Panel>
    );
}