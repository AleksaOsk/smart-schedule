package user.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import ru.aleksaosk.smart_schedule.user.UserPrivateController;
import ru.aleksaosk.smart_schedule.user.dto.UserRequestDto;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(UserPrivateController.class)
public class UserControllerPostTest extends BaseUserControllerTest {
    @Test
    void addNewUser() throws Exception {
        when(userService.addNewUser(any(UserRequestDto.class))).thenReturn(userResponseDto);
        mvc.perform(post("/users")
                        .content(mapper.writeValueAsString(userRequestDto))
                        .characterEncoding(StandardCharsets.UTF_8)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(userResponseDto.getId()), Long.class))
                .andExpect(jsonPath("$.name", is(userResponseDto.getName())))
                .andExpect(jsonPath("$.lastName", is(userResponseDto.getLastName())))
                .andExpect(jsonPath("$.phoneNumber", is(userResponseDto.getPhoneNumber())))
                .andExpect(jsonPath("$.company.id", is(companyDto.getId()), Long.class))
                .andExpect(jsonPath("$.company.name", is(companyDto.getName())))
                .andExpect(jsonPath("$.company.budget", is(companyDto.getBudget()), BigDecimal.class));
    }

    @Test
    void addNewUserWithEmptyName() throws Exception {
        UserRequestDto requestDto = new UserRequestDto("", "lastname", "79889889988", 1L);

        mvc.perform(post("/users")
                        .content(mapper.writeValueAsString(requestDto))
                        .characterEncoding(StandardCharsets.UTF_8)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is("400 BAD_REQUEST")))
                .andExpect(jsonPath("$.reason", is("incorrect data")))
                .andExpect(jsonPath("$.message", is("name cannot be empty")))
                .andExpect(jsonPath("$.timestamp").exists());
    }

}