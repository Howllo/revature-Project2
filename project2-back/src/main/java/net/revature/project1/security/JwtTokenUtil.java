package net.revature.project1.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil {
    private final SecretKey secretKey;
    private final JwtParser jwtParser;

    @Value("${jwt.expiration:86400}")
    private Long expiration;

    public JwtTokenUtil(SecretKey secretKey) {
        this.secretKey = secretKey;
        this.jwtParser = Jwts.parser().verifyWith(secretKey).build();
    }

    public String generateToken(String userName, Map<String, Object> claims) {
        return Jwts.builder()
                .subject(userName)
                .claims(claims)
                .issuer("revature")
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plusSeconds(expiration)))
                .signWith(secretKey)
                .compact();
    }

    public Boolean validateToken(String token, String username) {
        try {
            String tokenUsername = getUsernameFromToken(token);
            return (tokenUsername.equals(username) && !isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return jwtParser.parseSignedClaims(token).getPayload();
    }

    public Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
}