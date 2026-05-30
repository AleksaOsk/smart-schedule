package ru.aleksaosk.smart_schedule.task;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import ru.aleksaosk.smart_schedule.exception.NotFoundException;

@Getter
@RequiredArgsConstructor
public enum Periodicity {
    EVERY_DAY("everyDay", "Каждый день"),
    EVERY_WEEK("everyWeek", "Каждую неделю"),
    EVERY_TWO_WEEKS("everyTwoWeeks", "Каждые две недели"),
    EVERY_THREE_WEEKS("everyThreeWeeks", "Каждые три недели"),
    EVERY_MONTH("everyMonth", "Каждый месяц"),
    EVERY_TWO_MONTHS("everyTwoMonths", "Каждые два месяца"),
    EVERY_THREE_MONTHS("everyThreeMonths", "Каждые три месяца"),
    EVERY_FOUR_MONTHS("everyFourMonths", "Каждые четыре месяца"),
    EVERY_FIVE_MONTHS("everyFiveMonths", "Каждые пять месяцев"),
    EVERY_SIX_MONTHS("everySixMonths", "Каждые шесть месяцев"),
    EVERY_YEAR("everyYear", "Каждый год");

    private final String value;
    private final String name;

    public Periodicity getPeriodicityByValue(String value) {
        for (Periodicity periodicity : Periodicity.values()) {
            if (periodicity.value.equals(value)) {
                return periodicity;
            }
        }
        throw new NotFoundException("Unknown periodicity value: " + value);
    }
}
