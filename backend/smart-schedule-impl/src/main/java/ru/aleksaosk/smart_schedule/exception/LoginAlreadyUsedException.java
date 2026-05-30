package ru.aleksaosk.smart_schedule.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginAlreadyUsedException extends RuntimeException {
    private String reason;

    public LoginAlreadyUsedException(String reason) {
        this.reason = reason;
    }
}
