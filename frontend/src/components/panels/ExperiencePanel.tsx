import { BriefcaseBusiness } from "lucide-react";
import { Panel } from "../Panel";
import { SectionLabel } from "../SectionLabel";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export function ExperiencePanel({
                                    experiences,
                                    experienceError,
                                    isLoggedIn,
                                    deleteExperience,
                                    newExperience,
                                    setNewExperience,
                                    handleAddExperience,
                                }) {
    return (
        <Panel className="p-6">
            <SectionLabel icon={BriefcaseBusiness}>Professional experience</SectionLabel>
            {experienceError && <p className="text-red-400 text-xs mb-3">{experienceError}</p>}

            <div className="space-y-0">
                {experiences.map((item: { id: Key; startDate: string | any[]; endDate: string | any[]; company: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode>>; position: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode>>; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode>>; }) => (
                    <article key={item.id} className="grid gap-3 border-t border-slate-700/60 py-5 sm:grid-cols-[105px_1fr]">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            {item.startDate.slice(0, 4)} — {item.endDate ? item.endDate.slice(0, 4) : "Now"}
                        </p>
                        <div className="relative">
                            <h3 className="font-serif text-xl text-white">{item.company}</h3>
                            <p className="mt-0.5 text-xs font-semibold text-slate-200">{item.position}</p>
                            <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate-400">{item.description}</p>
                            {isLoggedIn && (
                                <button onClick={() => deleteExperience(item.id)} className="absolute right-0 top-0 text-red-400 hover:text-red-300">×</button>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {isLoggedIn && (
                <form onSubmit={handleAddExperience} className="mt-5 flex flex-col gap-2 border-t border-slate-700/60 pt-5">
                    <input placeholder="Position" value={newExperience.position} onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })} className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200" />
                    <input placeholder="Company" value={newExperience.company} onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })} className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200" />
                    <div className="flex gap-2">
                        <input placeholder="Start date (yyyy-mm-dd)" value={newExperience.startDate} onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })} className="flex-1 rounded bg-slate-800 px-2 py-1 text-sm text-slate-200" />
                        <input placeholder="End date (yyyy-mm-dd)" value={newExperience.endDate} onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })} className="flex-1 rounded bg-slate-800 px-2 py-1 text-sm text-slate-200" />
                    </div>
                    <textarea placeholder="Description" value={newExperience.description} onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })} className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200" />
                    <button type="submit" className="mt-1 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#07131e] transition hover:bg-slate-200">Добавить опыт</button>
                </form>
            )}
        </Panel>
    );
}