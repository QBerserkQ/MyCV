import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:8080/api/skill/';

function AddSkillForm({ onSkillAdded }) {
    const { getAuthHeader, isLoggedIn, logout } = useAuth();
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [error, setError] = useState(null);

    if (!isLoggedIn) return null; // форма видна только залогиненным

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getAuthHeader(),
            },
            body: JSON.stringify({ name, level }),
        }).then((res) => {
            if (res.status === 401 || res.status === 403) {
                setError('Неверный логин или пароль. Войди заново.');
                logout();
                return;
            }
            if (res.status === 201) {
                return res.json().then((newSkill) => {
                    setName('');
                    setLevel('');
                    setError(null);
                    onSkillAdded(newSkill); // сообщаем родителю, что добавили
                });
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Добавить скилл</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                placeholder="название (java, sql...)"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="уровень (lalala, expert...)"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
            />
            <button type="submit">Добавить</button>
        </form>
    );
}

export default AddSkillForm;