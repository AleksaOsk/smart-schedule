import { useState } from 'react';
import './FeedbackForm.css';

function FeedbackForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isFormValid = () => {
        return name.trim() !== '' &&
            email.trim() !== '' &&
            isValidEmail(email) &&
            message.trim() !== '';
    };

    const handleSubmit = () => {
        if (isFormValid()) {
            setSubmitted(true);
            console.log('Отправлено:', { name, email, message });
        }
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        e.target.style.height = 'auto';
        const newHeight = Math.min(e.target.scrollHeight, 500);
        e.target.style.height = `${newHeight}px`;
    };

    if (submitted) {
        return (
            <section className="feedback">
                <div className="successBlock">
                    <div className="successTitle">
                        Ваше сообщение отправлено. Спасибо за вашу обратную связь!
                    </div>
                    <div className="successSubtitle">
                        Мы ответим вам в ближайшее время.
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="feedback">
            <div className="formBlock">
                <div className="formHeader">
                    <h3 className="formTitle">Обратная связь</h3>
                    <p className="formSubtitle">
                        Есть предложения или идеи? Напишите нам.
                    </p>
                </div>

                <div className="inputGroup">
                    <input
                        type="text"
                        placeholder="Имя"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="inputGroup">
                    <input
                        type="email"
                        placeholder="Email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="inputGroup">
                    <textarea
                        placeholder=""
                        className="textarea"
                        value={message}
                        onChange={handleMessageChange}
                        rows={3}
                    />
                </div>

                <button
                    className="submitBtn"
                    onClick={handleSubmit}
                >
                    Отправить
                </button>
            </div>
        </section>
    );
}

export default FeedbackForm;