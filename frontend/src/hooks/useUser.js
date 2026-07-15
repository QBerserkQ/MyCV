import { useState, useEffect } from "react";
import { apiGet, apiSend } from "../api/client";
import { useAuth } from "../context/AuthContext";

export function useUser() {
    const { getAuthHeader, logout } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiGet("/api/user/")
            .then(setUser)
            .catch((err) => console.error("Ошибка загрузки:", err))
            .finally(() => setLoading(false));
    }, []);

    const updateUser = async (updatedData) => {
        const res = await apiSend("/api/user/", "PUT", updatedData, getAuthHeader());
        if (res.status === 401 || res.status === 403) {
            setError("Неверный логин или пароль. Войди заново.");
            logout();
            return;
        }
        if (res.ok) {
            const saved = await res.json();
            setUser(saved);
            setError(null);
        }
    };

    return { user, loading, error, updateUser };
}