import { useState, useEffect } from "react";
import { apiGet } from "../api/client";

export function useLeetcodeStats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiGet("/api/leetcode-stats")
            .then(setStats)
            .catch(() => setError("Не удалось загрузить статистику LeetCode"))
            .finally(() => setLoading(false));
    }, []);

    return { stats, loading, error };
}