package com.dentall.dentallservice.model.dto;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SecurityUserDto {

    @Id
    private String email;

    private String password;

    private List<String> roles;

    private LocalDateTime createdAt;
}
