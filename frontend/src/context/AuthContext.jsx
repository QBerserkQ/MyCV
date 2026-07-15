import { createContext, useContext, useState } from 'react';
import { apiSend } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [credentials, setCredentials] = useState(null);
    // credentials = { username, password } или null, если не залогинен

    const getAuthHeaderFor = (username, password) => {
        const encoded = btoa(`${username}:${password}`);
        return `Basic ${encoded}`;
    };

    const login = async (username, password, currentUserData) => {
        const authHeader = getAuthHeaderFor(username, password);

        const res = await apiSend("/api/user/", "PUT", currentUserData, authHeader);

        if (res.status === 401 || res.status === 403) {
            return false;
        }

        setCredentials({ username, password });
        return true;
    };

    const logout = () => {
        setCredentials(null);
    };

    const getAuthHeader = () => {
        if (!credentials) return null;
        return getAuthHeaderFor(credentials.username, credentials.password);
    };

    return (
        <AuthContext.Provider value={{ credentials, login, logout, getAuthHeader, isLoggedIn: !!credentials }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}