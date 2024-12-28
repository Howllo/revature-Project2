package net.revature.project1.config;

import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Configuration
public class SecurityKeyConfig {
    @Value("${jwt.secret:defaultSecretKey12345678901234567890}")
    private String jwtSecret;


    /**
     * Builds the secret key to be used for signing and verifying JWT tokens.
     * @return A {@code SecretKey} to be used for signing and verifying JWT tokens.
     */
    @Bean
    public SecretKey secretKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }
}