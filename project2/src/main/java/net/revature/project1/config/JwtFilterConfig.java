package net.revature.project1.config;

import net.revature.project1.security.JwtAuthenticationFilter;
import net.revature.project1.security.JwtTokenUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
public class JwtFilterConfig {
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(JwtTokenUtil jwtTokenUtil, UserDetailsService userDetailsService) {
        return new JwtAuthenticationFilter(jwtTokenUtil, userDetailsService);
    }
}