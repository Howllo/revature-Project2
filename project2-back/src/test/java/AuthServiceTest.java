import net.revature.project1.repository.AuthRepo;
import net.revature.project1.security.JwtTokenUtil;
import net.revature.project1.service.AuthService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @InjectMocks
    AuthService authService;

    @Mock
    AuthRepo authRepo;
    @Mock
    PasswordEncoder passwordEncoder;
    @Mock
    JwtTokenUtil jwtTokenUtil;
    @Mock
    AuthenticationManager authenticationManager;
}
