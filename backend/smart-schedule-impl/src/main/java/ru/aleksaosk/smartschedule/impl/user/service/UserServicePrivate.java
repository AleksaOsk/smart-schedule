package ru.aleksaosk.smartschedule.impl.user.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import ru.aleksaosk.smartschedule.impl.user.User;
import ru.aleksaosk.smartschedule.impl.user.UserMapper;
import ru.aleksaosk.smartschedule.impl.user.UserRepository;
import ru.aleksaosk.smartschedule.impl.user.dto.UserRequestDto;
import ru.aleksaosk.smartschedule.impl.user.dto.UserResponseDto;
import ru.aleksaosk.smartschedule.impl.user.dto.UserUpdateRequestDto;
import ru.aleksaosk.smartschedule.impl.user.service.validator.UserValidator;
import ru.aleksaosk.smartschedule.security.service.SecurityService;
import java.util.UUID;

@Service
@Slf4j
@AllArgsConstructor
public class UserServicePrivate {
    private UserRepository userRepository;
    private UserService userService;
    private UserMapper userMapper;
    private SecurityService securityService;

    public UserResponseDto addNewUser(Jwt jwt) {
//        UserValidator.checkIsEmailUnique(userRepository.findByEmailIgnoreCase(requestDto.getEmail()));
//        UserValidator.checkIsLoginUnique(userRepository.findByLoginIgnoreCase(requestDto.getLogin()));

        User user = userMapper.mapToUser(new UserRequestDto());
        UserValidator.checkName(user);
        user = userRepository.save(user);

        UserResponseDto userResponseDto = userMapper.mapToUserResponseDto(user);
        log.info("создан пользователь с email = {}", userResponseDto.getEmail());
        return userResponseDto;
    }

    public UserResponseDto updateUser(UserUpdateRequestDto requestDto) {
        UUID curId = securityService.getCurrentUserId();
        User oldUser = userService.getUser(curId);

        if (!requestDto.getEmail().isBlank() && !oldUser.getEmail().equals(requestDto.getEmail())) {
            UserValidator.checkIsEmailUnique(userRepository.findByEmailIgnoreCase(requestDto.getEmail()));
        }
        if (!requestDto.getLogin().isBlank() && !oldUser.getLogin().equals(requestDto.getLogin())) {
            UserValidator.checkIsLoginUnique(userRepository.findByLoginIgnoreCase(requestDto.getLogin()));
        }

        userMapper.mapToUser(oldUser, requestDto);
        oldUser = userRepository.save(oldUser);

        UserResponseDto userResponseDto = userMapper.mapToUserResponseDto(oldUser);
        log.info("обновлен пользователь с id = {}", userResponseDto.getId());
        return userResponseDto;
    }

    public void deleteUser() {
        UUID curId = securityService.getCurrentUserId();
        userRepository.deleteById(curId);
        log.info("удален user с id = {}", curId);
    }
}
