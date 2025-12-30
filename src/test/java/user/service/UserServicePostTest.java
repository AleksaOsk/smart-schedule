package user.service;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.aleksaosk.smart_schedule.user.UserRepository;
import ru.aleksaosk.smart_schedule.user.service.UserServicePrivate;

@ExtendWith(MockitoExtension.class)
public class UserServicePostTest {
    @Mock
    protected UserRepository userRepository;

    protected UserServicePrivate userService;
}
