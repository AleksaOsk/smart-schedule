import {useState} from 'react'
import {useAuth} from "../../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';
import './AuthModal.css';

function AuthModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!isChecked) {
            setError('Подтвердите ознакомление с политикой');
            setLoading(false);
            return;
        }

        try {
            if (isLoginMode) {
                await signIn(email, password);
            } else {
                await signUp(email, password);
            }

            // Закрыть модалку и перейти на страницу профиля
            onClose();
            navigate('/profile');

            // Сброс формы
            setEmail('');
            setPassword('');
            setIsChecked(false);
        } catch (err) {
            setError(err.message || 'Ошибка авторизации');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                <div className="modalHeader">
                    <h2 className="modalTitle">{isLoginMode ? 'Вход' : 'Регистрация'}</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="inputWrapper">
                        <input
                            type="email"
                            placeholder="Email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="inputWrapper">
                        <input
                            type="password"
                            placeholder="Пароль"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="checkboxWrapper">
                        <label className="checkboxLabel">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                className="checkbox"
                            />
                            <span className="checkboxText">
                Ознакомлен с <a href="/policy.html" className="policyLink">Политикой</a>
              </span>
                        </label>
                    </div>

                    {error && <div className="errorMessage">{error}</div>}

                    <button type="submit" className="continueBtn" disabled={loading}>
                        {loading ? 'Загрузка...' : (isLoginMode ? 'Войти' : 'Зарегистрироваться')}
                    </button>
                </form>

                <div className="toggleMode">
                    <button
                        type="button"
                        onClick={() => setIsLoginMode(!isLoginMode)}
                        className="toggleBtn"
                    >
                        {isLoginMode ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthModal;