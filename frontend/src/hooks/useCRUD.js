import { useState, useEffect, useCallback } from "react";
import { apiGet, apiSend } from "../api/client";
import { useAuth } from "../context/AuthContext";

export function useCrud(path) {
    const { getAuthHeader, logout } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchItems = useCallback(() => {
        setLoading(true);
        apiGet(path)
            .then(setItems)
            .catch(() => setError("Не удалось загрузить данные"))
            .finally(() => setLoading(false));
    }, [path]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const addItem = async (data) => {
        const res = await apiSend(path, "POST", data, getAuthHeader());
        if (res.status === 401 || res.status === 403) {
            setError("Неверный логин или пароль. Войди заново.");
            logout();
            return;
        }
        if (res.status === 201) {
            const newItem = await res.json();
            setItems((prev) => [...prev, newItem]);
            setError(null);
        }
    };

    const deleteItem = async (id) => {
        const res = await apiSend(`${path}${id}`, "DELETE", null, getAuthHeader());
        if (res.status === 401 || res.status === 403) {
            setError("Неверный логин или пароль. Войди заново.");
            logout();
            return;
        }
        if (res.status === 204) {
            setItems((prev) => prev.filter((item) => item.id !== id));
            setError(null);
        }
    };

    return { items, loading, error, addItem, deleteItem };
}