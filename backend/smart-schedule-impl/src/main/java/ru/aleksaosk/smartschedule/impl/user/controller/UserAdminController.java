package ru.aleksaosk.smartschedule.impl.user.controller;

import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.aleksaosk.smartschedule.impl.user.controller.api.UserAdminApi;
import ru.aleksaosk.smartschedule.impl.user.dto.UserResponseDto;
import ru.aleksaosk.smartschedule.impl.user.service.UserServiceAdmin;
import java.util.List;
import java.util.UUID;

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
    public UserResponseDto getUserDto(UUID id) {
        return userService.getUserDto(id);
    }
}
