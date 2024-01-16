package com.dentall.dentallservice.service.impl;

import com.dentall.dentallservice.mapper.SecurityUserMapper;
import com.dentall.dentallservice.model.domain.SecurityRole;
import com.dentall.dentallservice.model.domain.SecurityUser;
import com.dentall.dentallservice.model.dto.SecurityUserDto;
import com.dentall.dentallservice.model.request.CreateAccountRequest;
import com.dentall.dentallservice.repository.SecurityRoleRepository;
import com.dentall.dentallservice.repository.SecurityUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.CREATED;

@Service
@RequiredArgsConstructor
public class SecurityService {

    private final SecurityUserRepository securityUserRepository;
    private final SecurityRoleRepository securityRoleRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final SecurityUserMapper securityUserMapper;

    public ResponseEntity<Void> register(CreateAccountRequest request) {

        if(securityUserRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().build();
        }

        List<SecurityRole> roles = new ArrayList<>();
        request.getRoles().forEach(role -> {
            roles.add(securityRoleRepository.findByName("ROLE_" + role)
                    .orElseThrow(() -> new RuntimeException("Role not found")));
        });

        SecurityUser securityUser = SecurityUser.builder()
                .createdAt(LocalDateTime.now())
                .roles(roles)
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        securityUserRepository.save(securityUser);
        return ResponseEntity.status(CREATED).build();
    }

    public ResponseEntity<Map<String, String>> login(String email, String password) {

        SecurityUser user = securityUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        password
                )
        );

        String token = jwtService.generateAccessToken(user);
        return ResponseEntity.ok(Map.of("accessToken", token));

    }

    public ResponseEntity<Void> updateRoles(String email, String[] roles) {

            SecurityUser user = securityUserRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            List<SecurityRole> securityRoles = new ArrayList<>();
            for(String role : roles) {
                securityRoles.add(securityRoleRepository.findByName("ROLE_" + role)
                        .orElseThrow(() -> new RuntimeException("Role not found")));
            }

            user.setRoles(securityRoles);
            securityUserRepository.save(user);
            return ResponseEntity.ok().build();
    }

    public ResponseEntity<SecurityUserDto> getCurrentUser(SecurityUser securityUser) {
        if (securityUser == null) {
            return ResponseEntity.notFound().build();
        }
        SecurityUserDto dto = securityUserMapper.modelToDto(securityUser);
        return ResponseEntity.ok(dto);
    }

    public ResponseEntity<?> getAllUsers() {
        List<SecurityUser> users = securityUserRepository.findAll();
        List<SecurityUserDto> dtos = securityUserMapper.modelsToDtos(users);
        return ResponseEntity.ok(dtos);
    }
}
