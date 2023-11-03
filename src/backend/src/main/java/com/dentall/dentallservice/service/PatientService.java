package com.dentall.dentallservice.service;

import com.dentall.dentallservice.model.dto.PatientDto;
import com.dentall.dentallservice.model.request.CreatePatientRequest;
import org.springframework.stereotype.Service;

public interface PatientService {
    PatientDto createPatient(CreatePatientRequest request);

    void deletePatient(String id);
}
