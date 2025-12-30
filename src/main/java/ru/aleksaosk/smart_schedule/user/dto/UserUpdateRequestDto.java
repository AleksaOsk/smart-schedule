package ru.aleksaosk.smart_schedule.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequestDto {
    @Size(max = 100, message = "name cannot be more than 100 characters")
    private String name;

    @Size(min = 3, max = 50, message = "login must be between 3 and 50 characters")
    private String login;

    @Size(min = 7, max = 50, message = "password be between 7 and 50 characters")
    private String password;

    @Email(message = "email should be valid")
    @Size(max = 254, message = "email cannot exceed 254 characters")
    private String email;
}
