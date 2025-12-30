package ru.aleksaosk.smart_schedule.user;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import ru.aleksaosk.smart_schedule.user.dto.UserRequestDto;
import ru.aleksaosk.smart_schedule.user.dto.UserResponseDto;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class UserMapper {
    public static User mapToUser(UserRequestDto request) {
        User user = new User();
        user.setName(request.getName());
        user.setLogin(request.getLogin());
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        return user;
    }

    public static UserResponseDto mapToUserResponseDto(User user) {
        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setId(user.getId());
        userResponseDto.setName(user.getName());
        userResponseDto.setLogin(user.getLogin());
        userResponseDto.setPassword(user.getPassword());
        userResponseDto.setEmail(user.getEmail());
        userResponseDto.setCreated(user.getCreated());
        return userResponseDto;
    }
}
