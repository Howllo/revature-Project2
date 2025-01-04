package net.revature.project1.config;

import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Configuration
public class SecurityKeyConfig {
    private static final Logger logger = LoggerFactory.getLogger(SecurityKeyConfig.class);
    @Value("${jwt.secret:defaultSecretKey12345678901234567890}")
    private String jwtSecret;

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    /**
     * Builds the secret key to be used for signing and verifying JWT tokens.
     * @return A {@code SecretKey} to be used for signing and verifying JWT tokens.
     */
    @Bean
    public SecretKey secretKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    @PostConstruct
    public void init() {
        System.out.println("=== PostConstruct ===");
        System.out.println("DB URL: " + dbUrl);
        System.out.println("DB Username: " + dbUsername);
        System.out.println("DB Password length: " + (dbPassword != null ? dbPassword.length() : "null"));

        logger.error("DB configuration during login: ");
        logger.error("dbUrl: {}", dbUrl);
        logger.error("dbUsername: {}", dbUsername);
        logger.error("dbPassword: {}", dbPassword);
    }
}