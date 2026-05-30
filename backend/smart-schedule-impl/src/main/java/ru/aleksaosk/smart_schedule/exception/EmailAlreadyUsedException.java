package ru.aleksaosk.smart_schedule.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailAlreadyUsedException extends RuntimeException {
    private String reason;

    public EmailAlreadyUsedException(String reason) {
        this.reason = reason;
    }
}
