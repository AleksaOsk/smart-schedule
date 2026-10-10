import './WeekTasks.css';

const tasksData = [
    { day: 'Пн', time: '09:00', title: 'Оплатить сервер', desc: 'Ежемесячная оплата инфраструктуры' },
    { day: 'Вт', time: '10:30', title: 'Созвон с командой', desc: 'Обсуждение спринта на неделю' },
    { day: 'Ср', time: '14:00', title: 'Код-ревью', desc: 'Проверить PR коллег по проекту' },
    { day: 'Чт', time: '11:00', title: 'Заполнить отчет', desc: 'Подготовить метрики за неделю' },
    { day: 'Пт', time: '16:30', title: 'Бэкенд деплой', desc: 'Выкатить обновления на тестовый стенд' },
    { day: 'Сб', time: '12:00', title: 'Разобрать почту', desc: 'Ответить на важные письма' },
    { day: 'Вс', time: '18:00', title: 'План на неделю', desc: 'Составить список задач' },
];

function WeekTasks() {
    return (
        <section className="section">
            <div className="grid">
                {tasksData.map((task, idx) => (
                    <div key={idx} className="card">
                        <div className="cardHeader">
                            <span className="day">{task.day}</span>
                            <span className="time">{task.time}</span>
                        </div>
                        <div className="taskTitle">{task.title}</div>
                        <div className="taskDesc">{task.desc}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default WeekTasks;