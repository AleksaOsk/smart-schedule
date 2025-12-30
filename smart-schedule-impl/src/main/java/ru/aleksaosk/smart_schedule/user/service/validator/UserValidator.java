package ru.aleksaosk.smart_schedule.user.service.validator;

import ru.aleksaosk.smart_schedule.exception.EmailAlreadyUsedException;
import ru.aleksaosk.smart_schedule.exception.LoginAlreadyUsedException;
import ru.aleksaosk.smart_schedule.exception.NotFoundException;
import ru.aleksaosk.smart_schedule.user.User;

import java.util.Optional;

public class UserValidator {
    public static void checkIsLoginUnique(Optional<User> opt) {
        if (opt.isPresent()) {
            throw new LoginAlreadyUsedException("login is already used");
        }
    }

    public static void checkIsEmailUnique(Optional<User> opt) {
        if (opt.isPresent()) {
            throw new EmailAlreadyUsedException("email is already used");
        }
    }

    public static void checkName(User user) {
        if (user.getName().isBlank()) {
            user.setName(user.getLogin());
        }
    }
}
