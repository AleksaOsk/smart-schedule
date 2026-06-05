package ru.aleksaosk.smartschedule.security.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@AllArgsConstructor
public class SecurityService {

    public Jwt getCurrentJwt() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof Jwt)) {
            throw new RuntimeException("JWT not found in security context");
        }
        return (Jwt) authentication.getPrincipal();
    }

    public UUID getCurrentUserId() {
        Jwt jwt = getCurrentJwt();
        String userId = jwt.getSubject();  // или jwt.getClaim("sub")
        return UUID.fromString(userId);
    }

    public String getCurrentUserEmail() {
        Jwt jwt = getCurrentJwt();
        return jwt.getClaim("email");
    }
}
