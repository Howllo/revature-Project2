import net.revature.project1.Project1Application;
import net.revature.project1.dto.UserSearchDto;
import net.revature.project1.service.SearchService;
import net.revature.project1.service.UserService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;

//@SpringBootTest(classes = Project1Application.class)
@ExtendWith(MockitoExtension.class)
public class SearchServiceTest {

    @InjectMocks
    SearchService searchService;

    @Mock
    UserService userService;

    @Test
    public void getSearchUserTest(){



        String username = "testUser";
        UserSearchDto userSearchDto = new UserSearchDto(1l, "testUser", "Jane Doe", "fake profile");
        when(userService.getSearchUser(username)).thenReturn(Arrays.asList(userSearchDto));



        List<UserSearchDto> userSearchDtos = searchService.getSearchUser(username);


//Asser
        Assertions.assertThat(userSearchDtos).isNotNull();

    }
}
