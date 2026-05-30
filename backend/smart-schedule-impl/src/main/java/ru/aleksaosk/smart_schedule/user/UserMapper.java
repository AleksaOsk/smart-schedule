package ru.aleksaosk.smart_schedule.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import ru.aleksaosk.smart_schedule.user.dto.UserRequestDto;
import ru.aleksaosk.smart_schedule.user.dto.UserResponseDto;
import ru.aleksaosk.smart_schedule.user.dto.UserUpdateRequestDto;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "created", ignore = true)
    User mapToUser(UserRequestDto request);

    default void mapToUser(User user, UserUpdateRequestDto userRequestDto) {
        if (!userRequestDto.getName().isBlank()) {
            user.setName(userRequestDto.getName());
        }
        if (!userRequestDto.getPassword().isBlank()) {
            user.setPassword(userRequestDto.getPassword());
        }
        if (!userRequestDto.getEmail().isBlank()) {
            user.setEmail(userRequestDto.getEmail());
        }
        if (!userRequestDto.getLogin().isBlank()) {
            user.setLogin(userRequestDto.getLogin());
        }
    }

    UserResponseDto mapToUserResponseDto(User user);
}
