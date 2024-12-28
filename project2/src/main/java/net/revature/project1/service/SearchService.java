package net.revature.project1.service;

import net.revature.project1.dto.PostSmallResponseDto;
import net.revature.project1.dto.UserSearchDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {
    final private UserService userService;

    @Autowired
    public SearchService(UserService userService){
        this.userService = userService;
    }

    /**
     * Returns limited amount of user based on username input.
     * @param username Take in a username that the user typed into the search.
     * @return Return the list of user DTO that is close to what the user was looking for.
     */
    public List<UserSearchDto> getSearchUser(String username){
        return userService.getSearchUser(username);
    }

    public List<PostSmallResponseDto> getSearchPost(String content){
        return null;
    }
}
