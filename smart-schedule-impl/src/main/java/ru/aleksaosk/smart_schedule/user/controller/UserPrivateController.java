package ru.aleksaosk.smart_schedule.user.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.aleksaosk.smart_schedule.user.controller.api.UserPrivateApi;
import ru.aleksaosk.smart_schedule.user.dto.UserRequestDto;
import ru.aleksaosk.smart_schedule.user.dto.UserResponseDto;
import ru.aleksaosk.smart_schedule.user.dto.UserUpdateRequestDto;
import ru.aleksaosk.smart_schedule.user.service.UserServicePrivate;

@RestController
@AllArgsConstructor
@Slf4j
@Validated
@RequestMapping(path = "/api/users")
public class UserPrivateController implements UserPrivateApi {

    private UserServicePrivate userService;

    @Override
    @PostMapping
    public UserResponseDto addNewUser(UserRequestDto requestDto) {
        log.info("Пришел запрос на создание нового user с email = {}", requestDto.getEmail());
        return userService.addNewUser(requestDto);
    }

    @Override
    @PatchMapping("/{userId}")
    public UserResponseDto updateUser(Long id, UserUpdateRequestDto requestDto) {
        log.info("Пришел запрос на обновление данных для user с id = {}", id);
        return userService.updateUser(id, requestDto);
    }

    @Override
    @DeleteMapping("/{userId}")
    public void deleteUser(Long id) {
        log.info("Пришел запрос на удаление user с id = {}", id);
        userService.deleteUser(id);
    }
}
