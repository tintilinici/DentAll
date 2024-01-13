package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.SecurityUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SecurityUserRepository extends JpaRepository<SecurityUser, String> {
    Optional<SecurityUser> findByEmail(String email);

    boolean existsByEmail(String email);
}
