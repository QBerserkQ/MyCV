import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function LoginForm() {
    const { login, logout, isLoggedIn } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    if (isLoggedIn) {
        return <button onClick={logout}>Выйти из админки</button>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Войти</button>
        </form>
    );
}

export default LoginForm;