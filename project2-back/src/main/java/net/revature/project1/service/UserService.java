package net.revature.project1.service;

import net.revature.project1.dto.UserDto;
import net.revature.project1.dto.UserRequestPicDto;
import net.revature.project1.dto.UserSearchDto;
import net.revature.project1.entity.AppUser;
import net.revature.project1.enumerator.PicUploadType;
import net.revature.project1.enumerator.UserEnum;
import net.revature.project1.repository.UserRepo;
import net.revature.project1.result.UserResult;
import net.revature.project1.security.JwtTokenUtil;
import net.revature.project1.utils.RegisterRequirementsUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.stream.Collectors;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {
    private final UserRepo userRepo;
    private final FileService fileService;
    final private JwtTokenUtil jwtTokenUtil;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepo userRepo, FileService fileService, JwtTokenUtil jwtTokenUtil){
        this.userRepo = userRepo;
        this.fileService = fileService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    /**
     * Returns a user DTO of the information that is need to display an accocunt information.
     * @param id Take in an id that will be searched for the user information.
     * @return A {@code UserResult} object that contains information about service status, and DTO.
     */
    public UserResult getUser(Long id){
        Optional<AppUser> optionalAppUser = userRepo.findById(id);
        return getUserResult(optionalAppUser);
    }

    /**
     * Returns a user DTO of the information that is need to display an accocunt information.
     * @param username Take in an id that will be searched for the user information.
     * @return A {@code UserResult} object that contains information about service status, and DTO.
     */
    public UserResult getUser(String username){
        Optional<AppUser> optionalAppUser = userRepo.findAppUserByUsername(username);
        return getUserResult(optionalAppUser);
    }

    private UserResult getUserResult(Optional<AppUser> optionalAppUser) {
        if(optionalAppUser.isEmpty()){
            return new UserResult(UserEnum.UNKNOWN_USER, "Unknown user id.", null);
        }

        AppUser user = optionalAppUser.get();
        UserDto userDto = new UserDto(
                user.getUsername(), user.getDisplayName(),
                user.getProfilePic(), user.getBannerPic(),
                user.getBiography(), user.getFollower().size(),
                user.getFollowing().size(), user.getCreatedAt()
        );

        return new UserResult(UserEnum.SUCCESS, "Successfully got user profile!", userDto);
    }

    /**
     * Returns limited amount of user based on username input
     * @param username Take in a username that the user typed into the search.
     * @return Return the list of user DTO that is close to what the user was looking for.
     */
    public List<UserSearchDto> getSearchUser(String username){
        return userRepo.findTop7ByUsernameContaining(username);
    }

    /**
     * Used to update the user email.
     *
     * @param id Take an ID to find the user and update it.
     * @param user Take in user object with the new email.
     * @return Returns an enum whether it was successful or not.
     */
    public UserEnum updateEmail(Long id, AppUser user){
        if(!RegisterRequirementsUtils.isValidEmail(user.getEmail())){
            return UserEnum.INVALID_EMAIL_FORMAT;
        }

        if(userRepo.existsByEmail(user.getEmail())){
           return UserEnum.INVALID_EMAIL_FORMAT;
        }

        Optional<AppUser> getUser = userRepo.findById(id);
        if(getUser.isEmpty()){
            return UserEnum.UNKNOWN;
        }

        AppUser checkUser = getUser.get();
        checkUser.setEmail(user.getEmail());
        userRepo.save(checkUser);

        return UserEnum.SUCCESS;
    }

    /**
     * Used to change the user handler name.
     * @param id Take in a user id to find the user.
     * @param user Take in a user object to be used to change name.
     * @return UserEnum based on the status of the service.
     */
    public UserEnum updateUsername(Long id, AppUser user){
        if(user.getUsername().isEmpty()
                || RegisterRequirementsUtils.isValidUsername(user.getUsername())
                || user.getUsername().length() < 3
                || user.getUsername().length() > 20
        ){
            return UserEnum.BAD_USERNAME;
        }

        Optional<AppUser> userOptional = userRepo.findById(id);
        if(userOptional.isEmpty()){
            return UserEnum.UNKNOWN;
        }

        AppUser newUser = userOptional.get();
        newUser.setUsername(user.getUsername());
        userRepo.save(newUser);

        return UserEnum.SUCCESS;
    }

    public UserEnum updateUsername(Long id, String username, String token){
        
        boolean isValid = isValidToken(token, id);
        if(!isValid){
            return UserEnum.UNAUTHORIZED;
        }
        
        if(username.isEmpty()
                || !RegisterRequirementsUtils.isValidUsername(username)
                || username.length() < 3
                || username.length() > 20
        ){
            System.out.println(username.length());
            System.out.println(RegisterRequirementsUtils.isValidUsername(username));
            return UserEnum.BAD_USERNAME;
        }
        ;
        Optional<AppUser> userOptional = userRepo.findById(id);
        if(userOptional.isEmpty()){
            return UserEnum.UNKNOWN;
        }
       
        AppUser newUser = userOptional.get();
        
        newUser.setUsername(username);
        userRepo.save(newUser);

        return UserEnum.SUCCESS;
    }

    /**
     * Used to change the user display name.
//     * @param id Take in a user id to find the user.
     * @param appUser Take in a user object to be used to change name.
     * @return UserEnum based on the status of the service.
     */
    public UserEnum updateDisplayName(AppUser appUser){
        Optional<AppUser> userOptional = userRepo.findById(appUser.getId());
        if(userOptional.isEmpty()){
            return UserEnum.UNKNOWN;
        }

        AppUser newUser = userOptional.get();
        newUser.setDisplayName(appUser.getDisplayName());
        userRepo.save(newUser);

        return UserEnum.SUCCESS;
    }

    /**
     * Used to change the user biography.
     * @param id Take in a user id to find the user.
     * @param appUser Take in a user object to be used to change name.
     * @return UserEnum based on the status of the service.
     */
    public UserEnum updateBiography(Long id, AppUser appUser){
        Optional<AppUser> userOptional = userRepo.findById(id);
        if(userOptional.isEmpty()){
            return UserEnum.UNKNOWN;
        }

        AppUser newUser = userOptional.get();
        newUser.setBiography(appUser.getBiography());
        userRepo.save(newUser);

        return UserEnum.SUCCESS;
    }

    /**
     * Used to create a relationship between following and follower.
     * @param followerId Take in a follower id. AKA who started the following.
     * @param username Take in a following id. AKA who the person that is being followed.
     * @param username Take in a username. AKA who the person that is being unfollowed.
     * @param token Takes the token of the user who wants to unfollow
     * @param username Take in a following id. AKA who the person that is being followed.
     * @return {@code UserEnum} is return depending on the status of the service.
     */
    public UserEnum followUser(Long followerId, String username, String token){ 
        Optional<AppUser> optionalFollower = userRepo.findById(followerId);
        Optional<AppUser> optionalFollowing = userRepo.findAppUserByUsername(username);
        if(optionalFollower.isEmpty() || optionalFollowing.isEmpty()){
            return UserEnum.UNKNOWN;
        }

        AppUser follower = optionalFollower.get();
        AppUser following = optionalFollowing.get();
        if(follower.getFollowing().contains(following)){
            return UserEnum.USER_ALREADY_FOLLOWING;
        }

        boolean isValid = isValidToken(token, followerId);
        if(!isValid){
            return UserEnum.UNAUTHORIZED;
        }

        follower.getFollowing().add(following);
        following.getFollower().add(follower);

        userRepo.save(follower);
        userRepo.save(following);

        return UserEnum.SUCCESS;
    }

    /**
     * used to let the user update their profile
     * @params AppUser take in the user who wants to update their profile
     * @return AppUser
     */
    public AppUser updateAppUser(AppUser appUser, String token){
        Long userId = appUser.getId();

        Optional<AppUser> optUser = findUserById(userId);
        if (!optUser.isPresent()){
            return null;
        }
        Boolean isValidUser = isValidToken(token, userId);
        if (!isValidUser){
            return null;
        }
        AppUser user = optUser.get();
        user.setDisplayName(appUser.getDisplayName());
        user.setBiography(appUser.getBiography());
        try {
            String bannerUrl = fileService.createFile(appUser.getBannerPic());
            user.setBannerPic(bannerUrl);
            appUser.setBannerPic(bannerUrl);
        } catch (IOException e){
            logger.error("Error while creating Banner file: ", e);
        }
        try {
            String profileUrl = fileService.createFile(appUser.getProfilePic());
            user.setProfilePic(profileUrl);
            appUser.setProfilePic(profileUrl);
        } catch (IOException e){
            logger.error("Error while creating profile file: ", e);
        }
        saveAppUser(user);
        return appUser;
    }

    /**
     * Used to remove a relationship between following and follower.
     * @param followerId Take in a follower id. AKA who started the unfollowing.
     * @param username Take in a username. AKA who the person that is being unfollowed.
     * @param token Takes the token of the user who wants to unfollow
     * @param username Take in a following id. AKA who the person that is being unfollowed.
     * @return {@code UserEnum} is return depending on the status of the service.
     */
    public UserEnum unfollowUser(Long followerId, String username, String token){
        Optional<AppUser> optionalFollower = userRepo.findById(followerId);
        Optional<AppUser> optionalFollowing = userRepo.findAppUserByUsername(username);
        if(optionalFollower.isEmpty() || optionalFollowing.isEmpty()){
            return UserEnum.UNKNOWN;
        }

        AppUser follower = optionalFollower.get();
        AppUser following = optionalFollowing.get();
        if(!follower.getFollowing().contains(following) || !following.getFollower().contains(follower)){
            return UserEnum.UNKNOWN;
        }

        boolean isValid = isValidToken(token, followerId);
        if(!isValid){
            return UserEnum.UNAUTHORIZED;
        }

        follower.getFollowing().remove(following);
        following.getFollower().remove(follower);

        userRepo.save(follower);
        userRepo.save(following);

        return UserEnum.SUCCESS;
    }

    /**
     * Used to check if a user is already following someone
     * @param followerId
     * @param followingUsername
     * @return
     */
    public boolean checkFollowing(Long followerId, String followingUsername){
        Optional<AppUser> optionalFollower = userRepo.findById(followerId);
        Optional<AppUser> optionalFollowing = userRepo.findAppUserByUsername(followingUsername);
        if(optionalFollower.isEmpty() || optionalFollowing.isEmpty()){
            return false;
        }

        AppUser follower = optionalFollower.get();
        AppUser following = optionalFollowing.get();
        return follower.getFollowing().contains(following);
    }

    /**
     * Used to get the list of all the users following the current user
     * @param userId takes the id of the current user.
     * @param token takes the token of the current user to validate the user
     * @return Set<UserDto> returns the list of users following the current user
     */
    public Set<UserDto> getFollowing(Long userId, String token){
        boolean isValidUser = isValidToken(token, userId);
        if(!isValidUser){
            return null;
        }
        Optional<AppUser> optUser = userRepo.findById(userId);
        if (optUser.isEmpty()){
            return null;
        }
        AppUser appUser =  optUser.get();
        Set<AppUser> setOfFollowers = appUser.getFollowing();
        Set<UserDto> returnedFollowing = setOfFollowers.stream().map(follower -> new UserDto(follower.getUsername(), follower.getDisplayName(), follower.getProfilePic(), follower.getBannerPic(), follower.getBiography(), follower.getFollower().size(), follower.getFollowing().size(), follower.getCreatedAt())).collect(Collectors.toSet());
        return returnedFollowing;
    }

    /**
     * Used to get the list of all the users follower the current user follows
     * @param userId takes the id of the current user.
     * @param token takes the token of the current user to validate the user
     * @return Set<UserDto> returns the list of users following the current user
     */
    public Set<UserDto> getFollowers(Long userId, String token){
        boolean isValidUser = isValidToken(token, userId);
        if(!isValidUser){
            return null;
        }
        Optional<AppUser> optUser = userRepo.findById(userId);
        if (optUser.isEmpty()){
            return null;
        }
        AppUser appUser =  optUser.get();
        Set<AppUser> setOfFollowers = appUser.getFollower();
        Set<UserDto> returnedFollowers = setOfFollowers.stream().map(follower -> new UserDto(follower.getUsername(), follower.getDisplayName(), follower.getProfilePic(), follower.getBannerPic(), follower.getBiography(), follower.getFollower().size(), follower.getFollowing().size(), follower.getCreatedAt())).collect(Collectors.toSet());
        return returnedFollowers;
    }

    /**
     * Used to update the profile picture of the user.
     * @param id Take in the user id to find the user.
     * @param responsePicDto Take in the response picture DTO to get the information to update the picture.
     * @return {@code UserEnum} is return depending on the status of the service.
     */
    public UserEnum updateProfilePictures(Long id, UserRequestPicDto responsePicDto){
        String imagePath;

        Optional<AppUser> userOptional = userRepo.findById(id);
        if(userOptional.isEmpty()){
            return UserEnum.UNKNOWN;
        }

        AppUser user = userOptional.get();
        try {
            imagePath = fileService.uploadFile (
                    responsePicDto.fileType(),
                    responsePicDto.picturePath(),
                    responsePicDto.fileName()
            );
        } catch (Exception e){
            return UserEnum.UNKNOWN;
        }

        if(responsePicDto.picUploadType() == PicUploadType.PROFILE_PIC){
            user.setProfilePic(imagePath);
        } else {
            user.setBannerPic(imagePath);
        }

        userRepo.save(user);
        return UserEnum.SUCCESS;
    }

    /**
     * Used to send a friend request to another user.
     * @param senderId Take in the id of the user that is sending the request.
     * @param receiverId Take in the id of the user that is receiving the request.
     * @return {@code UserEnum} is return depending on the status of the service.
     */
    public UserEnum sendFriendRequest(Long senderId, Long receiverId) {
        Optional<AppUser> optionalSender = userRepo.findById(senderId);
        Optional<AppUser> optionalReceiver = userRepo.findById(receiverId);
        if (optionalSender.isEmpty() || optionalReceiver.isEmpty()) {
            return UserEnum.UNKNOWN;
        }

        AppUser sender = optionalSender.get();
        AppUser receiver = optionalReceiver.get();
        if (sender.getReceivedFriendships().contains(receiver)) {
            return UserEnum.USER_ALREADY_FRIENDS;
        }

        sender.getInitiatedFriendships().add(receiver);
        userRepo.save(sender);

        return UserEnum.SUCCESS;
    }

    /**
     * Used to get check if an email already exist.
     * @param appUser .
     * @return An AppUser instance.
     */
    public AppUser saveAppUser(AppUser appUser){
       return userRepo.save(appUser);
    }

    /**
     * Used to get check if an email already exist.
     * @param email Take in a {@code String} with the email.
     * @return A {@code boolean} of true that it exist, or false it doesn't.
     */
    public boolean existsByEmail(String email){
        return userRepo.existsByEmail(email);
    }

    /**
     * Used to get check if a username already exist.
     * @param username Take in a {@code String} with the username.
     * @return A {@code boolean} of true that it exist, or false it doesn't.
     */
    public boolean existsByUsername(String username){
        return userRepo.existsByUsername(username);
    }

    /**
     * Used to find a user by their email.
     * @param email Take in the email of the user.
     * @return Return an optional of the user.
     */
    public Optional<AppUser> findAppUserByEmail(String email){
        return userRepo.findAppUserByEmail(email);
    }

    /**
     * Used to find a user by their username.
     * @param id Take in the id of the user.
     * @return Return an optional of the user.
     */
    public Optional<AppUser> findUserById(Long id){
        return userRepo.findById(id);
    }

    /**
     * Find the user by their username instead of email.
     * @param username Takes in the username to be used for processing.
     * @return {@code Optional} app user from the result of searching database.
     */
    public Optional<AppUser> findByUsername(String username) {
        return userRepo.findAppUserByUsername(username);
    }

    public UserSearchDto getSearchDtoByUsername(String username){
        Optional<UserSearchDto> userSearchDto = userRepo.getSearchDtoByUsername(username);
        return userSearchDto.orElse(null);
    }

    public boolean isValidToken(String token, Long userId) {
        Optional<AppUser> optionalAppUser = getUserToken(token);
        if(optionalAppUser.isEmpty()){
            return false;
        }

        AppUser appUser = optionalAppUser.get();

        if(!Objects.equals(userId, appUser.getId())){
            return false;
        }
        return true;
    }

    /**
     * Returns the user of a token if there is a username listed.
     * @param token Take in the JWT token to be processed.
     * @return The AppUser that is associated with the token.
     */
    private Optional<AppUser> getUserToken(String token) {
        return findByUsername(jwtTokenUtil.getUsernameFromToken(token));
    }
}
