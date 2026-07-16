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

const CLOUDINARY_CLOUD_NAME = "b7jpn8bl";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";

export async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!res.ok) {
        throw new Error("Ошибка загрузки изображения");
    }

    const data = await res.json();
    return data.secure_url;
}