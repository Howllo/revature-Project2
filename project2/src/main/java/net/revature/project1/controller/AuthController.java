package net.revature.project1.controller;

import jakarta.servlet.http.HttpSession;
import net.revature.project1.dto.AuthRequestDto;
import net.revature.project1.dto.AuthResponseDto;
import net.revature.project1.dto.TokenVerify;
import net.revature.project1.entity.AppUser;
import net.revature.project1.enumerator.AuthEnum;
import net.revature.project1.result.AuthResult;
import net.revature.project1.security.JwtTokenUtil;
import net.revature.project1.service.AuthService;
import net.revature.project1.service.CaptchaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    final private AuthService authService;
    final private CaptchaService captchaService;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public AuthController(AuthService authService, CaptchaService captchaService, JwtTokenUtil jwtTokenUtil){
        this.authService = authService;
        this.captchaService = captchaService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequestDto user){
        AuthResult result = authService.registration(user);
        AppUser returnedUser = result.getAppUser();

        return switch (result.getResult()) {
            case CREATED, SUCCESS -> ResponseEntity.status(HttpStatus.CREATED)
                    .body(new AuthResponseDto("Successfully created a account.",
                            returnedUser.getId(),
                            returnedUser.getUsername(),
                            null,
                            returnedUser.getProfilePic(),
                            result.getToken()
                    ));
            case EMAIL_TAKEN -> ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Email already registered");
            case USERNAME_TAKEN -> ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username already in used");
            case INVALID, INVALID_CREDENTIALS -> ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Bad email or password");
            case UNKNOWN -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal Server Error - An unexpected error occurred on the server. " +
                            "Please try again later");
        };
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequestDto user){
        AuthResult authResult = authService.login(user);
        AuthEnum result = authResult.getResult();
        AppUser returnUser = authResult.getAppUser();

        return switch(result) {
            case CREATED, SUCCESS -> ResponseEntity.status(HttpStatus.OK)
                        .body(new AuthResponseDto("Login successful!",
                                returnUser.getId(),
                                returnUser.getUsername(),
                                returnUser.getDisplayName(),
                                returnUser.getProfilePic(),
                                authResult.getToken()
                        ));
                case INVALID, INVALID_CREDENTIALS -> ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Invalid email or password. Please try again.");
                case UNKNOWN, USERNAME_TAKEN, EMAIL_TAKEN -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Internal Server Error - An unexpected error occurred on the server. " +
                                "Please try again later");
        };
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session){
        session.invalidate();
        return ResponseEntity.ok("Successfully logged out");
    }

    @PostMapping("/verify-captcha")
    public ResponseEntity<String> captchaVerify(@RequestBody String token){
        boolean status = false;

        try{
            status = captchaService.verifyCaptcha(token);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error -" +
                    " An unexpected error occurred on the server. Please try again later");
        }

        if(!status){
            return ResponseEntity.badRequest().body("Bad Request: Captcha failed.");
        }
        return ResponseEntity.ok("Success: Captcha verified.");
    }

    @PostMapping("/verify-token")
    public ResponseEntity<String> tokenVerify(@RequestBody TokenVerify tokenVerify) {
        try {
            if (tokenVerify == null || tokenVerify.token() == null || tokenVerify.username() == null) {
                return ResponseEntity.badRequest().body("Bad Request: Token is null.");
            }

            boolean isValidToken = jwtTokenUtil.validateToken(tokenVerify.token(), tokenVerify.username());

            if (!isValidToken) {
                return ResponseEntity.badRequest().body("Bad Request: Token is invalid.");
            }
            return ResponseEntity.ok("Success: Token verified.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error -" +
                    " An unexpected error occurred on the server. Please try again later");
        }
    }
}
