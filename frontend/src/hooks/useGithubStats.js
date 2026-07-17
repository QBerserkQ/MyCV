import { useState, useEffect } from "react";
import { apiGet } from "../api/client";

export function useGithubStats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiGet("/api/github-stats")
            .then(setStats)
            .catch(() => setError("Не удалось загрузить статистику GitHub"))
            .finally(() => setLoading(false));
    }, []);

    return { stats, loading, error };
}