package ru.aleksaosk.smart_schedule.user;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.aleksaosk.smart_schedule.user.dto.UserRequestDto;
import ru.aleksaosk.smart_schedule.user.dto.UserResponseDto;

import java.util.List;

@RestController
@RequestMapping(path = "/admin/users")
@AllArgsConstructor
@Validated
public class UserAdminController {
    private UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponseDto addNewUser(@RequestBody @Valid UserRequestDto requestDto) {
        return userService.addNewUser(requestDto);
    }

    @GetMapping
    public List<UserResponseDto> getAllUsersDto() {
        return userService.getAllUsersDto();
    }

    @GetMapping("/{userId}")
    public UserResponseDto getUserDto(@Positive(message = "userId is not correct") @PathVariable("userId") Long id) {
        return userService.getUserDto(id);
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@Positive(message = "userId is not correct") @PathVariable("userId") Long id) {
        userService.deleteUser(id);
    }
}
