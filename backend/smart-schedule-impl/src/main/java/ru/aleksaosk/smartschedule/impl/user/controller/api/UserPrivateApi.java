package ru.aleksaosk.smartschedule.impl.user.controller.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import ru.aleksaosk.smartschedule.impl.user.dto.UserResponseDto;
import ru.aleksaosk.smartschedule.impl.user.dto.UserUpdateRequestDto;

@Tag(name = "users api для приватных методов")
public interface UserPrivateApi {

    @Operation(summary = "Создание нового пользователя или получение существующего")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Created"),
            @ApiResponse(responseCode = "200", description = "Get")
    })
    UserResponseDto createOrGetProfile();

    @Operation(summary = "Изменение данных пользователя")
    UserResponseDto updateUser(@RequestBody @Valid UserUpdateRequestDto requestDto);

    @Operation(summary = "Удаление пользователя")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "No Content")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteUser();
}
