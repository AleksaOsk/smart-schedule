package user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import ru.aleksaosk.smart_schedule.user.User;
import ru.aleksaosk.smart_schedule.user.UserMapper;
import ru.aleksaosk.smart_schedule.user.UserPrivateController;
import ru.aleksaosk.smart_schedule.user.dto.UserRequestDto;
import ru.aleksaosk.smart_schedule.user.dto.UserResponseDto;
import ru.aleksaosk.smart_schedule.user.dto.UserUpdateRequestDto;
import ru.aleksaosk.smart_schedule.user.service.UserService;
import ru.aleksaosk.smart_schedule.user.service.UserServicePrivate;

import java.time.LocalDateTime;

@Slf4j
@ExtendWith(MockitoExtension.class)
@WebMvcTest(UserPrivateController.class)
public abstract class BaseUserControllerTest {
    @MockitoBean
    protected UserServicePrivate userService;

    protected final ObjectMapper mapper = new ObjectMapper();
    @Autowired
    protected MockMvc mvc;

    protected UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    protected User user, updatedUser;
    protected UserRequestDto userRequestDto;
    protected UserUpdateRequestDto updatedRequestDto;
    protected UserResponseDto userResponseDto, updateResponseDto;

    @BeforeEach
    void setUp() {
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
