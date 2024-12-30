package net.revature.project1.service;

import static org.mockito.BDDMockito.verify;
import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.assertThat;
import net.revature.project1.repository.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
	
@Mock
private UserRepo userRepo;

@InjectMocks
private UserService personService;

@Test
void getUserTest(){

}

@Test
void getSearchUserTest(){
    
}

@Test
void updateEmailTest(){
    
}

@Test
void updateUsernameTest(){
    
}

@Test
void updateDisplayNameTest(){
    
}

@Test
void updateBiographyTest(){
    
}

@Test
void followUserTest(){
    
}

@Test
void unfollowUserTest(){
    
}

@Test
void updateProfilePicturesTest(){
    
}

@Test
void existsByEmailTest(){

}

@Test
void existsByUsernameTest(){

}

@Test
void findAppUserByEmailTest(){
    
}

@Test
void findUserByIdTest(){
    
}

@Test
void findByUsernameTest(){
    
}
}
