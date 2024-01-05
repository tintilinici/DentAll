package com.dentall.dentallservice.service;

import com.dentall.dentallservice.model.dto.AccommodationOrderDto;
import com.dentall.dentallservice.model.dto.PatientDto;
import com.dentall.dentallservice.model.request.CreateAccommodationOrderRequest;
import com.dentall.dentallservice.model.request.CreatePatientRequest;
import com.dentall.dentallservice.model.request.UpdatePatientRequest;

import java.util.List;

public interface PatientService {

    PatientDto createPatient(CreatePatientRequest request);

    void deletePatient(String id);

    PatientDto retrievePatient(String id);

    PatientDto updatePatient(String id, UpdatePatientRequest request);

    List<PatientDto> retrieveAllPatients();

    AccommodationOrderDto createAccommodationOrder(CreateAccommodationOrderRequest request);

    void deleteAccommodationOrder(String id);


    List<AccommodationOrderDto> searchAccommodationOrders(String patientId);
}
