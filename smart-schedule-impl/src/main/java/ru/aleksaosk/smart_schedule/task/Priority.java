package ru.aleksaosk.smart_schedule.task;

public enum Priority {
    NO, //нет приоритета, можно сдвигать больше чем на 1 день до даты или позже
    DAY_BEFORE, //можно сдвинуть только на день раньше
    DAY_BEFORE_OR_AFTER, //можно сдвинуть на 1 день до или на 1 день после
    DAY_TO_DAY //обязательно выполнять день в день
}
