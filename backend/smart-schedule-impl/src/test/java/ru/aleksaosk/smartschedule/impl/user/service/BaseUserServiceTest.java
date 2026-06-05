package ru.aleksaosk.smartschedule.impl.user.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.aleksaosk.smartschedule.impl.user.User;
import ru.aleksaosk.smartschedule.impl.user.UserMapper;
import ru.aleksaosk.smartschedule.impl.user.UserRepository;
import ru.aleksaosk.smartschedule.impl.user.dto.UserRequestDto;
import ru.aleksaosk.smartschedule.impl.user.dto.UserResponseDto;
import ru.aleksaosk.smartschedule.impl.user.dto.UserUpdateRequestDto;
import ru.aleksaosk.smartschedule.security.service.SecurityService;
import java.time.LocalDateTime;
import java.util.UUID;

@ExtendWith(MockitoExtension.class)
public abstract class BaseUserServiceTest {
    @Mock
    protected UserRepository userRepository;
    @Mock
    protected UserService userService;
    protected UserMapper userMapper = Mappers.getMapper(UserMapper.class);
    protected UserServicePrivate userServiceImpl;
    protected SecurityService securityService;

    protected User user, updatedUser;
    protected UserRequestDto userRequestDto;
    protected UserUpdateRequestDto updatedRequestDto;
    protected UserResponseDto userResponseDto, updateResponseDto;

    @BeforeEach
    void setUp() {
        userServiceImpl = new UserServicePrivate(userRepository, userService, userMapper, securityService);

        userRequestDto = new UserRequestDto("name", "login", "password", "email@mai.ru");
        user = new User(UUID.randomUUID(), userRequestDto.getName(), userRequestDto.getLogin(), userRequestDto.getPassword(),
                userRequestDto.getEmail(), LocalDateTime.now());
        userResponseDto = userMapper.mapToUserResponseDto(user);

        updatedRequestDto = new UserUpdateRequestDto("name1", "login1", "password1", "email1@mai.ru");
        updatedUser = new User(UUID.randomUUID(), updatedRequestDto.getName(), updatedRequestDto.getLogin(),
                updatedRequestDto.getPassword(), updatedRequestDto.getEmail(), LocalDateTime.now());
        updateResponseDto = userMapper.mapToUserResponseDto(updatedUser);
    }
}