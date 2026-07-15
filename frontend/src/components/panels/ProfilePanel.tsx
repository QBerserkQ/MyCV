import { MapPin, Mail, Shield, Download } from "lucide-react";
import { SiTelegram, SiGithub, SiLeetcode } from "@icons-pack/react-simple-icons";
import { Panel } from "../Panel";

export function ProfilePanel({
                                 user,
                                 isLoggedIn,
                                 editingUser,
                                 setEditingUser,
                                 userForm,
                                 setUserForm,
                                 handleUserSave,
                             }) {
    return (
        <Panel className="flex flex-col p-5 sm:p-6 lg:sticky lg:top-8 lg:h-fit">
            <div className="portrait-frame mb-6">
                <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_50%_35%,#52718b_0,#1d2a35_32%,#0b1118_72%)]">
                    <div className="relative mt-5 text-center">
                        <Shield className="mx-auto h-28 w-28 text-slate-300/50" strokeWidth={1} />
                        <span className="absolute inset-0 flex items-center justify-center pt-4 font-serif text-5xl text-sky-200/80">AK</span>
                    </div>
                </div>
                <span className="absolute bottom-3 left-3 border border-sky-300/35 bg-[#081119]/90 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-sky-200">
                    Portrait placeholder
                </span>
            </div>

            {isLoggedIn && (
                <button
                    onClick={() => setEditingUser((prev) => !prev)}
                    className="mb-3 self-start text-[10px] uppercase tracking-wider text-sky-300 hover:text-sky-200"
                >
                    {editingUser ? "Отменить" : "Редактировать профиль"}
                </button>
            )}

            {editingUser ? (
                <form onSubmit={handleUserSave} className="mb-6 flex flex-col gap-2">
                    <input
                        value={userForm?.displayName || ""}
                        onChange={(e) => setUserForm({ ...userForm, displayName: e.target.value })}
                        placeholder="Имя"
                        className="rounded bg-slate-800 px-2 py-1 text-sm text-white"
                    />
                    <input
                        value={userForm?.country || ""}
                        onChange={(e) => setUserForm({ ...userForm, country: e.target.value })}
                        placeholder="Страна"
                        className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200"
                    />
                    <input
                        value={userForm?.email || ""}
                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                        placeholder="Email"
                        className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200"
                    />
                    <input
                        value={userForm?.telegram || ""}
                        onChange={(e) => setUserForm({ ...userForm, telegram: e.target.value })}
                        placeholder="Telegram login"
                        className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200"
                    />
                    <input
                        value={userForm?.urlLeet || ""}
                        onChange={(e) => setUserForm({ ...userForm, urlLeet: e.target.value })}
                        placeholder="LeetCode url"
                        className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200"
                    />
                    <input
                        value={userForm?.urlGit || ""}
                        onChange={(e) => setUserForm({ ...userForm, urlGit: e.target.value })}
                        placeholder="GitHub url"
                        className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200"
                    />
                    <button
                        type="submit"
                        className="mt-1 bg-sky-300 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#07131e] hover:bg-sky-200"
                    >
                        Сохранить
                    </button>
                </form>
            ) : (
                <>
                    <div className="mb-6">
                        <h1 className="font-serif text-3xl tracking-wide text-white">{user?.displayName}</h1>
                        <p className="mt-1 text-sm font-medium text-sky-300">Java Developer</p>
                        <p className="mt-3 text-xs leading-relaxed text-slate-400">It always seems impossible until it's done.</p>
                    </div>
                    <div className="space-y-3 border-y border-slate-700/60 py-5 text-xs text-slate-400">
                        <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-sky-300/80" />{user?.country}</p>
                        <a href={`mailto:${user?.email}`} className="flex items-center gap-3 transition hover:text-sky-300">
                            <Mail className="h-4 w-4 text-sky-300/80" />{user?.email}
                        </a>
                        <a href={`https://t.me/${user?.telegram}`} className="flex items-center gap-3 transition hover:text-sky-300">
                            <SiTelegram className="h-4 w-4 text-sky-300/80" />{user?.telegram}
                        </a>
                        <a href={`${user?.urlGit}`} className="flex items-center gap-3 transition hover:text-sky-300">
                            <SiGithub className="h-4 w-4 text-sky-300/80" />{user?.urlGit}
                        </a>
                        <a href={`${user?.urlLeet}`} className="flex items-center gap-3 transition hover:text-sky-300">
                            <SiLeetcode className="h-4 w-4 text-sky-300/80" />{user?.urlLeet}
                        </a>
                    </div>
                </>
            )}

            <div className="mt-6 flex items-center justify-between">
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-300">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" /> Open to quests
                </span>
                <button onClick={() => window.print()} className="text-slate-500 transition hover:text-sky-300" title="Print CV">
                    <Download className="h-4 w-4" />
                </button>
            </div>
        </Panel>
    );
}