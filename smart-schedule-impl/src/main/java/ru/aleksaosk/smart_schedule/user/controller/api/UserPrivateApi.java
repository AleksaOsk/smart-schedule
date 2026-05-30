package ru.aleksaosk.smart_schedule.user.controller.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import ru.aleksaosk.smart_schedule.user.dto.UserRequestDto;
import ru.aleksaosk.smart_schedule.user.dto.UserResponseDto;
import ru.aleksaosk.smart_schedule.user.dto.UserUpdateRequestDto;

@Tag(name = "users api для приватных методов")
public interface UserPrivateApi {

    @Operation(summary = "Создание пользователя")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Created")
    })
    UserResponseDto addNewUser(@RequestBody @Valid UserRequestDto requestDto);

    @Operation(summary = "Изменение данных пользователя")
    UserResponseDto updateUser(@Positive(message = "incorrect userId") @PathVariable("userId") Long id,
                               @RequestBody @Valid UserUpdateRequestDto requestDto);

    @Operation(summary = "Удаление пользователя")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "No Content")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteUser(@Positive(message = "userId is not correct") @PathVariable("userId") Long id);
}
