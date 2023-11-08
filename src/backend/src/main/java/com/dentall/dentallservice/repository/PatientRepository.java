package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface PatientRepository extends JpaRepository<Patient, String>, QuerydslPredicateExecutor<Patient> {
}
