export function Panel({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
    return <section id={id} className={`knight-panel ${className}`}>{children}</section>;
}