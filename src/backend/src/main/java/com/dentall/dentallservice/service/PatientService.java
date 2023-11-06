package com.dentall.dentallservice.service;

import com.dentall.dentallservice.model.dto.AccommodationOrderDto;
import com.dentall.dentallservice.model.dto.PatientDto;
import com.dentall.dentallservice.model.request.CreateAccommodationOrderRequest;
import com.dentall.dentallservice.model.request.CreatePatientRequest;
import org.springframework.stereotype.Service;

public interface PatientService {
    PatientDto createPatient(CreatePatientRequest request);

    void deletePatient(String id);

    AccommodationOrderDto createAccommodationOrder(CreateAccommodationOrderRequest request);

    void deleteAccommodationOrder(String id);
}
