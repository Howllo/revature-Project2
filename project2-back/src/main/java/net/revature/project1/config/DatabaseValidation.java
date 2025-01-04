package net.revature.project1.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class DatabaseValidation {
    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    @PostConstruct
    public void logDatasourceDetails() {
        logger.error("Resolved DB URL: {}", dbUrl);
        logger.error("Resolved DB Username: {}", dbUsername);

        if (dbPassword == null || dbPassword.isEmpty()) {
            logger.error("DB Password is null or empty!");
        } else {
            logger.error("DB Password (Length): {}", dbPassword.length());
            logger.error("DB Password (Raw): {}", dbPassword);
        }
    }
}
