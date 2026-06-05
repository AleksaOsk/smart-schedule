package ru.aleksaosk.smartschedule.impl.task;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import ru.aleksaosk.smartschedule.impl.exception.NotFoundException;

@Getter
@RequiredArgsConstructor
public enum Priority {
    NO("no", "Нет"), // нет приоритета, можно сдвигать больше чем на 1 день до даты или позже
    DAY_BEFORE("dayBefore", "Можно сдвинуть на день раньше"),
    DAY_BEFORE_OR_AFTER("dayBeforeOrAfter", "Можно сдвинуть на день раньше или позже"),
    DAY_TO_DAY("dayToDay", "Обязательно день в день");
    private final String value;
    private final String name;

    public Priority getPriorityByValue(String value) {
        for (Priority priority : Priority.values()) {
            if (priority.value.equals(value)) {
                return priority;
            }
        }
        throw new NotFoundException("Unknown priority value: " + value);
    }
}
