package ru.aleksaosk.smart_schedule.user.controller;

import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.aleksaosk.smart_schedule.user.controller.api.UserAdminApi;
import ru.aleksaosk.smart_schedule.user.dto.UserResponseDto;
import ru.aleksaosk.smart_schedule.user.service.UserServiceAdmin;
import java.util.List;

@RestController
@RequestMapping(path = "/api/admin/users")
@AllArgsConstructor
@Validated
public class UserAdminController implements UserAdminApi {
    private UserServiceAdmin userService;

    @GetMapping
    public List<UserResponseDto> getAllUsersDto() {
        return userService.getAllUsersDto();
    }

    @GetMapping("/{userId}")
    public UserResponseDto getUserDto(Long id) {
        return userService.getUserDto(id);
    }
}
