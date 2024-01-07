package com.dentall.dentallservice.repository;

import com.dentall.dentallservice.model.domain.MedicalTreatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalTreatmentRepository extends JpaRepository<MedicalTreatment, String> {
    List<MedicalTreatment> findByTransportBookingIsNull();
}
