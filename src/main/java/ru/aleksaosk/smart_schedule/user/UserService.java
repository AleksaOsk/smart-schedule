package ru.aleksaosk.smart_schedule.user;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.aleksaosk.smart_schedule.exception.NotFoundException;
import ru.aleksaosk.smart_schedule.user.dto.UserRequestDto;
import ru.aleksaosk.smart_schedule.user.dto.UserResponseDto;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;

    public UserResponseDto addNewUser(UserRequestDto requestDto) {
        log.info("пришел запрос на создание нового user с login = {}, email = {}",
                requestDto.getLogin(), requestDto.getEmail());

        UserValidator.checkIsEmailUnique(userRepository.findByEmailIgnoreCase(requestDto.getEmail()));
        UserValidator.checkIsLoginUnique(userRepository.findByLoginIgnoreCase(requestDto.getLogin()));

        User user = UserMapper.mapToUser(requestDto);
        UserValidator.checkName(user);
        user = userRepository.save(user);

        return UserMapper.mapToUserResponseDto(user);
    }

    public void deleteUser(Long id) {
        log.info("пришел запрос на удаление user с id = {}", id);
        userRepository.deleteById(id);
    }

    public List<UserResponseDto> getAllUsersDto() {
        return userRepository.findAll().stream()
                .map(UserMapper::mapToUserResponseDto)
                .toList();
    }

    public UserResponseDto getUserDto(Long id) {
        log.info("пришел запрос на получение пользователя с id = {}", id);
        return UserMapper.mapToUserResponseDto(getUser(id));
    }

    public User getUser(Long id) {
        Optional<User> opt = userRepository.findById(id);
        if (opt.isEmpty()) {
            throw new NotFoundException("user was not found");
        }
        return opt.get();
    }
}
