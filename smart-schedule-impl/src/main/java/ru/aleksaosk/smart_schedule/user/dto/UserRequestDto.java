package ru.aleksaosk.smart_schedule.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema
public class UserRequestDto {
    @Schema(description = "Имя пользователя")
    @Size(max = 100, message = "name cannot be more than 100 characters")
    private String name;

    @Schema(description = "Логин пользователя")
    @NotBlank(message = "login cannot be empty")
    @Size(min = 3, max = 50, message = "login must be between 3 and 50 characters")
    private String login;

    @Schema(description = "Пароль пользователя")
    @NotBlank(message = "password cannot be empty")
    @Size(min = 7, max = 50, message = "password be between 7 and 50 characters")
    private String password;

    @Schema(description = "Почтовый ящик пользователя")
    @Email(message = "email should be valid")
    @NotBlank(message = "email cannot be empty")
    @Size(max = 254, message = "email cannot exceed 254 characters")
    private String email;
}
