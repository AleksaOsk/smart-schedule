package user.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.aleksaosk.smart_schedule.user.User;
import ru.aleksaosk.smart_schedule.user.UserMapper;
import ru.aleksaosk.smart_schedule.user.UserRepository;
import ru.aleksaosk.smart_schedule.user.dto.UserRequestDto;
import ru.aleksaosk.smart_schedule.user.dto.UserResponseDto;
import ru.aleksaosk.smart_schedule.user.dto.UserUpdateRequestDto;
import ru.aleksaosk.smart_schedule.user.service.UserService;
import ru.aleksaosk.smart_schedule.user.service.UserServicePrivate;

import java.time.LocalDateTime;

@ExtendWith(MockitoExtension.class)
public abstract class BaseUserServiceTest {
    @Mock
    protected UserRepository userRepository;
    @Mock
    protected UserService userService;
    protected UserMapper userMapper = Mappers.getMapper(UserMapper.class);
    protected UserServicePrivate userServiceImpl;

    protected User user, updatedUser;
    protected UserRequestDto userRequestDto;
    protected UserUpdateRequestDto updatedRequestDto;
    protected UserResponseDto userResponseDto, updateResponseDto;

    @BeforeEach
    void setUp() {
        userServiceImpl = new UserServicePrivate(userRepository, userService, userMapper);

        userRequestDto = new UserRequestDto("name", "login", "password", "email@mai.ru");
        user = new User(1L, userRequestDto.getName(), userRequestDto.getLogin(), userRequestDto.getPassword(),
                userRequestDto.getEmail(), LocalDateTime.now());
        userResponseDto = userMapper.mapToUserResponseDto(user);

        updatedRequestDto = new UserUpdateRequestDto("name1", "login1", "password1", "email1@mai.ru");
        updatedUser = new User(1L, updatedRequestDto.getName(), updatedRequestDto.getLogin(),
                updatedRequestDto.getPassword(), updatedRequestDto.getEmail(), LocalDateTime.now());
        updateResponseDto = userMapper.mapToUserResponseDto(updatedUser);
    }
}