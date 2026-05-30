package ru.aleksaosk.smart_schedule.user.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema
public class UserResponseDto {
    @Schema(description = "Идентификатор пользователя")
    private UUID id;

    @Schema(description = "Имя пользователя")
    private String name;

    @Schema(description = "Логин пользователя")
    private String login;

    @Schema(description = "Пароль пользователя")
    private String password;

    @Schema(description = "Почтовый ящик пользователя")
    private String email;

    @Schema(description = "Дата и время регистрации пользователя")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss.SSS dd-MM-yyyy")
    private LocalDateTime created;
}
