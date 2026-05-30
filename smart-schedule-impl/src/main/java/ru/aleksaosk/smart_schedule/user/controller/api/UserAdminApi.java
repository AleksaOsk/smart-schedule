package ru.aleksaosk.smart_schedule.user.controller.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Positive;
import org.springframework.web.bind.annotation.PathVariable;
import ru.aleksaosk.smart_schedule.user.dto.UserResponseDto;
import java.util.List;

@Tag(name = "users api для админских методов")
public interface UserAdminApi {

    @Operation(summary = "Получение списка всех пользователей")
    List<UserResponseDto> getAllUsersDto();

    @Operation(summary = "Получение пользователя по id")
    UserResponseDto getUserDto(@Positive(message = "userId is not correct") @PathVariable("userId") Long id);
}
