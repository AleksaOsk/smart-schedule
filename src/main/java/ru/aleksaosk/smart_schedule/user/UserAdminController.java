package ru.aleksaosk.smart_schedule.user;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.aleksaosk.smart_schedule.user.dto.UserResponseDto;
import ru.aleksaosk.smart_schedule.user.service.UserServiceAdmin;

import java.util.List;

@RestController
@RequestMapping(path = "/admin/users")
@AllArgsConstructor
@Validated
public class UserAdminController {
    private UserServiceAdmin userService;

    @GetMapping
    public List<UserResponseDto> getAllUsersDto() {
        return userService.getAllUsersDto();
    }

    @GetMapping("/{userId}")
    public UserResponseDto getUserDto(@Positive(message = "userId is not correct") @PathVariable("userId") Long id) {
        return userService.getUserDto(id);
    }
}
