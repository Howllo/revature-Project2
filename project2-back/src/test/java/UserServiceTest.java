import net.revature.project1.entity.AppUser;
import net.revature.project1.repository.UserRepo;
import net.revature.project1.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Timestamp;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;
    @Mock
    private UserRepo userRepo;

    @Test
    public void getFollowersTest(){

        AppUser appUser1 = new AppUser(1l, "appuser1@gmail.com", "display name", "profile", "username", "bannerPic", "biography");
        AppUser appUser2 = new AppUser(2l, "appuser2@gmail.com", "display name", "profile", "username", "bannerPic", "biography");
        AppUser appUser3 = new AppUser(3l, "appuser3@gmail.com", "display name", "profile", "username", "bannerPic", "biography");
        AppUser appUser4 = new AppUser(4l, "appuser4@gmail.com", "display name", "profile", "username", "bannerPic", "biography");

        appUser1.getFollower().add(appUser2);
        appUser1.getFollower().add(appUser3);
        appUser1.getFollower().add(appUser4);




    }

}
