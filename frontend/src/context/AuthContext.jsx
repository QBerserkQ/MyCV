import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [credentials, setCredentials] = useState(null);
    // credentials = { username, password } или null, если не залогинен

    const login = (username, password) => {
        setCredentials({ username, password });
    };

    const logout = () => {
        setCredentials(null);
    };

    // Готовый заголовок Authorization, чтобы не собирать его в каждом компоненте
    const getAuthHeader = () => {
        if (!credentials) return null;
        const encoded = btoa(`${credentials.username}:${credentials.password}`);
        return `Basic ${encoded}`;
    };

    return (
        <AuthContext.Provider value={{ credentials, login, logout, getAuthHeader, isLoggedIn: !!credentials }}>
            {children}
        </AuthContext.Provider>
    );
}

// Удобный хук, чтобы не писать useContext(AuthContext) каждый раз
export function useAuth() {
    return useContext(AuthContext);
}