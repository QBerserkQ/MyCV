import { BookOpen } from "lucide-react";
import { Panel } from "../Panel";
import { SectionLabel } from "../SectionLabel";

export function EducationPanel({
                                   educations,
                                   educationError,
                                   isLoggedIn,
                                   deleteEducation,
                                   newEducation,
                                   setNewEducation,
                                   handleAddEducation,
                               }) {
    return (
        <Panel className="p-6">
            <SectionLabel icon={BookOpen}>Education & focus</SectionLabel>
            {educationError && <p className="text-red-400 text-xs mb-3">{educationError}</p>}

            {educations.map((edu) => (
                <div key={edu.id} className="relative border-t border-slate-700/60 py-5">
                    <p className="font-serif text-xl text-white">{edu.speciality}</p>
                    <p className="mt-1 text-xs text-slate-200">
                        {edu.institution} · {edu.completedDate ? edu.institution : "Now"}
                    </p>
                    <p className="mt-5 text-xs leading-relaxed text-slate-400">{edu.description}</p>

                    {isLoggedIn && (
                        <button
                            onClick={() => deleteEducation(edu.id)}
                            className="absolute right-0 top-5 text-red-400 hover:text-red-300"
                            title="Удалить"
                        >
                            ×
                        </button>
                    )}
                </div>
            ))}

            {isLoggedIn && (
                <form
                    onSubmit={handleAddEducation}
                    className="mt-2 flex flex-col gap-2 border-t border-slate-700/60 pt-5"
                >
                    <input
                        placeholder="Institution"
                        value={newEducation.institution}
                        onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                        className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200"
                    />
                    <input
                        placeholder="Speciality"
                        value={newEducation.speciality}
                        onChange={(e) => setNewEducation({ ...newEducation, speciality: e.target.value })}
                        className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200"
                    />
                    <input
                        placeholder="Completed date"
                        value={newEducation.completedDate}
                        onChange={(e) => setNewEducation({ ...newEducation, completedDate: e.target.value })}
                        className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200"
                    />
                    <textarea
                        placeholder="Description"
                        value={newEducation.description}
                        onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                        className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200"
                    />
                    <button
                        type="submit"
                        className="mt-1 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#07131e] transition hover:bg-slate-200"
                    >
                        Добавить образование
                    </button>
                </form>
            )}
        </Panel>
    );
}