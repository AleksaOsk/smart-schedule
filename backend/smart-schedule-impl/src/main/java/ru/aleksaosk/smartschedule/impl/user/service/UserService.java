package ru.aleksaosk.smartschedule.impl.user.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.aleksaosk.smartschedule.impl.exception.NotFoundException;
import ru.aleksaosk.smartschedule.impl.user.User;
import ru.aleksaosk.smartschedule.impl.user.UserRepository;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;

    public User getUser(UUID id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            throw new NotFoundException("user is not exist");
        }
        return userOpt.get();
    }
}
