package net.revature.project1.service;

import net.revature.project1.dto.AuthRequestDto;
import net.revature.project1.entity.AppUser;
import net.revature.project1.enumerator.AuthEnum;
import net.revature.project1.repository.AuthRepo;
import net.revature.project1.result.AuthResult;
import net.revature.project1.security.JwtTokenUtil;
import net.revature.project1.utils.RegisterRequirementsUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {
    final private AuthRepo authRepo;
    final private UserService userService;
    final private PasswordEncoder passwordEncoder;
    final private JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthService(AuthRepo authRepo,
                       PasswordEncoder passwordEncoder,
                       UserService userService,
                       JwtTokenUtil jwtTokenUtil,
                       AuthenticationManager authenticationManager
    ){
        this.authRepo = authRepo;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Create a new account for the user.
     * @param user Take in a user object to process information.
     * @return {@code AuthResult} with the status of the interaction.
     */
    @Transactional
    public AuthResult registration(AuthRequestDto user){
        if(user.email() == null|| user.password() == null || user.username() == null){
            return new AuthResult(AuthEnum.INVALID, null, null, null);
        }

        if(!RegisterRequirementsUtils.isValidEmail(user.email()) ||
                !RegisterRequirementsUtils.isValidPassword(user.password()) ||
                !RegisterRequirementsUtils.isValidUsername(user.username())){
            return new AuthResult(AuthEnum.INVALID, null, null, null);
        }

        boolean isNotEmailAvailable = userService.existsByEmail(user.email());
        if(isNotEmailAvailable){
            return new AuthResult(AuthEnum.EMAIL_TAKEN, null, null, null);
        }

        boolean isNotUserAvailable = userService.existsByUsername(user.username());
        if(isNotUserAvailable){
            return new AuthResult(AuthEnum.USERNAME_TAKEN, null, null, null);
        }

        String hashPassword = passwordEncoder.encode(user.password());
        AppUser newUser = new AppUser(user.email(), user.username(), hashPassword);

        AppUser returnUser = authRepo.save(newUser);

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", returnUser.getId());
        claims.put("username", returnUser.getUsername());
        var token = jwtTokenUtil.generateToken(returnUser.getUsername(), claims);

        return new AuthResult(AuthEnum.CREATED, user, token, returnUser);
    }

    /**
     * Used to log into the system with just a AppUser data.
     * @param user Take in a data to be processed.
     * @return {@code AuthResult} of status of the auth service layer.
     */
    public AuthResult login(AuthRequestDto user){
        if(user.email().isEmpty() || user.password().isEmpty()){
            return new AuthResult(AuthEnum.INVALID_CREDENTIALS, user, null, null);
        }

        if(!RegisterRequirementsUtils.isValidEmail(user.email())){
            return new AuthResult(AuthEnum.INVALID_CREDENTIALS, user, null, null);
        }

        Optional<AppUser> optionalAppUser = userService.findAppUserByEmail(user.email());
        if(optionalAppUser.isEmpty()){
            if(user.username() == null || user.username().isEmpty()){
                return new AuthResult(AuthEnum.INVALID_CREDENTIALS, user, null, null);
            }

            if(!RegisterRequirementsUtils.isValidUsername(user.username())){
                optionalAppUser = userService.findByUsername(user.username());
            }

            if(optionalAppUser.isEmpty()){
                return new AuthResult(AuthEnum.INVALID_CREDENTIALS, user, null, null);
            }
        }

        AppUser checkUser = optionalAppUser.get();
        if(!passwordEncoder.matches(user.password(), checkUser.getPassword())){
            return new AuthResult(AuthEnum.INVALID_CREDENTIALS, user, null, null);
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", checkUser.getId());
        claims.put("username", checkUser.getUsername());
        var token = jwtTokenUtil.generateToken(checkUser.getUsername(), claims);

        return new AuthResult(AuthEnum.SUCCESS, user, token, checkUser);
    }
}
