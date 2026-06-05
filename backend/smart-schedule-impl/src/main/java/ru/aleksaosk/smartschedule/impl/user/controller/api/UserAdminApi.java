package ru.aleksaosk.smartschedule.impl.user.controller.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Positive;
import org.springframework.web.bind.annotation.PathVariable;
import ru.aleksaosk.smartschedule.impl.user.dto.UserResponseDto;
import java.util.List;
import java.util.UUID;

@Tag(name = "users api для админских методов")
public interface UserAdminApi {

    @Operation(summary = "Получение списка всех пользователей")
    List<UserResponseDto> getAllUsersDto();

    @Operation(summary = "Получение пользователя по id")
    UserResponseDto getUserDto(@Positive(message = "userId is not correct") @PathVariable("userId") UUID id);
}
