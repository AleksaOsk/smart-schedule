package ru.aleksaosk.smartschedule.impl.user.service.validator;

import ru.aleksaosk.smartschedule.impl.exception.EmailAlreadyUsedException;
import ru.aleksaosk.smartschedule.impl.exception.LoginAlreadyUsedException;
import ru.aleksaosk.smartschedule.impl.user.User;
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
