import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import WeekTasks from './components/WeekTasks/WeekTasks';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import AuthModal from './components/AuthModal/AuthModal';
import Profile from './pages/Profile';
import './App.css';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="app">
            <div className="container">
                <Header onLoginClick={() => setIsModalOpen(true)} />

                <Routes>
                    <Route path="/" element={
                        <>
                            <HeroSection />
                            <WeekTasks />
                            <FeedbackForm />
                        </>
                    } />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>

            <AuthModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

export default App;