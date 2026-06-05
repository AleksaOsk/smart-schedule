package ru.aleksaosk.smartschedule.impl.exception;

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
