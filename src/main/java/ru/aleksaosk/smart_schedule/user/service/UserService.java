package ru.aleksaosk.smart_schedule.user.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.aleksaosk.smart_schedule.exception.NotFoundException;
import ru.aleksaosk.smart_schedule.user.User;
import ru.aleksaosk.smart_schedule.user.UserRepository;

import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;

    public User getUser(Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            throw new NotFoundException("user is not exist");
        }
        return userOpt.get();
    }
}
