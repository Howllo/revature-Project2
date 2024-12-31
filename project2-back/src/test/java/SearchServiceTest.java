package unittests;

import net.revature.project1.service.SearchService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SearchServiceTest {

    @Autowired
    SearchService searchService;

    @Test
    public void contextLoad(){
        Assertions.assertThat(searchService).isNot(null);
    }
}
