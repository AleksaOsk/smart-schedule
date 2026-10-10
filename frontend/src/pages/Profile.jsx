import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

function Profile() {
    const { user, session, signOut, getAuthHeader } = useAuth();
    const [backendResponse, setBackendResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && session) {
            sendToBackend();
        }
    }, [user, session]);

    const sendToBackend = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://smart-schedule-knzq.onrender.com/smart-schedule/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                // Если бэк ждет тело запроса — раскомментируй:
                // body: JSON.stringify({
                //   email: user.email,
                //   supabaseId: user.id
                // }),
            });

            const data = await response.json();
            setBackendResponse({ status: response.status, data });
        } catch (error) {
            setBackendResponse({ status: 'error', error: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        window.location.href = '/';
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1>✅ Вы авторизованы!</h1>

                <div className="user-info">
                    <h2>Информация о пользователе (из Supabase)</h2>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>ID:</strong> {user?.id}</p>
                    <p><strong>Создан:</strong> {new Date(user?.created_at).toLocaleString()}</p>
                </div>

                <div className="backend-info">
                    <h2>Запрос к бэкенду POST /api/users</h2>
                    {loading && <p>⏳ Отправка запроса на бэкенд...</p>}

                    {backendResponse && (
                        <div className={`response ${backendResponse.status === 200 ? 'success' : 'error'}`}>
                            <p><strong>Статус ответа:</strong> {backendResponse.status}</p>
                            <p><strong>Ответ бэкенда:</strong></p>
                            <pre>{JSON.stringify(backendResponse.data || backendResponse.error, null, 2)}</pre>
                        </div>
                    )}

                    {!loading && !backendResponse && (
                        <p>⏳ Ожидание ответа от бэкенда...</p>
                    )}
                </div>

                <button onClick={handleSignOut} className="signout-btn">
                    Выйти
                </button>
            </div>
        </div>
    );
}

export default Profile;