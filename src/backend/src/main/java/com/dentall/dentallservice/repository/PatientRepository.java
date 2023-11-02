package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, String> {
}
