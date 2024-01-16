package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.SecurityRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SecurityRoleRepository extends JpaRepository<SecurityRole, String> {
    Optional<SecurityRole> findByName(String role);
}
