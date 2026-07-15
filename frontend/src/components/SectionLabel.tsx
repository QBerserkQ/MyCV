import { Shield } from "lucide-react";

export function SectionLabel({ icon: Icon, children }: { icon: typeof Shield; children: React.ReactNode }) {
    return (
        <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-sky-300/75">
            <Icon className="h-4 w-4 text-sky-300" /> {children}
        </div>
    );
}