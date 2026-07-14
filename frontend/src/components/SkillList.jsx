import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:8080/api/skill/';

function SkillList() {
    const { getAuthHeader, isLoggedIn, logout } = useAuth();
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState(null);

    const fetchSkills = () => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setSkills(data))
            .catch(() => setError('Не удалось загрузить скиллы'));
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleDelete = (id) => {
        fetch(`${API_URL}${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: getAuthHeader(),
            },
        }).then((res) => {
            if (res.status === 401 || res.status === 403) {
                setError('Неверный логин или пароль. Войди заново.');
                logout();
                return;
            }
            if (res.status === 204) {
                setSkills((prev) => prev.filter((skill) => skill.id !== id));
                setError(null);
            }
        });
    };

    return (
        <div>
            <h2>Скиллы</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul>
                {skills.map((skill) => (
                    <li key={skill.id}>
                        {skill.name} ({skill.level})
                        {isLoggedIn && (
                            <button onClick={() => handleDelete(skill.id)}>Удалить</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SkillList;