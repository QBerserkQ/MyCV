const BASE_URL = "http://localhost:8080";

export async function apiGet(path) {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
    return res.json();
}

export async function apiSend(path, method, body, authHeader) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(authHeader ? { Authorization: authHeader } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    return res;
}