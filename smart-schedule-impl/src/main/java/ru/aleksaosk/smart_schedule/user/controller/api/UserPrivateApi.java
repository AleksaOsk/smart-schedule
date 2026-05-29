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
    @ApiResponse(responseCode = "200", description = "Ok",
            content = @Content(
                    examples = {
                            @ExampleObject(name = "Пример положительного ответа", value = """
                                    {
                                      "id": 1,
                                      "name": "string",
                                      "login": "string",
                                      "password": "strings",
                                      "email": "user@example.com",
                                      "created": "12:41:46.865 29-01-2026"
                                    }
                                    """)
                    }
            )
    )
    UserResponseDto addNewUser(@RequestBody @Valid UserRequestDto requestDto);

    @Operation(summary = "Изменение данных пользователя")
    @ApiResponse(responseCode = "200", description = "Ok",
            content = @Content(
                    examples = {
                            @ExampleObject(name = "Пример положительного ответа", value = """
                                    {
                                      "id": 1,
                                      "name": "string1",
                                      "login": "string1",
                                      "password": "strings1",
                                      "email": "user1@example.com",
                                      "created": "12:41:46.865 29-01-2026"
                                    }
                                    """)
                    }
            )
    )
    UserResponseDto updateUser(@Positive(message = "incorrect userId") @PathVariable("userId") Long id,
                               @RequestBody @Valid UserUpdateRequestDto requestDto);

    @Operation(summary = "Удаление пользователя")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "No Content")
    })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteUser(@Positive(message = "userId is not correct") @PathVariable("userId") Long id);
}
