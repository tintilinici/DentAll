package com.dentall.dentallservice.service;

import com.dentall.dentallservice.model.dto.AccommodationOrderDto;
import com.dentall.dentallservice.model.dto.PatientDto;
import com.dentall.dentallservice.model.request.CreateAccommodationOrderRequest;
import com.dentall.dentallservice.model.request.CreatePatientRequest;

import java.util.List;

public interface PatientService {

    PatientDto createPatient(CreatePatientRequest request);

    void deletePatient(String id);

    PatientDto retrievePatient(String id);

    List<PatientDto> retrieveAllPatients();

    AccommodationOrderDto createAccommodationOrder(CreateAccommodationOrderRequest request);

    void deleteAccommodationOrder(String id);
}
