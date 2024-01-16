package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.TransportCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransportCompanyRepository extends JpaRepository<TransportCompany, String> {
    List<TransportCompany> findByEmailOrPhoneNumber(String email, String phoneNumber);
}
