package ru.aleksaosk.smart_schedule.user.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.aleksaosk.smart_schedule.user.User;
import ru.aleksaosk.smart_schedule.user.UserMapper;
import ru.aleksaosk.smart_schedule.user.UserRepository;
import ru.aleksaosk.smart_schedule.user.dto.UserRequestDto;
import ru.aleksaosk.smart_schedule.user.dto.UserResponseDto;
import ru.aleksaosk.smart_schedule.user.dto.UserUpdateRequestDto;
import ru.aleksaosk.smart_schedule.user.service.validator.UserValidator;

@Service
@Slf4j
@AllArgsConstructor
public class UserServicePrivate {
    private UserRepository userRepository;
    private UserService userService;
    private UserMapper userMapper;

    public UserResponseDto addNewUser(UserRequestDto requestDto) {
        UserValidator.checkIsEmailUnique(userRepository.findByEmailIgnoreCase(requestDto.getEmail()));
        UserValidator.checkIsLoginUnique(userRepository.findByLoginIgnoreCase(requestDto.getLogin()));

        User user = userMapper.mapToUser(requestDto);
        UserValidator.checkName(user);
        user = userRepository.save(user);

        UserResponseDto userResponseDto = userMapper.mapToUserResponseDto(user);
        log.info("создан пользователь с email = {}", userResponseDto.getEmail());
        return userResponseDto;
    }

    public UserResponseDto updateUser(Long id, UserUpdateRequestDto requestDto) {
        User oldUser = userService.getUser(id);

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

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
        log.info("удален user с id = {}", id);
    }
}
