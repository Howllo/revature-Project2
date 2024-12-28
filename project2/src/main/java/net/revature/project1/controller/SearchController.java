package net.revature.project1.controller;

import net.revature.project1.dto.PostSmallResponseDto;
import net.revature.project1.dto.UserSearchDto;
import net.revature.project1.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("api/v1/search")
public class SearchController {
    final private SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService){
        this.searchService = searchService;
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<UserSearchDto>> searchForUser(@PathVariable String username){
        return ResponseEntity.ok(searchService.getSearchUser(username));
    }

    @GetMapping("/post/{content}")
    public ResponseEntity<List<PostSmallResponseDto>> searchForPost(@PathVariable String content){
        return ResponseEntity.ok(searchService.getSearchPost(content));
    }
}
