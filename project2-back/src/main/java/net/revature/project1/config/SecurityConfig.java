package net.revature.project1.config;

import jakarta.annotation.PostConstruct;
import net.revature.project1.security.JwtAuthenticationFilter;
import net.revature.project1.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.crypto.SecretKey;
import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Value("${argon2.saltLength}")
    private int saltLength;

    @Value("${argon2.hashLength}")
    private int hashLength;

    @Value("${argon2.parallelism}")
    private int parallelism;

    @Value("${argon2.memory}")
    private int memory;

    @Value("${argon2.iterations}")
    private int iterations;

    private final UserService userService;

    public SecurityConfig(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void validateConfig() {
        if (memory <= 0 || iterations <= 0 || saltLength <= 0 || hashLength <= 0 || parallelism <= 0) {
            throw new IllegalArgumentException("All values must be a positive value.");
        }
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new Argon2PasswordEncoder(saltLength, hashLength, parallelism, memory, iterations);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/auth/verify-captcha").permitAll()
                        .requestMatchers("/api/v1/auth/verify-token").permitAll()
                        .requestMatchers("/api/v1/users/**").hasRole("USER")
                        .requestMatchers("/api/v1/user/check/username/{username}").permitAll()
                        .requestMatchers("/api/v1/user/check/email").permitAll()
                        .requestMatchers("/api/v1/post/all").permitAll()
                        .requestMatchers("/api/v1/search/**").permitAll()
                        .requestMatchers("/image/**","/files/**", "/video/**","/css/**", "/js/**").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            var optionalUser = userService.findByUsername(username);
            if (optionalUser.isEmpty()) {
                throw new UsernameNotFoundException("User not found");
            }
            var user = optionalUser.get();

            List<GrantedAuthority> authorities = new ArrayList<>();
            String roleWithPrefix = user.getRole().startsWith("ROLE_") ?
                    user.getRole() : "ROLE_" + user.getRole().toUpperCase();
            authorities.add(new SimpleGrantedAuthority(roleWithPrefix));

            return new User(user.getUsername(),
                    user.getPassword(),
                    authorities);
        };
    }
}