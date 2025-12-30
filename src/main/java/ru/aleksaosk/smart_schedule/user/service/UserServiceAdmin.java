package ru.aleksaosk.smart_schedule.user.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.aleksaosk.smart_schedule.user.UserMapper;
import ru.aleksaosk.smart_schedule.user.UserRepository;
import ru.aleksaosk.smart_schedule.user.dto.UserResponseDto;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class UserServiceAdmin {
    private UserRepository userRepository;
    private UserService userService;
    private UserMapper userMapper;

    public List<UserResponseDto> getAllUsersDto() {
        return userRepository.findAll().stream()
                .map(userMapper::mapToUserResponseDto)
                .toList();
    }

    public UserResponseDto getUserDto(Long id) {
        log.info("пришел запрос на получение пользователя с id = {}", id);
        return userMapper.mapToUserResponseDto(userService.getUser(id));
    }
}
