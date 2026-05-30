CREATE TABLE IF NOT EXISTS smart_schedule.users(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(254) NOT NULL UNIQUE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS smart_schedule.weekdays(
    name VARCHAR(20) NOT NULL,
    is_working_day BOOLEAN NOT NULL,
    time_start TIME NOT NULL,
    time_end TIME NOT NULL,
    is_night BOOLEAN NOT NULL,
    user_id uuid NOT NULL,
    PRIMARY KEY (name, user_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS smart_schedule.tasks(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    duration int NOT NULL,
    is_only_night BOOLEAN NOT NULL,
    is_only_daytime BOOLEAN NOT NULL,
    periodicity VARCHAR(20) NOT NULL,
    priority VARCHAR(20) NOT NULL,
    last_time DATE NOT NULL,
    user_id uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);