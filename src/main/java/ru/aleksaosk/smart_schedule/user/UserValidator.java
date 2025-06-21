package ru.aleksaosk.smart_schedule.user;

import ru.aleksaosk.smart_schedule.exception.EmailAlreadyUsedException;
import ru.aleksaosk.smart_schedule.exception.LoginAlreadyUsedException;

import java.util.Optional;

public class UserValidator {
    protected static void checkIsLoginUnique(Optional<User> opt) {
        if (opt.isPresent()) {
            throw new LoginAlreadyUsedException("login is already used");
        }
    }

    protected static void checkIsEmailUnique(Optional<User> opt) {
        if (opt.isPresent()) {
            throw new EmailAlreadyUsedException("email is already used");
        }
    }

    protected static User checkName(User user) {
        if (user.getName().isBlank()) {
            user.setName(user.getLogin());
        }
        return user;
    }
}
