package net.revature.project1.service;

import static org.mockito.BDDMockito.verify;
import static org.mockito.Mockito.when;

import java.sql.Timestamp;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.assertThat;

import net.revature.project1.dto.UserDto;
import net.revature.project1.dto.UserRequestPicDto;
import net.revature.project1.entity.AppUser;
import net.revature.project1.enumerator.FileType;
import net.revature.project1.enumerator.PicUploadType;
import net.revature.project1.enumerator.UserEnum;
import net.revature.project1.repository.UserRepo;
import net.revature.project1.result.UserResult;
import net.revature.project1.utils.RegisterRequirementsUtils;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
	
@Mock
private UserRepo userRepo;

@InjectMocks
private UserService userService;

@Test
void getUserTest(){

    AppUser user = new AppUser("test", "test", "test");
    
    when(userRepo.findById(2L)).thenReturn(Optional.ofNullable(user));

    UserResult gotUser = userService.getUser(2L);

    Assertions.assertThat(gotUser).isNotEqualTo(null);
}

@Test
void updateEmailTest(){
    AppUser user = new AppUser("test@email.net", "test", "test");
    AppUser input = new AppUser("new@email.com", "newName", "newer");
    
    when(userRepo.findById(2L)).thenReturn(Optional.ofNullable(user));
    when(userRepo.save(Mockito.any(AppUser.class))).thenReturn(user);

    UserEnum result = userService.updateEmail(2L, input);

    Assertions.assertThat(result).isEqualTo(UserEnum.SUCCESS);
}

@Test
void updateUsernameTest(){
    AppUser user = new AppUser("test@email.net", "testName", "test");
    AppUser input = new AppUser("new@email.com", "newName", "newer");
    
    when(userRepo.findById(2L)).thenReturn(Optional.ofNullable(user));
    when(userRepo.save(Mockito.any(AppUser.class))).thenReturn(input);

    UserEnum result = userService.updateUsername(2L, input);

    Assertions.assertThat(result).isEqualTo(UserEnum.SUCCESS);
}

@Test
void updateDisplayNameTest(){
    AppUser user = new AppUser("test@email.net", "test", "test");
    AppUser input = new AppUser("new@email.com", "newName", "newer");
    user.setDisplayName("testing123");
    input.setDisplayName("testing123");
    
    when(userRepo.findById(2L)).thenReturn(Optional.ofNullable(user));
    when(userRepo.save(Mockito.any(AppUser.class))).thenReturn(user);

    UserEnum result = userService.updateDisplayName(2L, input);

    Assertions.assertThat(result).isEqualTo(UserEnum.SUCCESS);
}


@Test
void updateBiographyTest(){
    AppUser user = new AppUser("test@email.net", "test", "test");
    AppUser input = new AppUser("new@email.com", "new", "newer");
    user.setBiography("testing123");
    input.setBiography("testing123");
    
    when(userRepo.findById(2L)).thenReturn(Optional.ofNullable(user));
    when(userRepo.save(Mockito.any(AppUser.class))).thenReturn(user);

    UserEnum result = userService.updateBiography(2L, input);

    Assertions.assertThat(result).isEqualTo(UserEnum.SUCCESS);
}

@Test
void followUserTest(){
    AppUser user = new AppUser("test", "test", "test");
    
    when(userRepo.findById(2L)).thenReturn(Optional.ofNullable(user));
    when(userRepo.findById(1L)).thenReturn(Optional.ofNullable(user));

    UserEnum result = userService.followUser(2L, 1L);

    Assertions.assertThat(result).isEqualTo(UserEnum.SUCCESS);
}

@Test
void unfollowUserTest(){
    AppUser user = new AppUser("test", "test", "test");
    AppUser user2 = new AppUser("test", "test", "test");
    
    
    
    when(userRepo.findById(2L)).thenReturn(Optional.ofNullable(user));
    when(userRepo.findById(1L)).thenReturn(Optional.ofNullable(user2));

    UserEnum result = userService.unfollowUser(2L, 1L);

    Assertions.assertThat(result).isEqualTo(UserEnum.UNKNOWN);
}

@Test
void updateProfilePicturesTest(){
    AppUser user = new AppUser("test@email.net", "test", "test");
    UserRequestPicDto input = new UserRequestPicDto(FileType.IMAGE, "/path", "name", PicUploadType.PROFILE_PIC);
    
    
    when(userRepo.findById(2L)).thenReturn(Optional.ofNullable(user));
    

    UserEnum result = userService.updateProfilePictures(2L, input);

    Assertions.assertThat(result).isEqualTo(UserEnum.UNKNOWN);
}
}
