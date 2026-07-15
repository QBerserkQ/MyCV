import { useState } from "react";
import { Lock, LockOpen, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../hooks/useUser";

function LoginForm() {
    const { login, logout, isLoggedIn } = useAuth();
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password, user);
        if (!success) {
            setLoginError("Неверный логин или пароль");
            return;
        }
        setUsername("");
        setPassword("");
        setLoginError(null);
        setOpen(false);
    };

    if (isLoggedIn) {
        return (
            <button
                onClick={logout}
                className="flex items-center gap-2 border border-emerald-300/40 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 transition hover:bg-emerald-300/10"
                title="Выйти из админки"
            >
                <LockOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
            </button>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center justify-center border border-slate-600 p-2 text-slate-400 transition hover:border-sky-300/60 hover:text-sky-300"
                title="Вход для администратора"
            >
                <Lock className="h-4 w-4" />
            </button>

            {open && (
                <div className="knight-panel absolute right-0 top-full z-20 mt-2 w-64 p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300/75">
                            Admin access
                        </span>
                        <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-300">
                            <X className="h-3.5 w-3.5" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="rounded bg-slate-800 px-3 py-2 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-sky-300/50"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded bg-slate-800 px-3 py-2 text-sm text-slate-200 outline-none focus:ring-1 focus:ring-sky-300/50"
                        />
                        <button
                            type="submit"
                            className="mt-1 bg-sky-300 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#07131e] transition hover:bg-sky-200"
                        >
                            login
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default LoginForm;