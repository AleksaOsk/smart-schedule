package ru.aleksaosk.smart_schedule.user;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ru.aleksaosk.smart_schedule.user.dto.UserRequestDto;
import ru.aleksaosk.smart_schedule.user.dto.UserResponseDto;
import ru.aleksaosk.smart_schedule.user.dto.UserUpdateRequestDto;
import ru.aleksaosk.smart_schedule.user.service.UserServicePrivate;

@RestController
@RequestMapping(path = "/users")
@AllArgsConstructor
@Validated
@Slf4j
public class UserPrivateController {
    private UserServicePrivate userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponseDto addNewUser(@RequestBody @Valid UserRequestDto requestDto) {
        log.info("Пришел запрос на создание нового user с email = {}", requestDto.getEmail());
        return userService.addNewUser(requestDto);
    }

    @PatchMapping("/{userId}")
    public UserResponseDto updateUser(@Positive(message = "incorrect userId") @PathVariable("userId") Long id,
                                      @RequestBody @Valid UserUpdateRequestDto requestDto) {
        log.info("Пришел запрос на обновление данных для user с id = {}", id);
        return userService.updateUser(id, requestDto);
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@Positive(message = "userId is not correct") @PathVariable("userId") Long id) {
        log.info("Пришел запрос на удаление user с id = {}", id);
        userService.deleteUser(id);
    }
}
