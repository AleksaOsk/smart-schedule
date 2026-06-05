package ru.aleksaosk.smartschedule.impl.user.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.aleksaosk.smartschedule.impl.user.controller.api.UserPrivateApi;
import ru.aleksaosk.smartschedule.impl.user.dto.UserResponseDto;
import ru.aleksaosk.smartschedule.impl.user.dto.UserUpdateRequestDto;
import ru.aleksaosk.smartschedule.impl.user.service.UserServicePrivate;
import ru.aleksaosk.smartschedule.security.service.SecurityService;

@RestController
@AllArgsConstructor
@Slf4j
@Validated
@RequestMapping(path = "/api/users")
public class UserPrivateController implements UserPrivateApi {

    private UserServicePrivate userService;
    private SecurityService securityService;

    @Override
    @PostMapping
    public UserResponseDto createOrGetProfile() {
        log.info("Пришел запрос на создание нового user с email = {}", securityService.getCurrentUserEmail());
        return userService.addNewUser(securityService.getCurrentJwt());
    }

    @Override
    @PatchMapping()
    public UserResponseDto updateUser(UserUpdateRequestDto requestDto) {
        log.info("Пришел запрос на обновление данных для user с id = {}", securityService.getCurrentUserId());
        return userService.updateUser(requestDto);
    }

    @Override
    @DeleteMapping()
    public void deleteUser() {
        log.info("Пришел запрос на удаление user с id = {}", securityService.getCurrentUserId());
        userService.deleteUser();
    }
}
