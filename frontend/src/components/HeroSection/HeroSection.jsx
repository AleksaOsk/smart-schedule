import './HeroSection.css';

function HeroSection() {
    return (
        <section className="hero">
            <h2 className="title">Планировщик повторяющихся задач.</h2>
            <p className="subtitle">
                SmartSchedule автоматически собирает рабочее
            </p>
            <p className="subtitle">
                расписание, распределяет регулярные задачи и помогает
            </p>
            <p className="subtitle">
                ничего не забыть.
            </p>
        </section>
    );
}

export default HeroSection;